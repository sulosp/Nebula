"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { applyTheme, readTheme } from "@/lib/theme";

export function ThemeToggle({
  label = "Toggle light and dark mode",
}: {
  label?: string;
}) {
  return (
    <button
      type="button"
      className="btn btn-icon theme-toggle"
      aria-label={label}
      onClick={() => applyTheme(readTheme() === "light" ? "dark" : "light")}
    >
      <Sun className="theme-icon theme-icon-sun" size={16} aria-hidden />
      <Moon className="theme-icon theme-icon-moon" size={16} aria-hidden />
    </button>
  );
}
