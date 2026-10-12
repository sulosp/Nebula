import Link from "next/link";
import { Article } from "@phosphor-icons/react/dist/ssr/Article";
import { Check } from "@phosphor-icons/react/dist/ssr/Check";
import { Coffee } from "@phosphor-icons/react/dist/ssr/Coffee";
import { Cookie } from "@phosphor-icons/react/dist/ssr/Cookie";
import { Calculator } from "@phosphor-icons/react/dist/ssr/Calculator";
import { FileText } from "@phosphor-icons/react/dist/ssr/FileText";
import { Hammer } from "@phosphor-icons/react/dist/ssr/Hammer";
import { Handshake } from "@phosphor-icons/react/dist/ssr/Handshake";
import { Stethoscope } from "@phosphor-icons/react/dist/ssr/Stethoscope";
import { TextAa } from "@phosphor-icons/react/dist/ssr/TextAa";
import { Wheelchair } from "@phosphor-icons/react/dist/ssr/Wheelchair";
import type { Icon } from "@phosphor-icons/react";
import { TemplatePreview } from "@/components/template-preview";
import { FAQS, FEATURES, PLANS, TEMPLATES, type TemplateId } from "@/lib/template-catalog";

const NICHE_ICONS: Record<TemplateId, Icon> = {
  werkbank: Hammer,
  sprechstunde: Stethoscope,
  mandant: Calculator,
  tageskarte: Coffee,
};

const FEATURE_ICONS: Record<(typeof FEATURES)[number]["id"], Icon> = {
  pages: FileText,
  consent: Cookie,
  fonts: TextAa,
  copy: Article,
  access: Wheelchair,
  licence: Handshake,
};

const FACTS = [
  { value: "4", label: "Branchen, eine Grundlage" },
  { value: "49–79 €", label: "Einzellizenz je Vorlage" },
  { value: "149–199 €", label: "Agenturlizenz je Vorlage" },
  { value: "0", label: "Tracker vor der Einwilligung" },
];

