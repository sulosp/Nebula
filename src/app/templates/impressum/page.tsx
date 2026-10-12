import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Anbieterkennzeichnung der Folio-Vorschau. Ein Verkauf findet auf dieser Seite nicht statt.",
};

export default function ImpressumPage() {
  return (
    <article className="folio-legal">
      <p className="card-kicker">Anbieterkennzeichnung</p>
      <h1>Impressum</h1>
      <p>
        Angaben nach §&nbsp;5 DDG. Diese Seite ist eine Vorschau. Über sie kommt
        kein Vertrag zustande.
      </p>
      <h2>Anbieter</h2>
      <p>
        Name, ladungsfähige Anschrift und ein direkter Kontakt werden hier
        veröffentlicht, bevor die Vorlagen auf Framer Marketplace und Gumroad
        angeboten werden.
      </p>
      <h2>Verantwortlich für den Inhalt</h2>
      <p>Wird mit der Anbieterkennzeichnung ergänzt.</p>
      <h2>Hinweis zu den Vorlagen</h2>
      <p>
        Die Vorlagen sind DSGVO-ready vorbereitet. Das ist keine Rechtsberatung
        und keine Aussage darüber, dass eine damit erstellte Website rechtssicher
        wäre. Pflichtangaben, Texte und eingesetzte Tools bleiben Sache des
        jeweiligen Betriebs.
      </p>
      <p>
        <Link href="/templates">Zurück zur Übersicht</Link>
      </p>
    </article>
  );
}
