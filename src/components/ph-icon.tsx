"use client";

import {
  ArrowLeft,
  ArrowRight,
  Bag,
  Check,
  Desktop,
  FigmaLogo,
  FileText,
  Lightning,
  Minus,
  Plus,
  Sparkle,
  Storefront,
  Trash,
  X,
  type Icon,
} from "@phosphor-icons/react";

const ICONS: Record<string, Icon> = {
  "ph-arrow-left": ArrowLeft,
  "ph-arrow-right": ArrowRight,
  "ph-bag": Bag,
  "ph-check": Check,
  "ph-desktop": Desktop,
  "ph-figma-logo": FigmaLogo,
  "ph-file-text": FileText,
  "ph-lightning": Lightning,
  "ph-minus": Minus,
  "ph-plus": Plus,
  "ph-sparkle": Sparkle,
  "ph-storefront": Storefront,
  "ph-trash": Trash,
  "ph-x": X,
};

type Props = {
  name: string;
  size?: number;
  className?: string;
};

export function PhIcon({ name, size = 16, className }: Props) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp size={size} className={className} weight="regular" />;
}
