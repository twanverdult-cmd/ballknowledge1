// "pct" = geschat percentage spelers dat dit antwoord zou geven (verzonnen schattingen).
export type Answer = { name: string; pct: number; aliases?: string[] };
export type Question = { prompt: string; answers: Answer[] };

export const QUESTIONS: Question[] = [
  {
    prompt: "Noem een land dat begint met de S",
    answers: [
      { name: "Spanje", pct: 45 },
      { name: "Zweden", pct: 0, aliases: [] },
      { name: "Schotland", pct: 10 },
      { name: "Servië", pct: 6, aliases: ["servie"] },
      { name: "Slowakije", pct: 5 },
      { name: "Slovenië", pct: 4, aliases: ["slovenie"] },
      { name: "Syrië", pct: 5, aliases: ["syrie"] },
      { name: "Somalië", pct: 3, aliases: ["somalie"] },
      { name: "Senegal", pct: 3 },
      { name: "Soedan", pct: 2, aliases: ["sudan"] },
      { name: "Suriname", pct: 6 },
      { name: "Singapore", pct: 3 },
      { name: "Sri Lanka", pct: 2 },
      { name: "Saoedi-Arabië", pct: 2, aliases: ["saoedi arabie", "saudi arabie"] },
      { name: "San Marino", pct: 1 },
      { name: "Sierra Leone", pct: 1 },
      { name: "Seychellen", pct: 1 },
      { name: "Samoa", pct: 0.5 },
      { name: "Sao Tomé en Principe", pct: 0.3, aliases: ["sao tome en principe", "sao tome"] },
      { name: "Saint Kitts en Nevis", pct: 0.2, aliases: ["saint kitts", "sint kitts en nevis"] },
      { name: "Saint Lucia", pct: 0.3, aliases: ["sint lucia"] },
      { name: "Salomonseilanden", pct: 0.4 },
    ].filter((a) => a.name !== "Zweden"),
  },
  {
    prompt: "Noem een dier dat begint met de K",
    answers: [
      { name: "Kat", pct: 40 },
      { name: "Koe", pct: 20 },
      { name: "Konijn", pct: 12 },
      { name: "Kip", pct: 10 },
      { name: "Kangoeroe", pct: 6 },
      { name: "Kameel", pct: 3 },
      { name: "Kikker", pct: 3 },
      { name: "Krokodil", pct: 2 },
      { name: "Koala", pct: 2 },
      { name: "Kwal", pct: 1 },
      { name: "Kievit", pct: 0.5 },
      { name: "Kolibrie", pct: 0.5 },
      { name: "Kakapo", pct: 0.1 },
      { name: "Kinkajoe", pct: 0.05 },
      { name: "Koedoe", pct: 0.1 },
      { name: "Kraanvogel", pct: 0.3 },
    ],
  },
  {
    prompt: "Noem een hoofdstad in Afrika",
    answers: [
      { name: "Caïro", pct: 35, aliases: ["cairo"] },
      { name: "Nairobi", pct: 15 },
      { name: "Pretoria", pct: 10 },
      { name: "Kaapstad", pct: 8 },
      { name: "Abuja", pct: 5 },
      { name: "Addis Abeba", pct: 5 },
      { name: "Rabat", pct: 4 },
      { name: "Tunis", pct: 3 },
      { name: "Accra", pct: 3 },
      { name: "Dakar", pct: 2 },
      { name: "Kinshasa", pct: 2 },
      { name: "Algiers", pct: 2 },
      { name: "Kampala", pct: 1 },
      { name: "Harare", pct: 1 },
      { name: "Ouagadougou", pct: 0.5 },
      { name: "Antananarivo", pct: 0.3 },
      { name: "Ndjamena", pct: 0.2, aliases: ["n'djamena", "njamena"] },
      { name: "Gaborone", pct: 0.3 },
      { name: "Mbabane", pct: 0.1 },
      { name: "Moroni", pct: 0.1 },
    ],
  },
  {
    prompt: "Noem een planeet of dwergplaneet",
    answers: [
      { name: "Mars", pct: 35 },
      { name: "Aarde", pct: 15 },
      { name: "Jupiter", pct: 15 },
      { name: "Saturnus", pct: 10 },
      { name: "Venus", pct: 8 },
      { name: "Mercurius", pct: 5 },
      { name: "Pluto", pct: 6 },
      { name: "Neptunus", pct: 3 },
      { name: "Uranus", pct: 3 },
      { name: "Ceres", pct: 0.5 },
      { name: "Eris", pct: 0.3 },
      { name: "Makemake", pct: 0.1 },
      { name: "Haumea", pct: 0.1 },
    ],
  },
  {
    prompt: "Noem een scheikundig element",
    answers: [
      { name: "Zuurstof", pct: 30 },
      { name: "Waterstof", pct: 15 },
      { name: "Goud", pct: 10 },
      { name: "IJzer", pct: 8 },
      { name: "Koolstof", pct: 8 },
      { name: "Stikstof", pct: 6 },
      { name: "Helium", pct: 5 },
      { name: "Zilver", pct: 4 },
      { name: "Koper", pct: 3 },
      { name: "Uranium", pct: 2 },
      { name: "Natrium", pct: 2 },
      { name: "Lood", pct: 2 },
      { name: "Neon", pct: 1 },
      { name: "Kwik", pct: 1 },
      { name: "Titanium", pct: 1 },
      { name: "Wolfraam", pct: 0.3 },
      { name: "Molybdeen", pct: 0.1 },
      { name: "Praseodymium", pct: 0.03 },
      { name: "Hafnium", pct: 0.05 },
      { name: "Ytterbium", pct: 0.05 },
      { name: "Telluur", pct: 0.05 },
    ],
  },
  {
    prompt: "Noem een Nederlandse provinciehoofdstad",
    answers: [
      { name: "Utrecht", pct: 25 },
      { name: "Haarlem", pct: 12 },
      { name: "Den Haag", pct: 12, aliases: ["s-gravenhage", "'s-gravenhage"] },
      { name: "Groningen", pct: 12 },
      { name: "Maastricht", pct: 10 },
      { name: "Zwolle", pct: 7 },
      { name: "Arnhem", pct: 6 },
      { name: "'s-Hertogenbosch", pct: 6, aliases: ["den bosch", "s-hertogenbosch", "s hertogenbosch"] },
      { name: "Leeuwarden", pct: 5 },
      { name: "Assen", pct: 3 },
      { name: "Middelburg", pct: 1.5 },
      { name: "Lelystad", pct: 0.5 },
    ],
  },
];

export function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9' -]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function findAnswer(q: Question, input: string): Answer | undefined {
  const n = normalize(input);
  if (!n) return undefined;
  return q.answers.find(
    (a) => normalize(a.name) === n || (a.aliases ?? []).some((al) => normalize(al) === n),
  );
}

/** Hoe zeldzamer, hoe meer punten: max 100, fout = 0. */
export function scoreFor(a: Answer | undefined): number {
  if (!a) return 0;
  return Math.max(1, Math.min(100, Math.round(100 - Math.log2(a.pct * 10 + 1) * 11)));
}
