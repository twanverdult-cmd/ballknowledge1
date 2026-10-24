// "pct" = geschat percentage spelers dat dit antwoord zou geven (verzonnen schattingen).
export type Answer = { name: string; pct: number; aliases?: string[] };
export type Question = { prompt: string; answers: Answer[] };

export const ROUNDS = 7;
export const MAX_POINTS = 100;

const a = (name: string, pct: number, ...aliases: string[]): Answer => ({ name, pct, aliases });

export const QUESTIONS: Question[] = [
  {
    prompt: "Noem een Franse voetballer",
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
    prompt: "Noem een speler (ooit) van FC Barcelona",
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
    prompt: "Noem een Nederlandse international",
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
    prompt: "Noem een speler (ooit) van Real Madrid",
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
    prompt: "Noem een Braziliaanse voetballer",
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
    prompt: "Noem een speler (ooit) van Ajax",
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
    prompt: "Noem een keeper",
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
    prompt: "Noem een Duitse voetballer",
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
    prompt: "Noem een speler (ooit) van Liverpool",
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
    (x) => normalize(x.name) === n || (x.aliases ?? []).some((al) => normalize(al) === n),
  );
}

/** Hoe zeldzamer, hoe meer punten: max 100, fout = 0. */
export function scoreFor(x: Answer | undefined): number {
  if (!x) return 0;
  return Math.max(1, Math.min(MAX_POINTS, Math.round(100 - Math.log2(x.pct * 10 + 1) * 11)));
}

export type Kicker = { name: string; tier: 0 | 1 | 2 | 3 | 4 };

/** Wie de trap neemt hangt af van de punten. */
export function kickerFor(points: number, legendPick = Math.random()): Kicker {
  if (points <= 0) return { name: "Ome Henk (zondag 7e elftal)", tier: 0 };
  if (points < 30) return { name: "Ome Henk (zondag 7e elftal)", tier: 0 };
  if (points < 55) return { name: "Een Keuken Kampioen-spits", tier: 1 };
  if (points < 75) return { name: "Een Eredivisie-topper", tier: 2 };
  if (points < 90) return { name: "Een Champions League-ster", tier: 3 };
  return { name: legendPick < 0.5 ? "Lionel Messi" : "Cristiano Ronaldo", tier: 4 };
}
