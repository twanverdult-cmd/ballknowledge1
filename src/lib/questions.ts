import archive from "@/data/player-archive.json";
import { EXTRA_QUESTIONS } from "./extra-questions";
import { COUNTRY_NAMES, POSITION_QUESTIONS } from "./position-questions";

// "pct" is an editorial estimate, never measured player answer frequency.
export type Answer = { name: string; pct: number; aliases?: string[] };
export type Question = { prompt: string; answers: Answer[] };

export const ROUNDS = 7;
export const MAX_POINTS = 100;

const a = (name: string, pct: number, ...aliases: string[]): Answer => ({ name, pct, aliases });

const CURATED_QUESTIONS: Question[] = [
  {
    prompt: "Name a French footballer",
    answers: [
      a("Kylian Mbappé", 35, "mbappe", "kylian mbappe"), a("Zinedine Zidane", 15, "zidane"),
      a("Thierry Henry", 10, "henry"), a("Antoine Griezmann", 9, "griezmann"),
      a("Karim Benzema", 7, "benzema"), a("Paul Pogba", 5, "pogba"), a("N'Golo Kanté", 4, "kante", "ngolo kante"),
      a("Michel Platini", 3, "platini"), a("Franck Ribéry", 3, "ribery"), a("Olivier Giroud", 3, "giroud"),
      a("Hugo Lloris", 1.5, "lloris"), a("Ousmane Dembélé", 1.5, "dembele"), a("Patrick Vieira", 1, "vieira"),
      a("Raphaël Varane", 1, "varane"), a("Aurélien Tchouaméni", 0.5, "tchouameni"),
      a("Robert Pirès", 0.4, "pires"), a("Youri Djorkaeff", 0.3, "djorkaeff"), a("Just Fontaine", 0.1, "fontaine"),
      a("Lilian Thuram", 0.4, "thuram"), a("Marcel Desailly", 0.3, "desailly"), a("Raymond Kopa", 0.05, "kopa"),
      a("Mathieu Valbuena", 0.1, "valbuena"), a("Laurent Blanc", 0.3, "blanc"),
    ],
  },
  {
    prompt: "Name a player who played for FC Barcelona",
    answers: [
      a("Lionel Messi", 45, "messi"), a("Johan Cruijff", 8, "cruijff", "cruyff"), a("Ronaldinho", 7),
      a("Neymar", 6), a("Xavi", 5, "xavi hernandez"), a("Andrés Iniesta", 5, "iniesta"),
      a("Frenkie de Jong", 5, "de jong"), a("Robert Lewandowski", 4, "lewandowski"), a("Lamine Yamal", 4, "yamal"),
      a("Luis Suárez", 3, "suarez"), a("Gerard Piqué", 2, "pique"), a("Carles Puyol", 1.5, "puyol"),
      a("Patrick Kluivert", 1, "kluivert"), a("Samuel Eto'o", 1, "eto'o", "etoo"), a("Ronald Koeman", 1, "koeman"),
      a("Pedri", 1), a("Sergio Busquets", 0.8, "busquets"), a("Marc Overmars", 0.3, "overmars"),
      a("Hristo Stoichkov", 0.3, "stoichkov"), a("Phillip Cocu", 0.3, "cocu"), a("Giovanni van Bronckhorst", 0.2, "van bronckhorst"),
      a("Ibrahim Afellay", 0.1, "afellay"), a("Alexander Hleb", 0.05, "hleb"), a("Thomas Vermaelen", 0.1, "vermaelen"),
      a("Michael Reiziger", 0.1, "reiziger"), a("Winston Bogarde", 0.1, "bogarde"),
    ],
  },
  {
    prompt: "Name a Netherlands international",
    answers: [
      a("Virgil van Dijk", 25, "van dijk"), a("Memphis Depay", 12, "memphis", "depay"), a("Frenkie de Jong", 10, "de jong"),
      a("Arjen Robben", 8, "robben"), a("Robin van Persie", 7, "van persie"), a("Johan Cruijff", 6, "cruijff", "cruyff"),
      a("Wesley Sneijder", 5, "sneijder"), a("Cody Gakpo", 5, "gakpo"), a("Ruud Gullit", 3, "gullit"),
      a("Marco van Basten", 3, "van basten"), a("Dennis Bergkamp", 3, "bergkamp"), a("Edwin van der Sar", 2, "van der sar"),
      a("Xavi Simons", 3, "simons"), a("Denzel Dumfries", 2, "dumfries"), a("Clarence Seedorf", 1.5, "seedorf"),
      a("Dirk Kuyt", 1.5, "kuyt"), a("Nigel de Jong", 1, "nigel de jong"), a("Faas Wilkes", 0.05, "wilkes"),
      a("Abe Lenstra", 0.05, "lenstra"), a("Willem van Hanegem", 0.3, "van hanegem"), a("Rob Rensenbrink", 0.2, "rensenbrink"),
      a("Jerry de Jong", 0.02), a("Ulrich van Gobbel", 0.05, "van gobbel"), a("Gerald Vanenburg", 0.1, "vanenburg"),
    ],
  },
  {
    prompt: "Name a player who played for Real Madrid",
    answers: [
      a("Cristiano Ronaldo", 40, "ronaldo", "cr7"), a("Vinícius Júnior", 8, "vinicius", "vini jr"), a("Jude Bellingham", 7, "bellingham"),
      a("Zinedine Zidane", 6, "zidane"), a("Luka Modrić", 6, "modric"), a("Kylian Mbappé", 6, "mbappe"),
      a("Sergio Ramos", 5, "ramos"), a("Karim Benzema", 4, "benzema"), a("Gareth Bale", 3, "bale"),
      a("David Beckham", 2, "beckham"), a("Raúl", 2, "raul"), a("Iker Casillas", 2, "casillas"),
      a("Arjen Robben", 1, "robben"), a("Ruud van Nistelrooij", 1, "van nistelrooy", "van nistelrooij"),
      a("Alfredo Di Stéfano", 0.5, "di stefano"), a("Ferenc Puskás", 0.5, "puskas"), a("Rafael van der Vaart", 0.5, "van der vaart"),
      a("Royston Drenthe", 0.2, "drenthe"), a("Klaas-Jan Huntelaar", 0.3, "huntelaar"), a("Clarence Seedorf", 0.3, "seedorf"),
      a("Míchel Salgado", 0.1, "salgado"), a("Emilio Butragueño", 0.1, "butragueno"), a("Julien Faubert", 0.02, "faubert"),
    ],
  },
  {
    prompt: "Name a Brazilian footballer",
    answers: [
      a("Neymar", 30), a("Pelé", 18, "pele"), a("Ronaldinho", 12), a("Ronaldo", 10, "ronaldo nazario"),
      a("Kaká", 5, "kaka"), a("Vinícius Júnior", 6, "vinicius"), a("Roberto Carlos", 4), a("Romário", 2, "romario"),
      a("Rivaldo", 2), a("Casemiro", 2), a("Dani Alves", 1.5, "alves"), a("Marcelo", 1.5), a("Alisson", 1, "alisson becker"),
      a("Thiago Silva", 1), a("Zico", 1), a("Garrincha", 0.5), a("Sócrates", 0.4, "socrates"), a("Cafu", 1),
      a("Bebeto", 0.3), a("Jardel", 0.1), a("Jairzinho", 0.1), a("Juninho Pernambucano", 0.1, "juninho"),
      a("Alex", 0.05), a("Afonsinho", 0.02),
    ],
  },
  {
    prompt: "Name a player who played for Ajax",
    answers: [
      a("Johan Cruijff", 20, "cruijff", "cruyff"), a("Dennis Bergkamp", 7, "bergkamp"), a("Marco van Basten", 7, "van basten"),
      a("Luis Suárez", 6, "suarez"), a("Zlatan Ibrahimović", 6, "zlatan", "ibrahimovic"), a("Frenkie de Jong", 6, "de jong"),
      a("Matthijs de Ligt", 5, "de ligt"), a("Wesley Sneijder", 4, "sneijder"), a("Edwin van der Sar", 4, "van der sar"),
      a("Dušan Tadić", 4, "tadic"), a("Patrick Kluivert", 3, "kluivert"), a("Jari Litmanen", 2, "litmanen"),
      a("Christian Eriksen", 2, "eriksen"), a("Hakim Ziyech", 2, "ziyech"), a("Frank Rijkaard", 2, "rijkaard"),
      a("Danny Blind", 1, "blind"), a("Daley Blind", 1, "daley blind"), a("Sjaak Swart", 0.3, "swart"),
      a("Piet Keizer", 0.3, "keizer"), a("Tscheu La Ling", 0.1, "la ling"), a("Mido", 0.1),
      a("Wamberto", 0.05), a("Rasmus Lindgren", 0.03, "lindgren"), a("Dmitri Shoukov", 0.02, "shoukov"),
    ],
  },
  {
    prompt: "Name a goalkeeper",
    answers: [
      a("Manuel Neuer", 18, "neuer"), a("Edwin van der Sar", 12, "van der sar"), a("Gianluigi Buffon", 10, "buffon"),
      a("Iker Casillas", 8, "casillas"), a("Thibaut Courtois", 8, "courtois"), a("Alisson", 5, "alisson becker"),
      a("Ederson", 3), a("Bart Verbruggen", 3, "verbruggen"), a("Jasper Cillessen", 3, "cillessen"),
      a("Oliver Kahn", 3, "kahn"), a("Peter Schmeichel", 2, "schmeichel"), a("Lev Jasjin", 0.5, "yashin", "jasjin"),
      a("Hans van Breukelen", 1, "van breukelen"), a("Marc-André ter Stegen", 2, "ter stegen"), a("Emiliano Martínez", 1.5, "martinez"),
      a("Petr Čech", 2, "cech"), a("Tim Krul", 1, "krul"), a("Remko Pasveer", 0.5, "pasveer"),
      a("René Higuita", 0.3, "higuita"), a("Jan Jongbloed", 0.1, "jongbloed"), a("Sander Westerveld", 0.1, "westerveld"),
      a("Ronald Waterreus", 0.05, "waterreus"), a("Jorge Campos", 0.1, "campos"),
    ],
  },
  {
    prompt: "Name a German footballer",
    answers: [
      a("Thomas Müller", 15, "muller", "muller"), a("Manuel Neuer", 12, "neuer"), a("Franz Beckenbauer", 10, "beckenbauer"),
      a("Toni Kroos", 9, "kroos"), a("Jamal Musiala", 6, "musiala"), a("Miroslav Klose", 6, "klose"),
      a("Gerd Müller", 4, "gerd muller"), a("Bastian Schweinsteiger", 4, "schweinsteiger"), a("Mesut Özil", 4, "ozil"),
      a("Michael Ballack", 3, "ballack"), a("Lothar Matthäus", 3, "matthaus"), a("Jürgen Klinsmann", 2, "klinsmann"),
      a("Florian Wirtz", 3, "wirtz"), a("Philipp Lahm", 2, "lahm"), a("Kai Havertz", 2, "havertz"),
      a("Rudi Völler", 1, "voller"), a("Oliver Bierhoff", 0.5, "bierhoff"), a("Uwe Seeler", 0.2, "seeler"),
      a("Helmut Rahn", 0.05, "rahn"), a("Pierre Littbarski", 0.1, "littbarski"), a("Mario Basler", 0.1, "basler"),
      a("Andreas Brehme", 0.3, "brehme"), a("Kevin Kurányi", 0.1, "kuranyi"),
    ],
  },
  {
    prompt: "Name a player who played for Liverpool",
    answers: [
      a("Mohamed Salah", 30, "salah"), a("Virgil van Dijk", 15, "van dijk"), a("Steven Gerrard", 12, "gerrard"),
      a("Cody Gakpo", 5, "gakpo"), a("Sadio Mané", 4, "mane"), a("Luis Suárez", 4, "suarez"), a("Fernando Torres", 3, "torres"),
      a("Kenny Dalglish", 2, "dalglish"), a("Jamie Carragher", 2, "carragher"), a("Trent Alexander-Arnold", 3, "alexander-arnold", "trent"),
      a("Ryan Gravenberch", 2, "gravenberch"), a("Michael Owen", 2, "owen"), a("Ian Rush", 1, "rush"),
      a("Alisson", 2, "alisson becker"), a("Dirk Kuyt", 2, "kuyt"), a("Georginio Wijnaldum", 1.5, "wijnaldum"),
      a("Robbie Fowler", 1, "fowler"), a("Ryan Babel", 0.5, "babel"), a("Sander Westerveld", 0.2, "westerveld"),
      a("Boudewijn Zenden", 0.2, "zenden"), a("Andy Carroll", 0.3, "carroll"), a("Iago Aspas", 0.05, "aspas"),
      a("Djimi Traoré", 0.05, "traore"), a("Erik Meijer", 0.05, "meijer"),
    ],
  },
];

