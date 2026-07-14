"use client";

import type { ViewTransform } from "@/lib/types";
import { COLUMN_CENTERS, COLUMN_HEADER_Y } from "@/lib/build-board";

type Props = {
  visible: boolean;
  transform: ViewTransform;
};

const COLUMNS = [
  { label: "Text Results", x: COLUMN_CENTERS.text },
  { label: "Image Results", x: COLUMN_CENTERS.image },
  { label: "Links Results", x: COLUMN_CENTERS.link },
] as const;

function worldToScreen(wx: number, wy: number, transform: ViewTransform) {
  return {
    x: transform.x + wx * transform.scale,
    y: transform.y + wy * transform.scale,
  };
}

export function CanvasColumnHeaders({ visible, transform }: Props) {
  if (!visible) return null;

  return (
    <>
      {COLUMNS.map(({ label, x }) => {
        const { x: sx, y: sy } = worldToScreen(x, COLUMN_HEADER_Y, transform);
        return (
          <p
            key={label}
            className="pointer-events-none absolute z-10 -translate-x-1/2 text-sm font-medium text-white/50"
            style={{ left: sx, top: sy }}
          >
            {label}
          </p>
        );
      })}
    </>
  );
}
