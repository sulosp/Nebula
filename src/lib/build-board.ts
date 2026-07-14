import { BOARD_DIMS } from "./board-items";
import { withBoardDimensions } from "./corpus";
import type { CorpusItem, GraphNode } from "./types";

type ScoredItem = CorpusItem & { score: number };

/** Column centers in world space (aligned to wireframe layout). */
export const COLUMN_CENTERS = {
  text: -275,
  image: 75,
  link: 425,
} as const;

export const COLUMN_HEADER_Y = -200;
const ROW_GAP = 24;
const CONTENT_START_Y = -120;

function toGraphNode(item: CorpusItem & { score?: number }, x: number, y: number): GraphNode {
  return withBoardDimensions({ ...item, similarity: item.score }, x, y);
}

function stackInColumn(items: ScoredItem[], columnX: number): GraphNode[] {
  const nodes: GraphNode[] = [];
  let topY = CONTENT_START_Y;

  for (const item of items) {
    const { height } = BOARD_DIMS[item.kind];
    const centerY = topY + height / 2;
    nodes.push(toGraphNode(item, columnX, centerY));
    topY += height + ROW_GAP;
  }

  return nodes;
}

function buildAiTextItems(
  query: string,
  expandedQuery: string,
  resultItems: ScoredItem[],
): ScoredItem[] {
  const clusterIds = [...new Set(resultItems.map((r) => r.clusterId))];
  const tags = expandedQuery
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const aiItems: ScoredItem[] = [
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
    },
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
  ];

  tags.slice(0, 3).forEach((tag, index) => {
    const clusterId = clusterIds[index % Math.max(clusterIds.length, 1)] ?? "ai";
    aiItems.push({
      id: `ai-tag-${index}-${tag.slice(0, 12).replace(/\s+/g, "-")}`,
      kind: "text",
      title: "Style signal",
      source: "Nebula AI",
      clusterId,
      tags: ["tag", tag.split(" ")[0]?.toLowerCase() ?? "style"],
      body: tag.charAt(0).toUpperCase() + tag.slice(1),
      searchText: tag,
      score: 0.95 - index * 0.05,
    });
  });

  if (resultItems.length > 0) {
    const top = resultItems[0];
    aiItems.push({
      id: `ai-match-${top.id}`,
      kind: "text",
      title: "Top match rationale",
      source: "Nebula AI",
      clusterId: top.clusterId,
      tags: ["match", ...top.tags.slice(0, 2)],
      body: `Strongest match: ${top.title}. Shared signals include ${top.tags.join(", ")}. Clustered with ${top.clusterId.replace("-", " ")} references.`,
      searchText: top.searchText,
      score: top.score,
    });
  }

  return aiItems;
}

/** Lay out AI text + search results in three wireframe columns. */
export function layoutBoardNodes(
  query: string,
  expandedQuery: string,
  results: ScoredItem[],
): GraphNode[] {
  const aiTextItems = buildAiTextItems(query, expandedQuery, results);
  const textItems = [...aiTextItems, ...results.filter((item) => item.kind === "text")];
  const imageItems = results.filter((item) => item.kind === "image");
  const linkItems = results.filter((item) => item.kind === "link");

  return [
    ...stackInColumn(textItems, COLUMN_CENTERS.text),
    ...stackInColumn(imageItems, COLUMN_CENTERS.image),
    ...stackInColumn(linkItems, COLUMN_CENTERS.link),
  ];
}

/** @deprecated Use layoutBoardNodes — kept for tests that only need result positioning. */
export function seedResultPositions(items: ScoredItem[]): GraphNode[] {
  const byKind = {
    text: items.filter((i) => i.kind === "text"),
    image: items.filter((i) => i.kind === "image"),
    link: items.filter((i) => i.kind === "link"),
  };

  return [
    ...stackInColumn(byKind.text, COLUMN_CENTERS.text),
    ...stackInColumn(byKind.image, COLUMN_CENTERS.image),
    ...stackInColumn(byKind.link, COLUMN_CENTERS.link),
  ];
}

/** @deprecated Use layoutBoardNodes */
export function buildAiTextNodes(
  query: string,
  expandedQuery: string,
  resultItems: ScoredItem[],
): GraphNode[] {
  return stackInColumn(buildAiTextItems(query, expandedQuery, resultItems), COLUMN_CENTERS.text);
}
