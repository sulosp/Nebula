"use client";

type Props = {
  visible: boolean;
};

export function CanvasEmptyState({ visible }: Props) {
  if (!visible) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      <p className="text-lg font-medium text-white/25">Default Screen</p>
    </div>
  );
}
