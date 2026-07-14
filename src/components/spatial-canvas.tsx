"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Application, Container, Graphics } from "pixi.js";
import {
  getVisibleWorldBounds,
  GRID_SCREEN_STEP,
  zoomAtPoint,
} from "@/lib/canvas-view";
import {
  createBoardItemSprite,
  updateBoardItemSelection,
} from "@/lib/render-board-item";
import type { GraphNode, ViewTransform } from "@/lib/types";

const COLORS = {
  gridDot: { color: 0xe4e4e4, alpha: 0.14 },
} as const;

type PixiModule = typeof import("pixi.js");

type Props = {
  nodes: GraphNode[];
  transform: ViewTransform;
  onTransformChange: (t: ViewTransform) => void;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onNodeMove: (id: string, x: number, y: number) => void;
};

function drawDotGrid(
  gridG: Graphics,
  transform: ViewTransform,
  viewportW: number,
  viewportH: number,
) {
  gridG.clear();
  if (viewportW <= 0 || viewportH <= 0) return;

  const bounds = getVisibleWorldBounds(transform, viewportW, viewportH);
  const worldStep = GRID_SCREEN_STEP / transform.scale;
  const dotRadius = Math.max(0.8, 1.2 / transform.scale);

  const startX = Math.floor(bounds.minX / worldStep) * worldStep;
  const startY = Math.floor(bounds.minY / worldStep) * worldStep;

  for (let x = startX; x <= bounds.maxX; x += worldStep) {
    for (let y = startY; y <= bounds.maxY; y += worldStep) {
      gridG.circle(x, y, dotRadius).fill(COLORS.gridDot);
    }
  }
}

function syncCardPositions(nodes: GraphNode[], nodeSprites: Map<string, Container>, selectedId: string | null) {
  for (const node of nodes) {
    const card = nodeSprites.get(node.id);
    if (!card) continue;
    card.position.set(node.x, node.y);
    const bg = card.children[1] as Graphics;
    updateBoardItemSelection(bg, node, selectedId === node.id);
  }
}

