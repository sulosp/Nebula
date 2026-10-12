import type { ReactNode } from "react";
import type { TemplateId } from "@/lib/template-catalog";

function Werkbank() {
  return (
    <div className="mock mock-werk">
      <header className="mock-bar">
        <strong>Holm Elektro</strong>
        <span>Meisterbetrieb</span>
      </header>
      <p className="mock-kicker">Installation · Prüfung · Altbau</p>
      <p className="mock-title">Leitungen, die man nicht zweimal legt.</p>
      <div className="mock-row">
        <span className="mock-pill mock-pill-solid">Anfrage</span>
        <span className="mock-pill">Einsatzgebiet</span>
      </div>
      <ul className="mock-tiles">
        <li>
          <b>01</b>
          <span>Wohnung</span>
        </li>
        <li>
          <b>02</b>
          <span>Gewerbe</span>
        </li>
        <li>
          <b>03</b>
          <span>Prüfung</span>
        </li>
      </ul>
    </div>
  );
}

function Sprechstunde() {
  return (
    <div className="mock mock-praxis">
      <header className="mock-bar">
        <strong>Praxis Lind</strong>
        <span>Hausarzt</span>
      </header>
      <p className="mock-title">Sprechstunde mit Luft zum Atmen.</p>
      <dl className="mock-hours">
        <div>
          <dt>Mo – Fr</dt>
          <dd>8 – 12</dd>
        </div>
        <div>
          <dt>Di, Do</dt>
          <dd>15 – 18</dd>
        </div>
      </dl>
      <p className="mock-note">Neue Patientinnen und Patienten willkommen.</p>
    </div>
  );
}

function Mandant() {
  return (
    <div className="mock mock-kanzlei">
      <p className="mock-kicker">Steuerberatung Voss</p>
      <p className="mock-title">Antworten in ganzen Sätzen.</p>
      <ol className="mock-index">
        <li>
          <span>01</span> Jahresabschluss
        </li>
        <li>
          <span>02</span> Lohn und Gehalt
        </li>
        <li>
          <span>03</span> Laufende Beratung
        </li>
      </ol>
      <p className="mock-note">Erstgespräch nach Vereinbarung.</p>
    </div>
  );
}

function Tageskarte() {
  return (
    <div className="mock mock-cafe">
      <p className="mock-brand">café nord</p>
      <p className="mock-display">Morgen.</p>
      <ul className="mock-menu">
        <li>
          <span>Espresso</span>
          <span>2,80</span>
        </li>
        <li>
          <span>Milchkaffee</span>
          <span>3,60</span>
        </li>
        <li>
          <span>Käsekuchen</span>
          <span>4,20</span>
        </li>
      </ul>
      <p className="mock-note">Di – So, ab 8 Uhr</p>
    </div>
  );
}

const MOCKS: Record<TemplateId, () => ReactNode> = {
  werkbank: Werkbank,
  sprechstunde: Sprechstunde,
  mandant: Mandant,
  tageskarte: Tageskarte,
};

export function TemplatePreview({ id, url }: { id: TemplateId; url: string }) {
  const Mock = MOCKS[id];

  return (
    <div className={`specimen specimen-${id}`}>
      <div className="specimen-chrome">
        <span className="specimen-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="specimen-url">{url}</span>
      </div>
      <div className="specimen-canvas">
        <Mock />
      </div>
    </div>
  );
}