type ArchiveKey = Exclude<keyof typeof archive, "sourceNote">;
const ARCHIVE_KEYS = ["france", "barcelona", "netherlands", "madrid", "brazil", "ajax", "goalkeepers", "germany", "liverpool"] as const;
const RARITY_OVERRIDES: Record<string, number> = {
  "Ronaldo": 10, "Kaká": 5, "Roberto Carlos": 4, "Rivaldo": 2, "Dani Alves": 1.5,
  "Gavi": 4, "Raphinha": 5, "Dani Olmo": 3, "Ferran Torres": 2, "Jules Koundé": 2,
  "Zlatan Ibrahimović": 6, "Diego Maradona": 15, "Romário": 2, "Ronaldo Nazário": 10,
  "Toni Kroos": 9, "Thibaut Courtois": 8, "Rodrygo": 4, "Federico Valverde": 4,
  "Endrick": 3, "Éder Militão": 2, "David Alaba": 2, "Pepe": 3,
  "Alexander Isak": 4, "Florian Wirtz": 3, "Hugo Ekitiké": 3, "Darwin Núñez": 3,
  "Diogo Jota": 3, "Roberto Firmino": 3, "Andy Robertson": 3, "Andrew Robertson": 3,
  "Désiré Doué": 3, "Bradley Barcola": 2, "Michael Olise": 3, "Warren Zaïre-Emery": 2,
  "Gabriel Jesus": 3, "Gabriel Martinelli": 3, "Bruno Guimarães": 2, "Antony": 3,
  "Joshua Kimmich": 4, "Leroy Sané": 3, "Serge Gnabry": 3, "Marc-André ter Stegen": 2,
  "David de Gea": 4, "Jan Oblak": 3, "Gianluigi Donnarumma": 5, "Wojciech Szczęsny": 2,
};
const EXTRA_ALIASES: Record<string, string[]> = {
  "Johan Cruijff": ["johan cruyff"], "Ruud van Nistelrooij": ["ruud van nistelrooy"],
  "Lev Jasjin": ["lev yashin"], "Alisson": ["alisson becker"], "Ronaldo": ["ronaldo nazario", "ronaldo luiz nazario de lima"],
  "Vinícius Júnior": ["vini", "vini jr", "vinicius junior"], "N'Golo Kanté": ["ngolo kante"],
  "Trent Alexander-Arnold": ["trent"], "Mohamed Salah": ["mo salah"],
};

