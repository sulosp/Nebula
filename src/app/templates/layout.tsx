import type { Metadata } from "next";
import type { ReactNode } from "react";
import { TemplateFrame } from "@/components/template-frame";
import "@/styles/templates.css";

export const metadata: Metadata = {
  title: {
    default: "Folio — DSGVO-ready Website-Vorlagen",
    template: "%s — Folio",
  },
  description:
    "Website-Vorlagen für Handwerk, Arztpraxen, Steuerberatung und Cafés. Mit Impressum, Datenschutz, Consent-Banner und deutschen Texten. Einzellizenz 49–79 €, Agenturlizenz 149–199 €.",
  openGraph: {
    title: "Folio — DSGVO-ready Website-Vorlagen",
    description:
      "Vier Vorlagen für den deutschen Markt. Impressum, Datenschutz und ein Consent-Banner, das Tracker blockiert, sind vorbereitet.",
    locale: "de_DE",
    type: "website",
  },
};

export default function TemplatesLayout({ children }: { children: ReactNode }) {
  return <TemplateFrame>{children}</TemplateFrame>;
}