export function SpatialCanvas({
  nodes,
  transform,
  onTransformChange,
  selectedId,
  onSelect,
  onNodeMove,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const pixiRef = useRef<PixiModule | null>(null);
  const worldRef = useRef<Container | null>(null);
  const gridRef = useRef<Graphics | null>(null);
  const nodeSpritesRef = useRef<Map<string, Container>>(new Map());
  const transformRef = useRef(transform);
  const selectedRef = useRef(selectedId);
  const panRef = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const spaceRef = useRef(false);
  const viewportRef = useRef({ w: 0, h: 0 });
  const nodesRef = useRef(nodes);
  const onNodeMoveRef = useRef(onNodeMove);
  const [ready, setReady] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);

  transformRef.current = transform;
  selectedRef.current = selectedId;
  nodesRef.current = nodes;
  onNodeMoveRef.current = onNodeMove;

  const applyTransform = useCallback(() => {
    const world = worldRef.current;
    const gridG = gridRef.current;
    if (!world) return;
    const t = transformRef.current;
    world.position.set(t.x, t.y);
    world.scale.set(t.scale);
    if (gridG) {
      drawDotGrid(gridG, t, viewportRef.current.w, viewportRef.current.h);
    }
  }, []);

  useEffect(() => {
    applyTransform();
  }, [transform, applyTransform]);

  useEffect(() => {
    if (!ready) return;
    syncCardPositions(nodes, nodeSpritesRef.current, selectedId);
  }, [nodes, selectedId, ready]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        spaceRef.current = true;
        e.preventDefault();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") spaceRef.current = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    let destroyed = false;
    const mount = containerRef.current;
    if (!mount) return;

    let onWindowMove: ((e: MouseEvent) => void) | null = null;
    let onWindowUp: (() => void) | null = null;

    const ro = new ResizeObserver(([entry]) => {
      viewportRef.current = {
        w: entry.contentRect.width,
        h: entry.contentRect.height,
      };
      applyTransform();
    });
    ro.observe(mount);

    void (async () => {
      try {
        const PIXI = await import("pixi.js");
        if (destroyed) return;
        pixiRef.current = PIXI;

        const app = new PIXI.Application();
        appRef.current = app;

        onWindowMove = (e: MouseEvent) => {
          const canvas = appRef.current?.canvas;
          const world = worldRef.current;
          if (!canvas || !world) return;

          if (dragRef.current) {
            const rect = canvas.getBoundingClientRect();
            const local = world.toLocal({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            });
            const x = local.x - dragRef.current.offsetX;
            const y = local.y - dragRef.current.offsetY;
            const card = nodeSpritesRef.current.get(dragRef.current.id);
            if (card) card.position.set(x, y);
            return;
          }

          if (panRef.current) {
            const dx = e.clientX - panRef.current.x;
            const dy = e.clientY - panRef.current.y;
            onTransformChange({
              ...transformRef.current,
              x: panRef.current.ox + dx,
              y: panRef.current.oy + dy,
            });
          }
        };

        onWindowUp = () => {
          if (dragRef.current) {
            const card = nodeSpritesRef.current.get(dragRef.current.id);
            if (card) {
              onNodeMoveRef.current(dragRef.current.id, card.position.x, card.position.y);
            }
            dragRef.current = null;
          }
          panRef.current = null;
          setIsPanning(false);
        };

        await app.init({
          background: "#141414",
          resizeTo: mount,
          antialias: true,
          resolution: window.devicePixelRatio,
          autoDensity: true,
        });

        if (destroyed) {
          app.destroy(true);
          return;
        }

        mount.appendChild(app.canvas);
        viewportRef.current = { w: mount.clientWidth, h: mount.clientHeight };

        const world = new PIXI.Container();
        worldRef.current = world;
        app.stage.addChild(world);

        const panCatcher = new PIXI.Graphics();
        panCatcher.rect(-50000, -50000, 100000, 100000);
        panCatcher.fill({ color: 0x000000, alpha: 0 });
        panCatcher.eventMode = "static";
        world.addChild(panCatcher);

        const gridG = new PIXI.Graphics();
        gridRef.current = gridG;
        world.addChild(gridG);

        panCatcher.on("pointerdown", (e) => {
          if (dragRef.current) return;
          onSelect(null);
          panRef.current = {
            x: e.globalX,
            y: e.globalY,
            ox: transformRef.current.x,
            oy: transformRef.current.y,
          };
          setIsPanning(true);
        });

        app.canvas.addEventListener(
          "wheel",
          (e) => {
            e.preventDefault();
            const rect = app.canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            const factor = e.deltaY > 0 ? 0.92 : 1.08;
            onTransformChange(zoomAtPoint(transformRef.current, mx, my, factor));
          },
          { passive: false },
        );

        app.canvas.addEventListener("contextmenu", (e) => e.preventDefault());

        window.addEventListener("mousemove", onWindowMove);
        window.addEventListener("mouseup", onWindowUp);
        setInitError(null);
        setReady(true);
        applyTransform();
      } catch (err) {
        if (!destroyed) {
          setInitError(err instanceof Error ? err.message : "Canvas failed to initialize");
        }
      }
    })();

    return () => {
      destroyed = true;
      ro.disconnect();
      const sprites = nodeSpritesRef.current;
      if (onWindowMove) window.removeEventListener("mousemove", onWindowMove);
      if (onWindowUp) window.removeEventListener("mouseup", onWindowUp);
      appRef.current?.destroy(true);
      appRef.current = null;
      pixiRef.current = null;
      worldRef.current = null;
      gridRef.current = null;
      sprites.clear();
      mount.replaceChildren();
      setReady(false);
    };
  }, [onTransformChange, onSelect, applyTransform]);

  useEffect(() => {
    if (!ready || !worldRef.current || !pixiRef.current) return;

    const PIXI = pixiRef.current;
    const world = worldRef.current;
    let cancelled = false;

    const existingIds = new Set(nodeSpritesRef.current.keys());
    const nextIds = new Set(nodes.map((n) => n.id));

    for (const id of existingIds) {
      if (!nextIds.has(id)) {
        nodeSpritesRef.current.get(id)?.destroy({ children: true });
        nodeSpritesRef.current.delete(id);
      }
    }

    const handleDragStart = (node: GraphNode, globalX: number, globalY: number) => {
      const canvas = appRef.current?.canvas;
      const worldContainer = worldRef.current;
      if (!canvas || !worldContainer) return;
      const rect = canvas.getBoundingClientRect();
      const local = worldContainer.toLocal({ x: globalX - rect.left, y: globalY - rect.top });
      dragRef.current = {
        id: node.id,
        offsetX: local.x - node.x,
        offsetY: local.y - node.y,
      };
      const card = nodeSpritesRef.current.get(node.id);
      if (card?.parent) card.parent.addChild(card);
    };

    void (async () => {
      for (const node of nodes) {
        if (cancelled) return;
        if (nodeSpritesRef.current.has(node.id)) {
          syncCardPositions([node], nodeSpritesRef.current, selectedRef.current);
          continue;
        }

        const card = await createBoardItemSprite(
          PIXI,
          node,
          onSelect,
          (n, globalX, globalY) => handleDragStart(n, globalX, globalY),
          () => cancelled,
        );
        if (cancelled) return;

        card.position.set(node.x, node.y);
        world.addChild(card);
        nodeSpritesRef.current.set(node.id, card);
      }

      syncCardPositions(nodes, nodeSpritesRef.current, selectedRef.current);
    })();

    return () => {
      cancelled = true;
    };
  }, [nodes, ready, onSelect]);

  const cursor = isPanning || spaceRef.current ? "grabbing" : "default";

  return (
    <div ref={containerRef} className="absolute inset-0" style={{ cursor }}>
      {initError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-sm text-red-300/90">
          Canvas error: {initError}
        </div>
      )}
    </div>
  );
}
