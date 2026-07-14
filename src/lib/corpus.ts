import type { Cluster, CorpusItem, GraphNode, SearchEdge } from "./types";
import { BOARD_DIMS } from "./board-items";

export const CLUSTERS: Cluster[] = [
  { id: "typography", label: "Editorial type" },
  { id: "layout", label: "Dark layouts" },
  { id: "photography", label: "Mood photography" },
  { id: "motion", label: "Subtle motion" },
  { id: "identity", label: "Identity systems" },
  { id: "packaging", label: "Packaging" },
  { id: "web", label: "Brand web" },
  { id: "ai", label: "AI context" },
];

export const CORPUS: CorpusItem[] = [
  {
    id: "de-1",
    kind: "image",
    title: "Kinfolk — Issue 48 landing",
    source: "Are.na",
    url: "https://www.are.na",
    clusterId: "typography",
    tags: ["serif", "editorial", "grid"],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=480&h=480&fit=crop",
    searchText: "dark editorial serif typography kinfolk magazine landing grid layout luxury",
  },
  {
    id: "de-2",
    kind: "link",
    title: "Instrument — Studio site",
    source: "Behance",
    url: "https://www.behance.net/instrument",
    clusterId: "typography",
    tags: ["sans", "case study"],
    imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=240&fit=crop",
    searchText: "minimal sans serif studio portfolio case study dark editorial web design",
  },
  {
    id: "de-3",
    kind: "image",
    title: "Dark editorial hero patterns",
    source: "Dribbble",
    url: "https://dribbble.com",
    clusterId: "layout",
    tags: ["hero", "full-bleed"],
    imageUrl: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=480&h=480&fit=crop",
    searchText: "dark mode hero section full bleed editorial layout high contrast web",
  },
  {
    id: "de-4",
    kind: "link",
    title: "Monochrome portfolio — v2",
    source: "Behance",
    url: "https://www.behance.net/gallery/portfolio-monochrome",
    clusterId: "layout",
    tags: ["portfolio", "minimal"],
    searchText: "monochrome minimal portfolio dark layout sparse negative space",
  },
  {
    id: "de-5",
    kind: "image",
    title: "Low-key product stills",
    source: "Pinterest",
    url: "https://www.pinterest.com",
    clusterId: "photography",
    tags: ["product", "shadow"],
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=480&h=480&fit=crop",
    searchText: "low key product photography dark shadows luxury editorial still life",
  },
  {
    id: "de-6",
    kind: "image",
    title: "Fashion lookbook — night shoot",
    source: "Are.na",
    url: "https://www.are.na",
    clusterId: "photography",
    tags: ["fashion", "grain"],
    imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=480&h=480&fit=crop",
    searchText: "fashion lookbook night photography grain mood editorial dark luxury",
  },
  {
    id: "de-7",
    kind: "link",
    title: "Scroll-linked opacity reveals",
    source: "Dribbble",
    url: "https://dribbble.com/shots/scroll-opacity",
    clusterId: "motion",
    tags: ["scroll", "reveal"],
    searchText: "scroll animation opacity reveal subtle motion editorial web interaction",
  },
  {
    id: "de-8",
    kind: "image",
    title: "Parallax depth — editorial",
    source: "Behance",
    url: "https://www.behance.net",
    clusterId: "motion",
    tags: ["parallax", "depth"],
    imageUrl: "https://images.unsplash.com/photo-1558591710-4bfb1402c058?w=480&h=480&fit=crop",
    searchText: "parallax depth layers editorial spatial navigation viewpoint shift",
  },
  {
    id: "de-9",
    kind: "image",
    title: "Display serif pairings",
    source: "Are.na",
    url: "https://www.are.na",
    clusterId: "typography",
    tags: ["font", "pairing"],
    imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=480&h=480&fit=crop",
    searchText: "display serif font pairing editorial headline typography dark luxury",
  },
  {
    id: "de-10",
    kind: "link",
    title: "Negative space navigation",
    source: "Dribbble",
    url: "https://dribbble.com/shots/navigation-minimal",
    clusterId: "layout",
    tags: ["nav", "minimal"],
    searchText: "negative space navigation minimal dark ui editorial restrained",
  },
  {
    id: "ml-1",
    kind: "link",
    title: "Monogram — single stroke",
    source: "Behance",
    url: "https://www.behance.net/gallery/monogram-study",
    clusterId: "identity",
    tags: ["monogram", "luxury"],
    searchText: "luxury monogram single stroke brand identity minimal black white",
  },
  {
    id: "ml-2",
    kind: "link",
    title: "Wordmark spacing study",
    source: "Are.na",
    url: "https://www.are.na/block/wordmark-spacing",
    clusterId: "identity",
    tags: ["wordmark", "tracking"],
    searchText: "wordmark letterspacing luxury branding identity typography study",
  },
  {
    id: "ml-3",
    kind: "image",
    title: "Embossed label system",
    source: "Pinterest",
    url: "https://www.pinterest.com",
    clusterId: "packaging",
    tags: ["emboss", "label"],
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=480&h=480&fit=crop",
    searchText: "embossed label packaging luxury matte black premium unboxing",
  },
  {
    id: "ml-4",
    kind: "image",
    title: "Matte black box — unboxing",
    source: "Behance",
    url: "https://www.behance.net",
    clusterId: "packaging",
    tags: ["packaging", "matte"],
    imageUrl: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=480&h=480&fit=crop",
    searchText: "matte black packaging box luxury unboxing premium product",
  },
  {
    id: "ml-5",
    kind: "link",
    title: "Lookbook microsite",
    source: "Dribbble",
    url: "https://dribbble.com/shots/lookbook-microsite",
    clusterId: "web",
    tags: ["lookbook", "web"],
    searchText: "lookbook microsite luxury brand web editorial fashion dark",
  },
  {
    id: "ml-6",
    kind: "link",
    title: "Product index — sparse grid",
    source: "Are.na",
    url: "https://www.are.na/block/sparse-catalog",
    clusterId: "web",
    tags: ["catalog", "grid"],
    searchText: "product catalog sparse grid minimal luxury ecommerce dark web",
  },
  {
    id: "ml-7",
    kind: "image",
    title: "Gold foil accent rules",
    source: "Pinterest",
    url: "https://www.pinterest.com",
    clusterId: "identity",
    tags: ["foil", "accent"],
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a960f851117?w=480&h=480&fit=crop",
    searchText: "gold foil accent luxury branding identity premium restrained",
  },
];

