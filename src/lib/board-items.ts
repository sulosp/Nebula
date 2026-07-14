import type { BoardItemKind, GraphNode } from "./types";

export const BOARD_DIMS: Record<BoardItemKind, { width: number; height: number }> = {
  link: { width: 248, height: 128 },
  text: { width: 280, height: 196 },
  image: { width: 240, height: 240 },
};

export function getNodeSize(node: Pick<GraphNode, "kind" | "width" | "height">) {
  return {
    width: node.width ?? BOARD_DIMS[node.kind].width,
    height: node.height ?? BOARD_DIMS[node.kind].height,
  };
}

export function getCollideRadius(node: Pick<GraphNode, "kind" | "width" | "height">) {
  const { width, height } = getNodeSize(node);
  return Math.max(width, height) / 2 + 12;
}

export function hostnameFromUrl(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
