import { withBoardDimensions } from "./corpus";
import type { CorpusItem, GraphNode } from "./types";

type ScoredItem = CorpusItem & { score: number };

function toGraphNode(item: CorpusItem & { score?: number }, x: number, y: number): GraphNode {
  return withBoardDimensions({ ...item, similarity: item.score }, x, y);
}

/** AI-generated text blocks placed on the board alongside search results. */
export function buildAiTextNodes(
  query: string,
  expandedQuery: string,
  resultItems: ScoredItem[],
): GraphNode[] {
  const clusterIds = [...new Set(resultItems.map((r) => r.clusterId))];
  const tags = expandedQuery
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const nodes: GraphNode[] = [];

  nodes.push(
    toGraphNode(
      {
        id: `ai-brief-${query.slice(0, 24).replace(/\s+/g, "-")}`,
        kind: "text",
        title: "Search brief",
        source: "Nebula AI",
        clusterId: "ai",
        tags: ["query", "expansion"],
        body: `You searched for "${query}".\n\nNebula expanded this into style dimensions and visual tags to retrieve matching references across curated sources.`,
        searchText: `${query} ${expandedQuery}`,
        score: 1,
      } as CorpusItem & { score: number },
      -180,
      -120,
    ),
  );

  nodes.push(
    toGraphNode(
      {
        id: `ai-expansion-${query.slice(0, 24).replace(/\s+/g, "-")}`,
        kind: "text",
        title: "Expanded query",
        source: "Nebula AI",
        clusterId: "ai",
        tags: ["ai", "tags"],
        body: expandedQuery,
        searchText: expandedQuery,
        score: 1,
      },
      180,
      -100,
    ),
  );

  tags.slice(0, 5).forEach((tag, index) => {
    const clusterId = clusterIds[index % Math.max(clusterIds.length, 1)] ?? "ai";
    nodes.push(
      toGraphNode(
        {
          id: `ai-tag-${index}-${tag.slice(0, 12).replace(/\s+/g, "-")}`,
          kind: "text",
          title: "Style signal",
          source: "Nebula AI",
          clusterId,
          tags: ["tag", tag.split(" ")[0]?.toLowerCase() ?? "style"],
          body: tag.charAt(0).toUpperCase() + tag.slice(1),
          searchText: tag,
          score: 0.95 - index * 0.05,
        },
        -480 + index * 240,
        -320,
      ),
    );
  });

  if (resultItems.length > 0) {
    const top = resultItems[0];
    nodes.push(
      toGraphNode(
        {
          id: `ai-match-${top.id}`,
          kind: "text",
          title: "Top match rationale",
          source: "Nebula AI",
          clusterId: top.clusterId,
          tags: ["match", ...top.tags.slice(0, 2)],
          body: `Strongest match: ${top.title}. Shared signals include ${top.tags.join(", ")}. Clustered with ${top.clusterId.replace("-", " ")} references.`,
          searchText: top.searchText,
          score: top.score,
        },
        0,
        -280,
      ),
    );
  }

  return nodes;
}

export function seedResultPositions(items: ScoredItem[]): GraphNode[] {
  const cols = 4;
  const gapX = 300;
  const gapY = 240;
  const startX = -((cols - 1) * gapX) / 2;
  const startY = 80;

  return items.map((item, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    return toGraphNode(item, startX + col * gapX, startY + row * gapY);
  });
}
