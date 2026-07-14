import type { Container, Graphics, TextStyleOptions } from "pixi.js";
import { getNodeSize, hostnameFromUrl } from "./board-items";
import type { GraphNode } from "./types";

type Pixi = typeof import("pixi.js");

const COLORS = {
  stroke: { color: 0xe4e4e4, alpha: 0.22 },
  accent: 0x599ce7,
  card: 0x1e1e1e,
  linkBg: 0x1a1d24,
  textBg: 0x26241c,
  textLabel: 0x599ce7,
  placeholder: 0x2a2a2a,
  linkIcon: 0x87c3ff,
} as const;

function addShadow(PIXI: Pixi, card: Container, w: number, h: number) {
  const shadow = new PIXI.Graphics();
  shadow.roundRect(4, 6, w, h, 8);
  shadow.fill({ color: 0x000000, alpha: 0.35 });
  card.addChild(shadow);
}

function addBackground(PIXI: Pixi, card: Container, w: number, h: number, fill: number) {
  const bg = new PIXI.Graphics();
  bg.roundRect(0, 0, w, h, 8);
  bg.fill({ color: fill });
  bg.stroke({ ...COLORS.stroke, width: 1 });
  card.addChild(bg);
  return bg;
}

function attachDragHandlers(
  card: Container,
  node: GraphNode,
  w: number,
  h: number,
  onSelect: (id: string) => void,
  onDragStart: (node: GraphNode, globalX: number, globalY: number) => void,
) {
  card.pivot.set(w / 2, h / 2);
  card.eventMode = "static";
  card.cursor = "grab";
  card.on("pointerdown", (e) => {
    e.stopPropagation();
    onSelect(node.id);
    onDragStart(node, e.globalX, e.globalY);
    card.cursor = "grabbing";
  });
  card.on("pointerup", () => {
    card.cursor = "grab";
  });
  card.on("pointerupoutside", () => {
    card.cursor = "grab";
  });
}

