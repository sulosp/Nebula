import type { CorpusItem } from "./types";

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "for", "to", "in", "on", "with", "of", "is", "are",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t));
}

function termFrequency(tokens: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  for (const t of tokens) {
    tf.set(t, (tf.get(t) ?? 0) + 1);
  }
  return tf;
}

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (const [, v] of a) normA += v * v;
  for (const [, v] of b) normB += v * v;

  for (const [term, va] of a) {
    const vb = b.get(term);
    if (vb) dot += va * vb;
  }

  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export type ScoredItem = CorpusItem & { score: number };

/**
 * Hybrid retrieval: TF-IDF-style cosine over searchText + tag overlap boost.
 * Swap the embedding branch for OpenAI / CLIP vectors when API keys are present.
 */
export function searchCorpus(
  corpus: CorpusItem[],
  query: string,
  expandedQuery: string,
  limit = 12,
): ScoredItem[] {
  const queryTokens = tokenize(`${query} ${expandedQuery}`);
  const queryVec = termFrequency(queryTokens);

  const scored = corpus.map((item) => {
    const itemTokens = tokenize(`${item.searchText} ${item.tags.join(" ")} ${item.title}`);
    const itemVec = termFrequency(itemTokens);
    let score = cosineSimilarity(queryVec, itemVec);

    const querySet = new Set(queryTokens);
    for (const tag of item.tags) {
      if (querySet.has(tag.toLowerCase())) score += 0.15;
    }

    if (item.searchText.toLowerCase().includes(query.toLowerCase())) {
      score += 0.25;
    }

    return { ...item, score };
  });

  return scored
    .filter((s) => s.score > 0.02)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** Optional OpenAI embedding search — used when OPENAI_API_KEY is set */
export async function embedText(text: string): Promise<number[] | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  const res = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });

  if (!res.ok) return null;
  const data = (await res.json()) as { data: { embedding: number[] }[] };
  return data.data[0]?.embedding ?? null;
}

function cosine(a: number[], b: number[]): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}

export async function searchWithEmbeddings(
  corpus: CorpusItem[],
  query: string,
  expandedQuery: string,
  limit = 12,
): Promise<ScoredItem[] | null> {
  const queryEmbedding = await embedText(`${query}. ${expandedQuery}`);
  if (!queryEmbedding) return null;

  const scored: ScoredItem[] = [];
  for (const item of corpus) {
    let embedding = item.embedding;
    if (!embedding) {
      embedding = (await embedText(item.searchText)) ?? undefined;
    }
    if (!embedding) continue;
    scored.push({ ...item, score: cosine(queryEmbedding, embedding) });
  }

  if (scored.length === 0) return null;
  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