export default function TemplatesPage() {
  return (
    <>
      <section className="folio-hero">
        <div className="folio-hero-copy">
          <p className="card-kicker">DSGVO-ready · Deutscher Markt</p>
          <h1>Vier Vorlagen, die Impressum und Consent schon mitbringen.</h1>
          <p className="folio-lede">
            Für Handwerk, Arztpraxen, Steuerberatung und Cafés. Tracker bleiben
            blockiert, bis eine Einwilligung da ist. Schriften liegen im Projekt,
            die Texte sind auf Deutsch, die Struktur ist auf Barrierefreiheit angelegt.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" href="/templates#vorlagen">
              Vorlagen ansehen
            </Link>
            <Link className="btn btn-secondary" href="/templates#preise">
              Lizenzen vergleichen
            </Link>
          </div>
          <p className="folio-fine">
            Einzellizenz 49–79&nbsp;€, Agenturlizenz 149–199&nbsp;€. Verkauf über
            Framer Marketplace und Gumroad. Keine Rechtsgarantie — die Angaben
            bleiben bei Ihnen.
          </p>
        </div>
        <div className="folio-stage" aria-hidden="true">
          <div className="folio-stage-back">
            <TemplatePreview id="sprechstunde" url="beispiel.folio/sprechstunde" />
          </div>
          <div className="folio-stage-front">
            <TemplatePreview id="tageskarte" url="beispiel.folio/tageskarte" />
          </div>
        </div>
      </section>

      <section className="folio-facts" aria-label="Kurzüberblick">
        {FACTS.map((fact) => (
          <div key={fact.label}>
            <p className="folio-fact-value">{fact.value}</p>
            <p className="folio-fact-label">{fact.label}</p>
          </div>
        ))}
      </section>

      <section id="vorlagen" className="folio-section" aria-labelledby="vorlagen-title">
        <header className="folio-section-head">
          <p className="card-kicker">01 — Vorlagen</p>
          <h2 id="vorlagen-title">Vier Branchen, als Platzhalter gezeigt.</h2>
          <p>
            Die Betriebe in den Vorschauen sind erfunden. So sieht das Gerüst aus,
            bevor Namen, Fotos und Preise des echten Betriebs eingesetzt werden.
          </p>
        </header>
        <div className="folio-gallery">
          {TEMPLATES.map((template) => {
            const NicheIcon = NICHE_ICONS[template.id];
            return (
              <article key={template.id} className="card elev-md folio-card">
                <div className="folio-card-preview" aria-hidden="true">
                  <TemplatePreview id={template.id} url={template.url} />
                </div>
                <div className="folio-card-copy">
                  <p className="folio-niche">
                    <NicheIcon size={16} aria-hidden />
                    {template.niche}
                  </p>
                  <h3>{template.name}</h3>
                  <p>{template.summary}</p>
                  <p className="folio-card-price">
                    <span>49–79&nbsp;€</span>
                    <span className="text-muted">Einzellizenz</span>
                  </p>
                  <Link className="btn btn-ghost" href="/templates#preise">
                    Lizenz ansehen
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="leistungen" className="folio-section" aria-labelledby="leistungen-title">
        <header className="folio-section-head">
          <p className="card-kicker">02 — Leistungen</p>
          <h2 id="leistungen-title">Was in jeder Vorlage steckt.</h2>
          <p>
            Eine Arbeitsgrundlage für den deutschen Markt. Die rechtlichen Texte
            passen Sie an Ihr Angebot an — die Seiten und die Technik müssen Sie
            nicht erst nachrüsten.
          </p>
        </header>
        <div className="folio-features">
          {FEATURES.map((feature) => {
            const FeatureIcon = FEATURE_ICONS[feature.id];
            return (
              <article key={feature.id} className="card elev-sm folio-feature">
                <FeatureIcon size={22} aria-hidden className="folio-feature-icon" />
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="preise" className="folio-section" aria-labelledby="preise-title">
        <header className="folio-section-head">
          <p className="card-kicker">03 — Preise</p>
          <h2 id="preise-title">Eine Website, oder alle Kundenprojekte.</h2>
          <p>
            Der Preis hängt von der Vorlage ab und liegt in der genannten Spanne.
            Bezahlt wird auf Framer Marketplace oder Gumroad, nicht hier.
          </p>
        </header>
        <div className="folio-plans">
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              className={
                "featured" in plan && plan.featured
                  ? "card folio-plan folio-plan-agency"
                  : "card elev-sm folio-plan"
              }
            >
              <p className={"featured" in plan && plan.featured ? "tag tag-accent" : "tag tag-neutral"}>
                {plan.tag}
              </p>
              <h3>{plan.name}</h3>
              <p className="folio-price">
                {plan.price}
                <span>&nbsp;€</span>
              </p>
              <p className="folio-price-note">{plan.note}</p>
              <p>{plan.lede}</p>
              <ul className="folio-points">
                {plan.points.map((point) => (
                  <li key={point}>
                    <Check size={15} weight="bold" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="fragen" className="folio-section" aria-labelledby="fragen-title">
        <header className="folio-section-head">
          <p className="card-kicker">04 — Fragen</p>
          <h2 id="fragen-title">Was die Vorlage leistet und was nicht.</h2>
        </header>
        <div className="folio-faqs">
          {FAQS.map((item, index) => (
            <details key={item.q} className="folio-faq" open={index === 0}>
              <summary>
                <h3>{item.q}</h3>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="folio-cta" aria-labelledby="cta-title">
        <p className="card-kicker">Nächster Schritt</p>
        <h2 id="cta-title">Zuerst die Branche, dann die Lizenz.</h2>
        <p>
          Wählen Sie eine Vorlage und die passende Lizenz. Der Kauf selbst liegt
          bei Framer Marketplace und Gumroad.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/templates#vorlagen">
            Vorlage wählen
          </Link>
          <Link className="btn btn-secondary" href="/templates#preise">
            Preise ansehen
          </Link>
        </div>
      </section>
    </>
  );
}
