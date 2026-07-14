---
name: parallax-spatial-search
description: Product and technical context for "Parallax" (working name; alt. Nebula) — a spatial, canvas-based visual search tool where a query populates an infinite canvas with images/links clustered by similarity instead of a scrollable grid. Use this skill whenever Sulo asks for help building, scoping, pitching, naming, designing, or writing code for this product, or references "the canvas search product," "Parallax," "Nebula," or "the spatial search tool." Covers competitive positioning, differentiation strategy, recommended tech stack, interaction design principles, and naming decisions already made, so Claude doesn't re-litigate settled decisions or repeat generic moodboard-app advice every session.
---

# Parallax — Spatial Visual Search Canvas

## Product in one line
A search tool where the canvas itself is the interaction: type a query and results appear as a spatial, physics-driven graph (clustered by visual/semantic similarity) that you explore by zooming and dragging — not a list you scroll.

## Core differentiation (already decided — don't re-litigate)
The "search → populate a canvas" concept is crowded (Kosmik, Inspo AI, Miro's AI moodboard, Adobe Firefly Boards, MoodFlow, Milanote all do variations of it as of mid-2026). Every one of them still renders results as a scrollable/paginated grid *within* the canvas. The wedge is **spatial interaction replacing scroll**, not the search itself. Concretely:

- **Force-directed / graph layout**, not a grid — results cluster by similarity, connections visible between related items, dragging a node perturbs its cluster.
- **Zoom-as-navigation** — zoom out shows clusters, zoom in reveals individual items and metadata. No scrollbar anywhere.
- **Interaction-driven refinement** — dragging items together or expanding a node to branch into similar items, as an alternative/supplement to retyping a text query.
- **Motion as feedback** — physics-based settling, hover previews, self-drawing connections. This is a real moat because most competitors are functionally solid but visually flat; Sulo's motion design background (Rive) is a direct advantage here.

When advising on this product, always frame decisions against this differentiation, not against generic "add AI search to a moodboard" advice — that part of the space is saturated.

## Two versions of the idea — clarify which one is in scope
- **"Living spatial graph"** (the differentiated version): harder build, genuinely new interaction model, the wedge described above.
- **"Search results on an infinite canvas you rearrange"**: closer to what Kosmik/Milanote/Firefly Boards already do, faster to ship but not differentiated.

If a request doesn't specify, assume the living-spatial-graph version, since that's the one worth building — but flag scope/complexity tradeoffs when relevant (e.g., an MVP might ship a simplified version of it before the full graph interaction).

## Recommended technical stack
- **Canvas rendering**: PixiJS or a custom WebGL/Canvas engine once node count grows past a few hundred — avoid DOM-based libraries like React Flow for the physics-driven version, since DOM performance degrades quickly under continuous layout simulation. React Flow is fine only for early low-fidelity prototypes.
- **Layout/clustering**: D3-force for force-directed simulation, or a custom spatial-hashing approach for performance at scale.
- **Search & retrieval (AI layer)**:
  - Embeddings-based similarity search is the core engine: embed images (CLIP/SigLIP-class multimodal model) and text queries into the same vector space; store/query via pgvector, Pinecone, or Weaviate.
  - LLM query expansion: turn a vague text query into richer search terms/style tags before hitting sources — plain prompting/structured output, not a deep ML task.
  - Sources: prefer curated, higher-taste sources (Behance, Are.na, Dribbble, targeted Pinterest boards) over generic web scraping, to support the "quality over breadth" differentiation angle if pursued.
- **Not needed for this product**: agent frameworks/tool-calling loops (this is a retrieval problem, not agentic), fine-tuning (off-the-shelf embedding models are sufficient for MVP).
- **Micro-interactions/polish**: Rive for hover states, node settling, connection draw-in animations; CSS/WebGL for heavier physics-driven motion.
- **Frontend**: Next.js/React, consistent with Sulo's existing stack.

## Cost/scope reality check
MVP is cheap to run technically (mostly image-search/embedding API calls + an LLM for query expansion + image hosting/CDN — order of tens of dollars/month at low volume). The real risk isn't technical feasibility, it's differentiation: this space already has funded incumbents live, so validate the specific niche/wedge (e.g., via a landing page + waitlist) before building the full interaction model.

## Possible niches to sharpen positioning (unresolved — ask Sulo before assuming)
- Narrow audience instead of generic "creatives/marketers": e.g., brand/web designers, Framer/Webflow builders, dark-luxury/editorial-aesthetic niches Sulo already works in.
- "Output, not just collection" as the deeper differentiator: auto-generated palettes, Figma-ready style guides, or feeding the board into a generation step — the collection/search part alone is commodity.

## Naming — decisions so far
- Early front-runners across sessions: **Umbra**, **Nova**, **Zenith**, **Nebula**, **Parallax**.
- Sulo has expressed a preference for **Nebula** and space-themed names generally.
- **Parallax** was flagged as a standout: it's not just space-themed, it literally means the apparent shift in an object's position depending on viewpoint — which maps directly onto a canvas where content rearranges based on search/viewpoint. Treat this as the current working name unless Sulo says otherwise.
- Domain/trademark availability has **not** been checked (Claude cannot verify this live) — flag this before Sulo commits to a name.

## When helping with this product
- Don't re-explain the competitive landscape or basic moodboard-app concept from scratch each time — reference the differentiation above and move straight to the specific ask (naming, MVP scoping, code, design direction, pitch copy, etc.).
- Default to the living-spatial-graph interaction model and the recommended stack above unless Sulo asks about the simpler alternative.
- Tie visual/design suggestions back to Sulo's established aesthetic: dark, editorial, restrained — not bright/playful (e.g., prefer "Umbra"-style moodiness over "Aurora"-style brightness when suggesting visual direction).
