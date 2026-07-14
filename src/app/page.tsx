"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { CanvasControls } from "@/components/canvas-controls";
import { CanvasInspector } from "@/components/canvas-inspector";
import { CanvasToolbar } from "@/components/canvas-toolbar";
import { BOARD_DIMS } from "@/lib/board-items";
import { computeFitTransform } from "@/lib/canvas-view";
import type { Cluster, GraphNode, SearchResponse, ViewTransform } from "@/lib/types";

const SpatialCanvas = dynamic(
  () => import("@/components/spatial-canvas").then((m) => m.SpatialCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-[#141414] text-sm text-white/40">
        Initializing canvas…
      </div>
    ),
  },
);

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pendingFitRef = useRef(false);
  const [query, setQuery] = useState("dark editorial web design");
  const [loading, setLoading] = useState(false);
  const [expandedQuery, setExpandedQuery] = useState("");
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [transform, setTransform] = useState<ViewTransform>({ x: 0, y: 0, scale: 1 });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setViewport({
        w: entry.contentRect.width,
        h: entry.contentRect.height,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fitToContent = useCallback(
    (items: GraphNode[]) => {
      if (viewport.w <= 0 || viewport.h <= 0) return;
      setTransform(computeFitTransform(items, viewport.w, viewport.h));
    },
    [viewport.w, viewport.h],
  );

  const runSearch = useCallback(
    async (q: string) => {
      setLoading(true);
      setSelectedId(null);
      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: q }),
        });
        if (!res.ok) throw new Error(`Search failed (${res.status})`);
        const data = (await res.json()) as SearchResponse;
        setQuery(data.query);
        setExpandedQuery(data.expandedQuery);
        setNodes(data.nodes);
        setClusters(data.clusters);
        pendingFitRef.current = true;
        fitToContent(data.nodes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [fitToContent],
  );

  useEffect(() => {
    if (pendingFitRef.current && viewport.w > 0 && nodes.length > 0) {
      fitToContent(nodes);
      pendingFitRef.current = false;
    }
  }, [viewport.w, viewport.h, nodes, fitToContent]);

  useEffect(() => {
    void runSearch("dark editorial web design");
  }, [runSearch]);

  const selected = nodes.find((n) => n.id === selectedId) ?? null;

  const branchSimilar = () => {
    if (!selected) return;
    const siblings = nodes.filter(
      (n) => n.clusterId === selected.clusterId && n.id !== selected.id,
    );
    if (siblings.length === 0) return;
    const pick = siblings[Math.floor(Math.random() * siblings.length)];
    const newId = `${pick.id}-branch-${Date.now()}`;
    const dims = BOARD_DIMS[pick.kind];
    setNodes((prev) => [
      ...prev,
      {
        ...pick,
        id: newId,
        x: selected.x + 120,
        y: selected.y + 80,
        width: dims.width,
        height: dims.height,
      },
    ]);
    setSelectedId(newId);
  };

  const handleNodeMove = useCallback((id: string, x: number, y: number) => {
    setNodes((prev) => prev.map((n) => (n.id === id ? { ...n, x, y } : n)));
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden bg-[#141414]">
      <SpatialCanvas
        nodes={nodes}
        transform={transform}
        onTransformChange={setTransform}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onNodeMove={handleNodeMove}
      />

      <CanvasToolbar
        query={query}
        loading={loading}
        expandedQuery={expandedQuery}
        onQueryChange={setQuery}
        onSearch={(q) => void runSearch(q)}
      />

      <CanvasControls
        transform={transform}
        onTransformChange={setTransform}
        onFitToContent={() => fitToContent(nodes)}
        nodeCount={nodes.length}
        clusterCount={clusters.length}
      />

      {selected && (
        <CanvasInspector
          node={selected}
          onBranchSimilar={branchSimilar}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  );
}
