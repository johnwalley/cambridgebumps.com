import type { City } from "@/lib/utils";

/**
 * A club with its own page under /clubs. Pages are built only for the clubs
 * listed here, so a new name in the results never gets a page by accident;
 * `src/lib/club-history.ts` fails the build if a name that qualifies for one
 * (raced in five or more years, or in the latest year) isn't covered.
 */
export type Club = {
  /** The page's URL segment: /clubs/<slug>. Changing it breaks links. */
  slug: string;
  /** Full name, for headings and page titles. */
  name: string;
  /** The name the results use, as shown in charts and tables. */
  short: string;
  city: City;
  /**
   * Earlier names in the results whose crews are this club's history: a
   * rename (New Hall), a merger (1st Trinity) or a club absorbed into it.
   */
  formerly?: string[];
  /**
   * Combined crews this club raced with another, under a joint name. They
   * appear on every partner's page.
   */
  joint?: string[];
};

// The lineage follows `clubMappingFull` in bumps-results-tools, which folds
// the early Trinity and St John's boat clubs into 1st and 3rd and LMBC. The
// statistics pages (`clubMapping` there) fold fewer names, so a club page can
// count more headships than the statistics table credits its current name.
export const clubs: Club[] = [
  // Cambridge colleges.
  {
    slug: "1st-and-3rd",
    name: "First and Third Trinity Boat Club",
    short: "1st and 3rd",
    city: "Cambridge",
    formerly: [
      "1st Trinity",
      "2nd Trinity",
      "3rd Trinity",
      "Trinity Eton",
      "Trinity King Edward",
      "Trinity Monarch",
      "Trinity Tobacco Pipes and Punch Bowls",
      "Trinity Westminster",
      "Trinty Nautilus",
    ],
  },
  {
    slug: "anglia-ruskin",
    name: "Anglia Ruskin University Boat Club",
    short: "Anglia Ruskin",
    city: "Cambridge",
    formerly: ["CCAT"],
  },
  {
    slug: "caius",
    name: "Gonville and Caius College Boat Club",
    short: "Caius",
    city: "Cambridge",
  },
  {
    slug: "christs",
    name: "Christ's College Boat Club",
    short: "Christ's",
    city: "Cambridge",
    joint: ["Magdalene and Christ's"],
  },
  {
    slug: "churchill",
    name: "Churchill College Boat Club",
    short: "Churchill",
    city: "Cambridge",
  },
  { slug: "clare", name: "Clare Boat Club", short: "Clare", city: "Cambridge" },
  {
    slug: "clare-hall",
    name: "Clare Hall Boat Club",
    short: "Clare Hall",
    city: "Cambridge",
  },
  {
    slug: "corpus-christi",
    name: "Corpus Christi College Boat Club",
    short: "Corpus Christi",
    city: "Cambridge",
    joint: ["Queens' and Corpus Christi"],
  },
  {
    slug: "darwin",
    name: "Darwin College Boat Club",
    short: "Darwin",
    city: "Cambridge",
  },
  {
    slug: "downing",
    name: "Downing College Boat Club",
    short: "Downing",
    city: "Cambridge",
  },
  {
    slug: "emmanuel",
    name: "Emmanuel Boat Club",
    short: "Emmanuel",
    city: "Cambridge",
  },
  {
    slug: "fitzwilliam",
    name: "Fitzwilliam College Boat Club",
    short: "Fitzwilliam",
    city: "Cambridge",
    formerly: ["Non-Collegiate"],
  },
  {
    slug: "girton",
    name: "Girton College Boat Club",
    short: "Girton",
    city: "Cambridge",
  },
  {
    slug: "homerton",
    name: "Homerton College Boat Club",
    short: "Homerton",
    city: "Cambridge",
  },
  {
    slug: "hughes-hall",
    name: "Hughes Hall Boat Club",
    short: "Hughes Hall",
    city: "Cambridge",
    joint: ["Hughes/Lucy"],
  },
  {
    slug: "jesus",
    name: "Jesus College Boat Club",
    short: "Jesus",
    city: "Cambridge",
  },
  {
    slug: "kings",
    name: "King's College Boat Club",
    short: "King's",
    city: "Cambridge",
    formerly: ["QMABC"],
  },
  {
    slug: "lmbc",
    name: "Lady Margaret Boat Club",
    short: "LMBC",
    city: "Cambridge",
    formerly: [
      "St. John's",
      "2nd St. John's",
      "3rd St. John's",
      "St. John's 'Tally-Ho'",
      "St. John's Argo",
      "St. John's Corsair",
    ],
  },
  {
    slug: "lucy-cavendish",
    name: "Lucy Cavendish College Boat Club",
    short: "Lucy Cavendish",
    city: "Cambridge",
    joint: ["Hughes/Lucy"],
  },
  {
    slug: "magdalene",
    name: "Magdalene Boat Club",
    short: "Magdalene",
    city: "Cambridge",
    joint: ["Magdalene and Christ's"],
  },
  {
    slug: "murray-edwards",
    name: "Murray Edwards College Boat Club",
    short: "Murray Edwards",
    city: "Cambridge",
    formerly: ["New Hall"],
  },
  {
    slug: "newnham",
    name: "Newnham College Boat Club",
    short: "Newnham",
    city: "Cambridge",
  },
  {
    slug: "pembroke",
    name: "Pembroke College Boat Club",
    short: "Pembroke",
    city: "Cambridge",
  },
  {
    slug: "peterhouse",
    name: "Peterhouse Boat Club",
    short: "Peterhouse",
    city: "Cambridge",
  },
  {
    slug: "queens",
    name: "Queens' College Boat Club",
    short: "Queens'",
    city: "Cambridge",
    joint: ["Queens' and Corpus Christi"],
  },
  {
    slug: "robinson",
    name: "Robinson College Boat Club",
    short: "Robinson",
    city: "Cambridge",
  },
  {
    slug: "selwyn",
    name: "Selwyn College Boat Club",
    short: "Selwyn",
    city: "Cambridge",
  },
  {
    slug: "sidney-sussex",
    name: "Sidney Sussex Boat Club",
    short: "Sidney Sussex",
    city: "Cambridge",
  },
  {
    slug: "st-catharines",
    name: "St Catharine's College Boat Club",
    short: "St Catharine's",
    city: "Cambridge",
  },
  {
    slug: "st-edmunds",
    name: "St Edmund's College Boat Club",
    short: "St Edmund's",
    city: "Cambridge",
  },
  {
    slug: "trinity-hall",
    name: "Trinity Hall Boat Club",
    short: "Trinity Hall",
    city: "Cambridge",
  },
  {
    slug: "wolfson",
    name: "Wolfson College Boat Club",
    short: "Wolfson",
    city: "Cambridge",
  },

  // Cambridge clubs that no longer race in the college bumps.
  {
    slug: "addenbrookes",
    name: "Addenbrooke's Boat Club",
    short: "Addenbrooke's",
    city: "Cambridge",
  },
  {
    slug: "ayerst-hall",
    name: "Ayerst Hall Boat Club",
    short: "Ayerst Hall",
    city: "Cambridge",
  },
  {
    slug: "cavendish",
    name: "Cavendish College Boat Club",
    short: "Cavendish",
    city: "Cambridge",
  },
  {
    slug: "cuwbc",
    name: "Cambridge University Women's Boat Club",
    short: "CUWBC",
    city: "Cambridge",
  },
  {
    slug: "lady-somerset",
    name: "Lady Somerset Boat Club",
    short: "Lady Somerset",
    city: "Cambridge",
  },
  {
    slug: "lse",
    name: "London School of Economics Boat Club",
    short: "London School of Economics",
    city: "Cambridge",
  },
  {
    slug: "queen-mary",
    name: "Queen Mary College Boat Club",
    short: "Queen Mary",
    city: "Cambridge",
  },
  {
    slug: "rob-nines",
    name: "Rob Nines",
    short: "Rob Nines",
    city: "Cambridge",
  },
  {
    slug: "raf",
    name: "Royal Air Force",
    short: "Royal Air Force",
    city: "Cambridge",
  },
  {
    slug: "st-bartholomews",
    name: "St Bartholomew's Hospital Boat Club",
    short: "St. Batholemew's",
    city: "Cambridge",
  },
  {
    slug: "theological-colleges",
    name: "Theological Colleges",
    short: "Theological Colleges",
    city: "Cambridge",
  },
  {
    slug: "university",
    name: "University",
    short: "University",
    city: "Cambridge",
  },
  {
    slug: "vet-school",
    name: "Veterinary School Boat Club",
    short: "Vet School",
    city: "Cambridge",
  },

  // Oxford colleges.
  {
    slug: "balliol",
    name: "Balliol College Boat Club",
    short: "Balliol",
    city: "Oxford",
  },
  {
    slug: "brasenose",
    name: "Brasenose College Boat Club",
    short: "Brasenose",
    city: "Oxford",
    joint: ["Brasenose/St Peter's"],
  },
  {
    slug: "christ-church",
    name: "Christ Church Boat Club",
    short: "Christ Church",
    city: "Oxford",
  },
  {
    slug: "corpus-christi",
    name: "Corpus Christi College Boat Club",
    short: "Corpus Christi",
    city: "Oxford",
    joint: ["Corpus & Magdalen", "Merton & Corpus"],
  },
  {
    slug: "exeter",
    name: "Exeter College Boat Club",
    short: "Exeter",
    city: "Oxford",
  },
  {
    slug: "green-templeton",
    name: "Green Templeton College Boat Club",
    short: "Green Templeton",
    city: "Oxford",
    formerly: ["Templeton"],
    joint: ["Osler-Green"],
  },
  {
    slug: "harris-manchester",
    name: "Harris Manchester College Boat Club",
    short: "Manchester",
    city: "Oxford",
  },
  {
    slug: "hertford",
    name: "Hertford College Boat Club",
    short: "Hertford",
    city: "Oxford",
    formerly: ["Magdalen Hall"],
  },
  {
    slug: "jesus",
    name: "Jesus College Boat Club",
    short: "Jesus",
    city: "Oxford",
  },
  {
    slug: "keble",
    name: "Keble College Boat Club",
    short: "Keble",
    city: "Oxford",
  },
  {
    slug: "lmh",
    name: "Lady Margaret Hall Boat Club",
    short: "L.M.H.",
    city: "Oxford",
  },
  {
    slug: "linacre",
    name: "Linacre College Boat Club",
    short: "Linacre",
    city: "Oxford",
  },
  {
    slug: "lincoln",
    name: "Lincoln College Boat Club",
    short: "Lincoln",
    city: "Oxford",
  },
  {
    slug: "magdalen",
    name: "Magdalen College Boat Club",
    short: "Magdalen",
    city: "Oxford",
    joint: ["Corpus & Magdalen"],
  },
  {
    slug: "mansfield",
    name: "Mansfield College Boat Club",
    short: "Mansfield",
    city: "Oxford",
  },
  {
    slug: "merton",
    name: "Merton College Boat Club",
    short: "Merton",
    city: "Oxford",
    joint: ["Merton & Corpus"],
  },
  {
    slug: "new-college",
    name: "New College Boat Club",
    short: "New College",
    city: "Oxford",
  },
  {
    slug: "oriel",
    name: "Oriel College Boat Club",
    short: "Oriel",
    city: "Oxford",
    formerly: ["St Mary Hall"],
  },
  {
    slug: "osler-house",
    name: "Osler House Boat Club",
    short: "Osler House",
    city: "Oxford",
    joint: ["Osler-Green"],
  },
  {
    slug: "pembroke",
    name: "Pembroke College Boat Club",
    short: "Pembroke",
    city: "Oxford",
  },
  {
    slug: "queens",
    name: "Queen's College Boat Club",
    short: "Queen's",
    city: "Oxford",
  },
  {
    slug: "regents-park",
    name: "Regent's Park College Boat Club",
    short: "Regent's Park",
    city: "Oxford",
  },
  {
    slug: "reuben",
    name: "Reuben College Boat Club",
    short: "Reuben",
    city: "Oxford",
  },
  {
    slug: "seh",
    name: "St Edmund Hall Boat Club",
    short: "S.E.H.",
    city: "Oxford",
  },
  {
    slug: "somerville",
    name: "Somerville College Boat Club",
    short: "Somerville",
    city: "Oxford",
  },
  {
    slug: "st-annes",
    name: "St Anne's College Boat Club",
    short: "St Anne's",
    city: "Oxford",
    joint: ["St Anne's/St Hilda's"],
  },
  {
    slug: "st-antonys",
    name: "St Antony's College Boat Club",
    short: "St Antony's",
    city: "Oxford",
  },
  {
    slug: "st-benets",
    name: "St Benet's Hall Boat Club",
    short: "St Benet's Hall",
    city: "Oxford",
  },
  {
    slug: "st-catherines",
    name: "St Catherine's College Boat Club",
    short: "St Catherine's",
    city: "Oxford",
  },
  {
    slug: "st-hildas",
    name: "St Hilda's College Boat Club",
    short: "St Hilda's",
    city: "Oxford",
    joint: ["St Anne's/St Hilda's"],
  },
  {
    slug: "st-hughs",
    name: "St Hugh's College Boat Club",
    short: "St Hugh's",
    city: "Oxford",
  },
  {
    slug: "st-johns",
    name: "St John's College Boat Club",
    short: "St John's",
    city: "Oxford",
  },
  {
    slug: "st-peters",
    name: "St Peter's College Boat Club",
    short: "St Peter's",
    city: "Oxford",
    joint: ["Brasenose/St Peter's"],
  },
  {
    slug: "trinity",
    name: "Trinity College Boat Club",
    short: "Trinity",
    city: "Oxford",
  },
  {
    slug: "university",
    name: "University College Boat Club",
    short: "University",
    city: "Oxford",
  },
  {
    slug: "wadham",
    name: "Wadham College Boat Club",
    short: "Wadham",
    city: "Oxford",
  },
  {
    slug: "wolfson",
    name: "Wolfson College Boat Club",
    short: "Wolfson",
    city: "Oxford",
  },
  {
    slug: "worcester",
    name: "Worcester College Boat Club",
    short: "Worcester",
    city: "Oxford",
  },
];
