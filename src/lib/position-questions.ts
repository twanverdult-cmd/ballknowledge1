import data from "@/data/club-position-data.json";
import type { Question } from "./questions";

// Lists are ordered by fame (market value / Wikipedia editions), so rarity is estimated from rank:
// an editorial estimate, never measured answer frequency.
const pctForRank = (rank: number) => Math.max(0.05, Math.round(25 * 0.94 ** rank * 100) / 100);
const surname = (name: string) => name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z ]/g, "").trim().split(" ").slice(-1)[0] ?? "";
const TOP_WITH_SURNAME = 40;

const category = (prompt: string, names: string[]): Question => ({
  prompt,
  answers: names.map((name, rank) => ({ name, pct: pctForRank(rank), aliases: rank < TOP_WITH_SURNAME ? [surname(name)] : [] })),
});

const POSITIONS = {
  centreBack: "Name a centre-back",
  fullBack: "Name a full-back",
  defensiveMidfielder: "Name a defensive midfielder",
  centralMidfielder: "Name a central midfielder",
  attackingMidfielder: "Name an attacking midfielder",
  winger: "Name a winger",
  striker: "Name a striker",
} as const;

export const POSITION_QUESTIONS: Question[] = [
  ...(Object.keys(POSITIONS) as (keyof typeof POSITIONS)[]).map(key => category(POSITIONS[key], data.positions[key])),
  ...Object.entries(data.letters).map(([letter, names]) => category(`Name a player whose surname starts with ${letter}`, names)),
  ...data.pairs.map(pair => category(`Name a player who played for both ${pair.a} and ${pair.b}`, pair.players)),
];

/** Players per country ordered by fame (Transfermarkt value, then Wikipedia-only names). */
export const COUNTRY_NAMES = data.countries;