export function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘']/g, "")
    .replace(/[-‐‑–]/g, " ")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Extra categories list their stars by full name only; with thousands of archive names a bare surname
// is rarely unique, so the curated stars also accept their own surname.
const EXTRA_ARCHIVE: Record<string, ArchiveKey> = {
  "Name an Argentine footballer": "argentina", "Name a Portuguese footballer": "portugal",
  "Name a Spanish footballer": "spain", "Name an Italian footballer": "italy",
  "Name an English footballer": "england", "Name a Belgian footballer": "belgium",
  "Name a Croatian footballer": "croatia",
};
const surnameAlias = (name: string) => normalize(name).split(" ").slice(-1)[0] ?? "";

function mergeArchive(question: Question, key: ArchiveKey, withSurnames = false): Question {
  const answers = question.answers.map(answer => ({
    ...answer,
    aliases: [...(answer.aliases ?? []), ...(EXTRA_ALIASES[answer.name] ?? []), ...(withSurnames && !answer.aliases?.length ? [surnameAlias(answer.name)] : [])],
  }));
  const knownNames = new Set(answers.flatMap(answer => [answer.name, ...answer.aliases].map(normalize)));
  const overrides = new Map(Object.entries(RARITY_OVERRIDES).map(([name, pct]) => [normalize(name), { name, pct }]));
  for (const name of archive[key]) {
    const normalized = normalize(name);
    if (knownNames.has(normalized)) continue;
    const override = overrides.get(normalized);
    const canonicalName = override?.name ?? name;
    answers.push({ name: canonicalName, pct: override?.pct ?? 0.2, aliases: EXTRA_ALIASES[canonicalName] ?? [] });
    knownNames.add(normalized);
  }
  // Correct a previously accepted player who never made an Ajax first-team appearance.
  return { ...question, answers: key === "ajax" ? answers.filter(answer => answer.name !== "Dmitri Shoukov") : answers };
}

