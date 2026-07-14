"use client";

export type ToolboxTool = "text" | "cards" | "pencil" | "eraser";

type Props = {
  activeTool: ToolboxTool;
  onToolChange: (tool: ToolboxTool) => void;
};

const TOOLS: { id: ToolboxTool; label: string }[] = [
  { id: "text", label: "Text" },
  { id: "cards", label: "Cards" },
  { id: "pencil", label: "Pencil" },
  { id: "eraser", label: "Eraser" },
];

export function CanvasToolbox({ activeTool, onToolChange }: Props) {
  return (
    <div className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-y-1/2">
      <div className="pointer-events-auto flex flex-col gap-3">
        <p className="text-sm font-medium text-white/90">Toolbox</p>
        <div className="flex flex-col gap-2">
          {TOOLS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              title={label}
              onClick={() => onToolChange(id)}
              className={`flex h-[52px] w-[52px] items-center justify-center rounded-lg border text-[11px] transition-colors ${
                activeTool === id
                  ? "border-[#599CE7]/50 bg-[#599CE7]/15 text-white/90"
                  : "border-white/10 bg-[#1a1a1a]/90 text-white/55 hover:border-white/20 hover:text-white/75"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
