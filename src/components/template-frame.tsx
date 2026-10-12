import { headers } from "next/headers";
import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV = [
  { href: "/templates#vorlagen", label: "Vorlagen" },
  { href: "/templates#leistungen", label: "Leistungen" },
  { href: "/templates#preise", label: "Preise" },
  { href: "/templates#fragen", label: "Fragen" },
];

export async function TemplateFrame({ children }: { children: ReactNode }) {
  const path = (await headers()).get("x-pathname") ?? "";

  return (
    <div className="folio">
      <a className="folio-skip" href="#inhalt">
        Zum Inhalt
      </a>
      <header className="folio-nav">
        <Link className="folio-brand" href="/templates">
          <span className="folio-mark" aria-hidden="true" />
          Folio
        </Link>
        <nav className="folio-nav-links" aria-label="Seitenabschnitte">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="folio-nav-tools">
          <ThemeToggle label="Zwischen hellem und dunklem Modus wechseln" />
          <Link className="btn btn-primary" href="/templates#preise">
            Lizenzen
          </Link>
        </div>
      </header>
      <main id="inhalt">{children}</main>
      <footer className="folio-footer">
        <div className="folio-footer-brand">
          <p className="folio-brand">
            <span className="folio-mark" aria-hidden="true" />
            Folio
          </p>
          <p>Website-Vorlagen für lokale Betriebe. DSGVO-ready vorbereitet, ohne Rechtsgarantie.</p>
        </div>
        <nav aria-label="Fußnavigation">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="folio-footer-legal">
          <p>
            <Link
              href="/templates/impressum"
              aria-current={path.startsWith("/templates/impressum") ? "page" : undefined}
            >
              Impressum
            </Link>
            <Link
              href="/templates/datenschutz"
              aria-current={path.startsWith("/templates/datenschutz") ? "page" : undefined}
            >
              Datenschutz
            </Link>
          </p>
          <p>
            Verkauf über{" "}
            <a href="https://www.framer.com/marketplace/" target="_blank" rel="noopener noreferrer">
              Framer Marketplace
              <span className="folio-sr"> (öffnet in neuem Tab)</span>
            </a>{" "}
            und{" "}
            <a href="https://gumroad.com/" target="_blank" rel="noopener noreferrer">
              Gumroad
              <span className="folio-sr"> (öffnet in neuem Tab)</span>
            </a>
            . Diese Vorschau nimmt keine Bestellung an.
          </p>
        </div>
      </footer>
    </div>
  );
}
