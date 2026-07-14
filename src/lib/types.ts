export type BoardItemKind = "link" | "text" | "image";

export type Cluster = {
  id: string;
  label: string;
};

export type CorpusItem = {
  id: string;
  kind: BoardItemKind;
  title: string;
  source: "Are.na" | "Behance" | "Dribbble" | "Pinterest" | "Nebula AI";
  url?: string;
  clusterId: string;
  tags: string[];
  /** Visual reference — used by image (required) and link (optional thumb) kinds */
  imageUrl?: string;
  /** AI or descriptive copy — used by text kind */
  body?: string;
  searchText: string;
  embedding?: number[];
};

export type SearchEdge = {
  from: string;
  to: string;
};

export type GraphNode = CorpusItem & {
  x: number;
  y: number;
  width: number;
  height: number;
  vx?: number;
  vy?: number;
  similarity?: number;
};

export type SearchResponse = {
  query: string;
  expandedQuery: string;
  clusters: Cluster[];
  nodes: GraphNode[];
  edges: SearchEdge[];
};

export type ViewTransform = {
  x: number;
  y: number;
  scale: number;
};
