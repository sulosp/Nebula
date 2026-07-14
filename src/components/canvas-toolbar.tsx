"use client";

import { SUGGESTED_QUERIES } from "@/lib/corpus";

type Props = {
  query: string;
  loading: boolean;
  expandedQuery: string;
  onQueryChange: (q: string) => void;
  onSearch: (q: string) => void;
};

export function CanvasToolbar({
  query,
  loading,
  expandedQuery,
  onQueryChange,
  onSearch,
}: Props) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-4 z-20 w-[min(720px,calc(100vw-2rem))] -translate-x-1/2">
      <div className="pointer-events-auto rounded-xl border border-white/10 bg-[#1a1a1a]/90 p-3 shadow-2xl shadow-black/40 backdrop-blur-md">
        <div className="mb-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium tracking-tight text-white/90">Nebula</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">Canvas</span>
          </div>
          <span className="text-[11px] text-white/35">
            Links · cards &nbsp;·&nbsp; AI · text blocks &nbsp;·&nbsp; Images · visual refs
          </span>
        </div>

        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(query);
          }}
        >
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search visual inspiration…"
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/90 outline-none placeholder:text-white/30 focus:border-[#599CE7]/50"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#599CE7] px-4 py-2.5 text-sm font-medium text-[#191c22] disabled:opacity-50"
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </form>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {SUGGESTED_QUERIES.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => onSearch(q)}
              className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                query === q
                  ? "border-white/20 bg-white/10 text-white/90"
                  : "border-white/10 text-white/45 hover:border-white/20 hover:text-white/70"
              }`}
            >
              {q}
            </button>
          ))}
        </div>

        {expandedQuery && (
          <p className="mt-2 border-t border-white/8 pt-2 text-[11px] leading-relaxed text-white/40">
            <span className="text-white/55">Expanded · </span>
            {expandedQuery}
          </p>
        )}
      </div>
    </div>
  );
}
