"use client";

import { hostnameFromUrl } from "@/lib/board-items";
import type { GraphNode } from "@/lib/types";

type Props = {
  node: GraphNode;
  onBranchSimilar: () => void;
  onClose: () => void;
};

const KIND_LABELS = {
  link: "Link card",
  text: "AI text",
  image: "Image",
} as const;

export function CanvasInspector({ node, onBranchSimilar, onClose }: Props) {
  return (
    <div className="pointer-events-none absolute right-4 top-1/2 z-20 w-[min(320px,calc(100vw-2rem))] -translate-y-1/2">
      <div className="pointer-events-auto overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1a]/92 shadow-2xl shadow-black/40 backdrop-blur-md">
        {node.kind === "image" && node.imageUrl && (
          <div className="relative aspect-square bg-black/30">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={node.imageUrl} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/50 text-sm text-white/80 hover:bg-black/70"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}

        {(node.kind === "link" || node.kind === "text") && (
          <div className="relative border-b border-white/8 px-4 py-3">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-md bg-white/5 text-sm text-white/80 hover:bg-white/10"
              aria-label="Close"
            >
              ×
            </button>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-[#599CE7]">
              {KIND_LABELS[node.kind]}
            </p>
          </div>
        )}

        <div className="space-y-3 p-4">
          <div>
            <h2 className="text-sm font-medium leading-snug text-white/90">{node.title}</h2>
            <p className="mt-1 text-xs text-white/40">
              {node.source}
              {node.similarity != null && <> · {(node.similarity * 100).toFixed(0)}% match</>}
            </p>
          </div>

          {node.kind === "text" && node.body && (
            <p className="rounded-lg bg-[#26241c] p-3 text-xs leading-relaxed text-white/75">
              {node.body}
            </p>
          )}

          {node.kind === "link" && (
            <a
              href={node.url}
              target="_blank"
              rel="noreferrer"
              className="block truncate rounded-lg border border-[#599CE7]/25 bg-[#599CE7]/10 px-3 py-2 text-xs text-[#87c3ff] hover:border-[#599CE7]/40"
            >
              {node.url ?? hostnameFromUrl(node.url)}
            </a>
          )}

          <p className="text-[11px] text-white/35">{node.tags.join(" · ")}</p>

          <div className="flex gap-2">
            {node.kind === "link" && node.url && (
              <a
                href={node.url}
                target="_blank"
                rel="noreferrer"
                className="flex-1 rounded-lg border border-white/10 py-2 text-center text-xs text-white/70 hover:border-white/20"
              >
                Open link
              </a>
            )}
            {node.kind !== "text" && (
              <button
                type="button"
                onClick={onBranchSimilar}
                className="flex-1 rounded-lg border border-white/10 py-2 text-xs text-white/70 hover:border-white/20"
              >
                Branch similar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
