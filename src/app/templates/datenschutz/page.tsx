import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz",
  description:
    "Was diese Folio-Vorschau speichert: keine Tracker, eine lokale Darstellungswahl, Schriften vom eigenen Server.",
};

export default function DatenschutzPage() {
  return (
    <article className="folio-legal">
      <p className="card-kicker">Diese Vorschau</p>
      <h1>Datenschutz</h1>
      <p>
        Diese Vorschau setzt keine Analyse- und keine Marketing-Tracker ein. Ein
        Consent-Banner ist hier deshalb nicht eingeblendet. Die Vorlagen, die
        Folio verkauft, enthalten eines: es blockiert solche Tracker, bis eine
        Einwilligung vorliegt.
      </p>
      <h2>Lokal gespeicherte Darstellung</h2>
      <p>
        Wenn Sie zwischen hellem und dunklem Modus wechseln, merkt sich der
        Browser die Wahl auf Ihrem Gerät. Die Angabe wird nicht an einen Server
        dieser Vorschau gesendet.
      </p>
      <h2>Schriften</h2>
      <p>
        Die Schrift Inter wird von dieser Website selbst ausgeliefert. Es gibt
        keinen Aufruf bei einem Schriftanbieter.
      </p>
      <h2>Verbindung zum Server</h2>
      <p>
        Der Server, der diese Seite ausliefert, kann technisch notwendige
        Verbindungsdaten verarbeiten, etwa IP-Adresse und Zeitpunkt. Eine Liste
        der dann zuständigen Verantwortlichen und Dienstleister wird
        veröffentlicht, bevor die Vorlagen zum Kauf stehen.
      </p>
      <p>
        <Link href="/templates">Zurück zur Übersicht</Link>
      </p>
    </article>
  );
}
