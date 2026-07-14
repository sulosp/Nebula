import type { GraphNode, ViewTransform } from "./types";
import { getNodeSize } from "./board-items";

export const GRID_SCREEN_STEP = 24;

export function getVisibleWorldBounds(
  transform: ViewTransform,
  viewportW: number,
  viewportH: number,
  padding = GRID_SCREEN_STEP * 2,
) {
  return {
    minX: (-transform.x - padding) / transform.scale,
    minY: (-transform.y - padding) / transform.scale,
    maxX: (viewportW - transform.x + padding) / transform.scale,
    maxY: (viewportH - transform.y + padding) / transform.scale,
  };
}

export function computeFitTransform(
  nodes: GraphNode[],
  viewportW: number,
  viewportH: number,
): ViewTransform {
  if (nodes.length === 0 || viewportW <= 0 || viewportH <= 0) {
    return { x: viewportW / 2, y: viewportH / 2, scale: 0.85 };
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const n of nodes) {
    const { width, height } = getNodeSize(n);
    minX = Math.min(minX, n.x - width / 2);
    minY = Math.min(minY, n.y - height / 2);
    maxX = Math.max(maxX, n.x + width / 2);
    maxY = Math.max(maxY, n.y + height / 2);
  }

  const contentW = Math.max(maxX - minX, 240);
  const contentH = Math.max(maxY - minY, 180);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const paddingLeft = 160;
  const paddingRight = 48;
  const paddingTop = 100;
  const paddingBottom = 160;
  const scale = Math.min(
    (viewportW - paddingLeft - paddingRight) / contentW,
    (viewportH - paddingTop - paddingBottom) / contentH,
    1.15,
  );

  return {
    x: viewportW / 2 - cx * scale,
    y: viewportH / 2 - cy * scale,
    scale: Math.max(0.15, Math.min(2.5, scale)),
  };
}

export function clampScale(scale: number) {
  return Math.max(0.08, Math.min(4, scale));
}

export function zoomAtPoint(
  transform: ViewTransform,
  mx: number,
  my: number,
  factor: number,
): ViewTransform {
  const nextScale = clampScale(transform.scale * factor);
  const wx = (mx - transform.x) / transform.scale;
  const wy = (my - transform.y) / transform.scale;
  return {
    scale: nextScale,
    x: mx - wx * nextScale,
    y: my - wy * nextScale,
  };
}