export async function createBoardItemSprite(
  PIXI: Pixi,
  node: GraphNode,
  onSelect: (id: string) => void,
  onDragStart: (node: GraphNode, globalX: number, globalY: number) => void,
  cancelled: () => boolean,
): Promise<Container> {
  const { width: w, height: h } = getNodeSize(node);
  const card = new PIXI.Container();

  const titleStyle: TextStyleOptions = {
    fontFamily: "system-ui, sans-serif",
    fontSize: 12,
    fill: "#E4E4E4EB",
    wordWrap: true,
    wordWrapWidth: w - 24,
  };
  const metaStyle: TextStyleOptions = {
    fontFamily: "system-ui, sans-serif",
    fontSize: 10,
    fill: "#E4E4E45E",
  };
  const labelStyle: TextStyleOptions = {
    fontFamily: "system-ui, sans-serif",
    fontSize: 10,
    fill: "#599CE7",
    fontWeight: "600",
    letterSpacing: 0.6,
  };
  const bodyStyle: TextStyleOptions = {
    fontFamily: "system-ui, sans-serif",
    fontSize: 11,
    fill: "#E4E4E4D9",
    wordWrap: true,
    wordWrapWidth: w - 24,
    lineHeight: 16,
  };

  if (node.kind === "image") {
    addShadow(PIXI, card, w, h);
    addBackground(PIXI, card, w, h, COLORS.card);

    const imageArea = h - 44;
    try {
      if (!node.imageUrl) throw new Error("missing image");
      const texture = await PIXI.Assets.load(node.imageUrl);
      if (cancelled()) {
        card.destroy({ children: true });
        return card;
      }
      const sprite = new PIXI.Sprite(texture);
      sprite.x = 8;
      sprite.y = 8;
      sprite.width = w - 16;
      sprite.height = imageArea - 8;
      card.addChild(sprite);
    } catch {
      const placeholder = new PIXI.Graphics();
      placeholder.roundRect(8, 8, w - 16, imageArea - 8, 4);
      placeholder.fill({ color: COLORS.placeholder });
      card.addChild(placeholder);
    }

    const caption = new PIXI.Graphics();
    caption.roundRect(8, imageArea, w - 16, 32, 4);
    caption.fill({ color: 0x000000, alpha: 0.45 });
    card.addChild(caption);

    const title = new PIXI.Text({ text: node.title, style: { ...titleStyle, fontSize: 11 } });
    title.x = 14;
    title.y = imageArea + 8;
    card.addChild(title);

    const source = new PIXI.Text({ text: node.source, style: metaStyle });
    source.x = 14;
    source.y = imageArea + 24;
    card.addChild(source);
  } else if (node.kind === "link") {
    addShadow(PIXI, card, w, h);
    addBackground(PIXI, card, w, h, COLORS.linkBg);

    const badge = new PIXI.Graphics();
    badge.roundRect(12, 12, 52, 22, 4);
    badge.fill({ color: COLORS.accent, alpha: 0.18 });
    badge.stroke({ color: COLORS.accent, alpha: 0.45, width: 1 });
    card.addChild(badge);

    const badgeText = new PIXI.Text({ text: "LINK", style: { ...labelStyle, fontSize: 9 } });
    badgeText.x = 22;
    badgeText.y = 16;
    card.addChild(badgeText);

    const icon = new PIXI.Text({ text: "↗", style: { fontFamily: "system-ui", fontSize: 18, fill: "#87c3ff" } });
    icon.x = w - 34;
    icon.y = 14;
    card.addChild(icon);

    const title = new PIXI.Text({ text: node.title, style: titleStyle });
    title.x = 12;
    title.y = 44;
    card.addChild(title);

    const host = new PIXI.Text({
      text: hostnameFromUrl(node.url) || node.source,
      style: { ...metaStyle, fill: "#87c3ff" },
    });
    host.x = 12;
    host.y = 68;
    card.addChild(host);

    const source = new PIXI.Text({ text: `${node.source} · ${node.tags.slice(0, 2).join(" · ")}`, style: metaStyle });
    source.x = 12;
    source.y = 92;
    card.addChild(source);

    if (node.imageUrl) {
      try {
        const texture = await PIXI.Assets.load(node.imageUrl);
        if (!cancelled()) {
          const thumb = new PIXI.Sprite(texture);
          thumb.x = w - 72;
          thumb.y = h - 56;
          thumb.width = 56;
          thumb.height = 44;
          card.addChild(thumb);
          const thumbMask = new PIXI.Graphics();
          thumbMask.roundRect(w - 72, h - 56, 56, 44, 4);
          thumbMask.fill(0xffffff);
          card.addChild(thumbMask);
          thumb.mask = thumbMask;
        }
      } catch {
        /* optional thumb */
      }
    }
  } else {
    addShadow(PIXI, card, w, h);
    addBackground(PIXI, card, w, h, COLORS.textBg);

    const accentBar = new PIXI.Graphics();
    accentBar.roundRect(0, 0, 4, h, 2);
    accentBar.fill({ color: COLORS.textLabel });
    card.addChild(accentBar);

    const label = new PIXI.Text({ text: node.title.toUpperCase(), style: labelStyle });
    label.x = 16;
    label.y = 14;
    card.addChild(label);

    const source = new PIXI.Text({ text: node.source, style: metaStyle });
    source.x = 16;
    source.y = 30;
    card.addChild(source);

    const body = new PIXI.Text({
      text: node.body ?? node.searchText,
      style: bodyStyle,
    });
    body.x = 16;
    body.y = 52;
    card.addChild(body);
  }

  attachDragHandlers(card, node, w, h, onSelect, onDragStart);
  return card;
}

export function updateBoardItemSelection(bg: Graphics, node: GraphNode, selected: boolean) {
  const { width: w, height: h } = getNodeSize(node);
  const fill =
    node.kind === "text"
      ? selected
        ? 0x2e2c24
        : COLORS.textBg
      : node.kind === "link"
        ? selected
          ? 0x22262e
          : COLORS.linkBg
        : selected
          ? 0x242424
          : COLORS.card;
  bg.clear();
  bg.roundRect(0, 0, w, h, 8);
  bg.fill({ color: fill });
  bg.stroke({
    color: selected ? COLORS.accent : COLORS.stroke.color,
    alpha: selected ? 1 : COLORS.stroke.alpha,
    width: selected ? 2 : 1,
  });
}

export function getNodeBounds(node: GraphNode) {
  const { width, height } = getNodeSize(node);
  return { width, height };
}
