# Nebula

Spatial visual search — explore results as a living, physics-driven graph instead of a scrollable grid.

## Stack

- **Next.js 15** — App Router, API routes
- **PixiJS** — WebGL canvas rendering
- **d3-force** — force-directed layout and clustering
- **Hybrid retrieval** — TF-IDF cosine search locally; OpenAI embeddings when `OPENAI_API_KEY` is set

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Optional: real embeddings + LLM expansion

Create `.env.local`:

```
OPENAI_API_KEY=sk-...
```

Without a key, the app uses built-in query expansions and keyword/TF-IDF retrieval over the seed corpus.

## Project structure

```
src/
  app/              Next.js pages + /api/search
  components/       PixiJS spatial canvas
  lib/              Corpus, search, query expansion
```

## Differentiation

This implements the **living spatial graph** interaction model from the Parallax product spec:

- Force-directed clustering by similarity
- Zoom-as-navigation (no scroll)
- Drag-to-refine and branch-similar expansion
- Motion/physics as primary feedback

## Next steps

- [ ] pgvector / Pinecone for production corpus
- [ ] CLIP/SigLIP multimodal embeddings for image similarity
- [ ] Rive micro-interactions (hover, connection draw-in)
- [ ] Curated source ingestion (Are.na, Behance, Dribbble)
