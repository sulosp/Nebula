export type TemplateId = "werkbank" | "sprechstunde" | "mandant" | "tageskarte";

export type TemplateOffer = {
  id: TemplateId;
  niche: string;
  name: string;
  summary: string;
  url: string;
};

export const TEMPLATES: TemplateOffer[] = [
  {
    id: "werkbank",
    niche: "Handwerk",
    name: "Werkbank",
    summary:
      "Für Betriebe mit Leistungen, Einsatzgebiet und einer klaren Anfrage. Beispiel: ein Elektromeisterbetrieb.",
    url: "beispiel.folio/werkbank",
  },
  {
    id: "sprechstunde",
    niche: "Arztpraxis",
    name: "Sprechstunde",
    summary:
      "Ruhige Vorstellung, Sprechzeiten und Anfahrt. Beispiel: eine Hausarztpraxis, kein echtes MVZ.",
    url: "beispiel.folio/sprechstunde",
  },
  {
    id: "mandant",
    niche: "Steuerberatung",
    name: "Mandant",
    summary:
      "Zurückhaltend und genau: Leistungsspektrum, Erstgespräch, wenig Dekoration.",
    url: "beispiel.folio/mandant",
  },
  {
    id: "tageskarte",
    niche: "Café",
    name: "Tageskarte",
    summary:
      "Eine Karte, Öffnungszeiten, ein Ton. Beispiel: ein Nachbarschaftscafé, keine Kette.",
    url: "beispiel.folio/tageskarte",
  },
];

export const FEATURES = [
  {
    id: "pages",
    title: "Impressum und Datenschutz",
    body: "Eigene Seiten, als Ausgangstext. Platzhalter ersetzen Sie durch den echten Betrieb, bevor die Website online geht.",
  },
  {
    id: "consent",
    title: "Consent blockiert Tracker",
    body: "Analyse, Marketing und externe Einbettungen laden erst nach einer Einwilligung. Vorher bleibt die Seite bei dem, was sie zum Funktionieren braucht.",
  },
  {
    id: "fonts",
    title: "Schriften aus dem Projekt",
    body: "Die Schriftdateien liegen bei der Website. Die Vorlage ruft keinen Schriftanbieter auf.",
  },
  {
    id: "copy",
    title: "Texte auf Deutsch",
    body: "Navigation, Abschnitte, Formulare und kurze Hinweise sind auf Deutsch geschrieben, nicht nachträglich übersetzt.",
  },
  {
    id: "access",
    title: "Grundlage fürs BFSG",
    body: "Überschriften, Tastatur, sichtbarer Fokus und Kontrast sind angelegt. Ob die veröffentlichte Seite die Pflichten trifft, hängt von Ihren Inhalten ab.",
  },
  {
    id: "licence",
    title: "Zwei Lizenzen",
    body: "Einzellizenz für eine Website. Agenturlizenz für beliebig viele Kundenprojekte — die Vorlage selbst wird nicht weiterverkauft.",
  },
] as const;

export const PLANS = [
  {
    id: "single",
    name: "Einzellizenz",
    tag: "Eine Website",
    price: "49–79",
    note: "einmalig, je Vorlage",
    lede: "Für einen Betrieb, der diese Vorlage einmal veröffentlicht.",
    points: [
      "Ein Auftrag, eine veröffentlichte Website",
      "Alle Seiten, inklusive Impressum und Datenschutz",
      "Texte, Farben und Bilder zum Austauschen",
      "Kauf über Framer Marketplace oder Gumroad",
    ],
  },
  {
    id: "agency",
    name: "Agenturlizenz",
    tag: "Für Studios",
    price: "149–199",
    note: "einmalig, je Vorlage",
    lede: "Dieselbe Vorlage in Kundenprojekten, ohne Mengengrenze.",
    points: [
      "Unbegrenzt viele Websites für Auftraggebende",
      "Dieselben Seiten und Bausteine wie die Einzellizenz",
      "Weiterverkauf der Vorlage als Vorlage ist ausgenommen",
      "Kauf über dieselben zwei Kanäle",
    ],
    featured: true,
  },
] as const;

export const FAQS = [
  {
    q: "Sind die Vorlagen rechtssicher?",
    a: "Nein. Das behaupten wir nicht. DSGVO-ready heißt: Impressum, Datenschutz, ein Consent-Banner und der Verzicht auf externe Schriften sind vorbereitet. Das ist keine Rechtsgarantie und keine Rechtsberatung. Texte, Tools und Pflichtangaben passen Sie an den echten Betrieb an.",
  },
  {
    q: "Was blockiert das Consent-Banner?",
    a: "Skripte für Analyse, Marketing und Einbettungen, die für den Betrieb der Seite nicht nötig sind. Sie starten erst, wenn eine Einwilligung vorliegt. Das Speichern der Entscheidung selbst bleibt davon getrennt.",
  },
  {
    q: "Warum liegen die Schriften im Projekt?",
    a: "Ein Aufruf bei einem Schriftanbieter überträgt die IP-Adresse der Besucherinnen und Besucher. In den Vorlagen entfällt dieser Aufruf, weil die Dateien mitgeliefert werden.",
  },
  {
    q: "Für wen sind die vier Vorlagen gedacht?",
    a: "Für Handwerksbetriebe, Arztpraxen, Steuerberatungen und Cafés. Ton, Aufbau und Beispielinhalte sind auf diese Fälle zugeschnitten. Andere lokale Angebote lassen sich daraus ableiten, starten aber nicht bei einem generischen Startup-Layout.",
  },
  {
    q: "Was unterscheidet die beiden Lizenzen?",
    a: "Die Einzellizenz gilt für eine Website und kostet je nach Vorlage 49–79 €. Die Agenturlizenz kostet 149–199 € und gilt für dieselbe Vorlage in unbegrenzt vielen Kundenprojekten. In beiden Fällen ist der Weiterverkauf der Vorlage selbst ausgenommen. Der genaue Preis steht an der jeweiligen Vorlage, innerhalb dieser Spannen.",
  },
  {
    q: "Wo kaufe ich, und was bleibt danach zu tun?",
    a: "Der Verkauf läuft über den Framer Marketplace und über Gumroad, nicht über diese Vorschau. Nach dem Kauf ersetzen Sie Texte, Bilder und Farben, tragen Impressum und Datenschutz des Betriebs ein und verbinden das Banner mit den Tools, die Sie wirklich einsetzen.",
  },
  {
    q: "Erfüllt eine Vorlage das BFSG?",
    a: "Sie ist darauf angelegt: semantische Struktur, Bedienung per Tastatur, sichtbarer Fokus, nachvollziehbare Beschriftungen und Kontrast. Ob die veröffentlichte Website die Pflichten des Barrierefreiheitsstärkungsgesetzes trifft, hängt zusätzlich von Ihren Texten, PDFs, Videos und vom laufenden Betrieb ab.",
  },
] as const;
