"use client";

import type { ViewTransform } from "@/lib/types";
import { clampScale } from "@/lib/canvas-view";

type Props = {
  transform: ViewTransform;
  onTransformChange: (t: ViewTransform) => void;
  onFitToContent: () => void;
  nodeCount: number;
  clusterCount: number;
};

export function CanvasControls({
  transform,
  onTransformChange,
  onFitToContent,
  nodeCount,
  clusterCount,
}: Props) {
  const zoomPercent = Math.round(transform.scale * 100);

  return (
    <>
      <div className="pointer-events-none absolute bottom-28 left-4 z-20">
        <div className="pointer-events-auto rounded-lg border border-white/10 bg-[#1a1a1a]/85 px-3 py-2 text-[11px] text-white/40 backdrop-blur-md">
          {nodeCount} items · {clusterCount} clusters
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-28 right-4 z-20">
        <div className="pointer-events-auto flex items-center gap-1 rounded-lg border border-white/10 bg-[#1a1a1a]/90 p-1 backdrop-blur-md">
          <button
            type="button"
            title="Zoom out"
            onClick={() =>
              onTransformChange({
                ...transform,
                scale: clampScale(transform.scale * 0.82),
              })
            }
            className="flex h-8 w-8 items-center justify-center rounded-md text-white/70 hover:bg-white/8"
          >
            −
          </button>
          <button
            type="button"
            title="Fit to content"
            onClick={onFitToContent}
            className="min-w-[52px] rounded-md px-2 py-1.5 text-xs text-white/70 hover:bg-white/8"
          >
            {zoomPercent}%
          </button>
          <button
            type="button"
            title="Zoom in"
            onClick={() =>
              onTransformChange({
                ...transform,
                scale: clampScale(transform.scale * 1.2),
              })
            }
            className="flex h-8 w-8 items-center justify-center rounded-md text-white/70 hover:bg-white/8"
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