/** Adds fame-ordered names: the best known get a small share, the long tail the minimum. */
function withRankedNames(question: Question, names: string[]): Question {
  const known = new Set(question.answers.flatMap(answer => [answer.name, ...(answer.aliases ?? [])].map(normalize)));
  const answers = [...question.answers];
  let rank = 0;
  for (const name of names) {
    const key = normalize(name);
    if (known.has(key)) continue;
    known.add(key);
    const surname = key.split(" ").slice(-1)[0] ?? "";
    answers.push({ name, pct: Math.max(0.05, Math.round(1.5 * 0.985 ** rank * 100) / 100), aliases: rank < 40 && surname ? [surname] : [] });
    rank++;
  }
  return { ...question, answers };
}

const BASE_QUESTIONS = [...CURATED_QUESTIONS.map((question, index) => {
  const key = ARCHIVE_KEYS[index];
  return key ? mergeArchive(question, key) : question;
}), ...EXTRA_QUESTIONS.map(question => {
  const key = EXTRA_ARCHIVE[question.prompt];
  return key ? mergeArchive(question, key, true) : question;
})];
const NETHERLANDS = BASE_QUESTIONS.find(question => question.prompt === "Name a Netherlands international");

export const QUESTIONS = [
  ...BASE_QUESTIONS.map(question => question.prompt === "Name a Belgian footballer" ? withRankedNames(question, COUNTRY_NAMES.belgium) : question),
  // All Dutch pros, not only internationals: the curated international list supplies the well-known rarities.
  ...(NETHERLANDS ? [withRankedNames({ ...NETHERLANDS, prompt: "Name a Dutch footballer" }, COUNTRY_NAMES.dutch)] : []),
  ...POSITION_QUESTIONS,
];