export function buildEdges(items: Pick<CorpusItem, "id" | "clusterId" | "tags" | "kind">[]): SearchEdge[] {
  const edges: SearchEdge[] = [];
  const seen = new Set<string>();

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];
      const sharedTags = a.tags.filter((t) => b.tags.includes(t)).length;
      const sameCluster = a.clusterId === b.clusterId;
      const aiBridge =
        (a.kind === "text" && b.kind !== "text") || (b.kind === "text" && a.kind !== "text");
      if (!sameCluster && sharedTags === 0 && !aiBridge) continue;

      const key = [a.id, b.id].sort().join(":");
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ from: a.id, to: b.id });
    }
  }

  return edges;
}

export const SUGGESTED_QUERIES = [
  "dark editorial web design",
  "minimal luxury branding",
  "editorial typography",
  "dark mood photography",
];

export function clustersForItems(items: Pick<CorpusItem, "clusterId">[]): Cluster[] {
  const ids = [...new Set(items.map((i) => i.clusterId))];
  return CLUSTERS.filter((c) => ids.includes(c.id));
}

export function withBoardDimensions(
  item: CorpusItem & { similarity?: number },
  x: number,
  y: number,
): GraphNode {
  const dims = BOARD_DIMS[item.kind];
  return { ...item, x, y, width: dims.width, height: dims.height };
}