export function findAnswer(q: Question, input: string): Answer | undefined {
  const n = normalize(input);
  if (!n) return undefined;
  const exact = q.answers.find(x => normalize(x.name) === n);
  if (exact) return exact;
  const explicit = q.answers.filter(x => (x.aliases ?? []).some(alias => normalize(alias) === n));
  if (explicit.length === 1) return explicit[0];
  if (explicit.length > 1) return undefined;
  // Accept a surname only when it identifies one player in this category.
  const surname = q.answers.filter(x => {
    const name = normalize(x.name);
    return name.endsWith(` ${n}`);
  });
  return surname.length === 1 ? surname[0] : undefined;
}

/** Answers at each end of the scale: the 5 most common score 1, the 5 least common score 100. */
export const EDGE_ANSWERS = 5;
const scoreCache = new WeakMap<Answer, number>();

/** Rank-based 1–100 within a question, sliding smoothly through every value in between; wrong = 0. */
export function scoreFor(x: Answer | undefined): number {
  if (!x) return 0;
  const cached = scoreCache.get(x);
  if (cached !== undefined) return cached;
  const q = QUESTIONS.find(question => question.answers.includes(x));
  if (!q) return 1;
  const sorted = [...q.answers].sort((a, b) => b.pct - a.pct || a.name.localeCompare(b.name));
  const first = EDGE_ANSWERS - 1, last = sorted.length - EDGE_ANSWERS;
  sorted.forEach((answer, i) => {
    const points = i <= first ? 1 : i >= last ? MAX_POINTS : Math.round(1 + (99 * (i - first)) / Math.max(1, last - first));
    scoreCache.set(answer, Math.min(MAX_POINTS, Math.max(1, points)));
  });
  return scoreCache.get(x) ?? 1;
}

/** Rarity categories from most common to rarest; the thresholds match the kicker tiers below. */
export const RARITY_TIERS = ["HOUSEHOLD NAME", "MATCHDAY REGULAR", "SCOUT'S PICK", "HIDDEN GEM", "ONE IN A MILLION"] as const;
export const MISS_LABEL = "OFFSIDE";

export function rarityLabel(points: number): string {
  return points <= 0 ? MISS_LABEL : RARITY_TIERS[kickerFor(points, 0).tier] ?? MISS_LABEL;
}

export type Kicker = { name: string; tier: 0 | 1 | 2 | 3 | 4 };

/** Wie de trap neemt hangt af van de punten. */
export function kickerFor(points: number, legendPick = Math.random()): Kicker {
  if (points < 30) return { name: "Sunday league substitute", tier: 0 };
  if (points < 55) return { name: "Second division striker", tier: 1 };
  if (points < 75) return { name: "Top-flight regular", tier: 2 };
  if (points < 90) return { name: "Champions League star", tier: 3 };
  return { name: legendPick < 0.5 ? "Lionel Messi" : "Cristiano Ronaldo", tier: 4 };
}
