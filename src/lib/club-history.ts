import type { Event } from "react-bumps-chart";

import { clubs, eventsOf, unlisted, type Club } from "@/data/clubs";
import { results, summary } from "@/data/results";
import {
  events,
  genders,
  yearOf,
  type City,
  type Gender,
  type Set as EventKey,
} from "@/lib/utils";

// A name in the results qualifies for a page once it has raced in this many
// years, or in an event's latest year.
const MIN_YEARS = 5;

/** One crew's result in one race. Positions count from 1, the head. */
export type CrewResult = {
  /** As the results name the crew: "New Hall II". */
  name: string;
  /** As the results name its club: "New Hall". */
  club: string;
  number: number;
  /**
   * Identifies the crew from year to year. A rename carries it on (New Hall I
   * and Murray Edwards I share one); clubs that raced alongside each other
   * before merging (1st and 3rd Trinity) keep their own.
   */
  line: string;
  start: number;
  /** Null when the crew withdrew. */
  finish: number | null;
  gain: number | null;
  blades: boolean;
  spoons: boolean;
  /** Finished head of the river. */
  head: boolean;
};

export type ClubRace = {
  /** As the results give it: "2025", or "1827 February March" in a year with two races. */
  year: string;
  /** Crews in each division on the first day, head division first. */
  divisions: number[];
  /** The club's crews, in starting order. */
  crews: CrewResult[];
};

export type ClubSection = {
  event: EventKey;
  gender: Gender;
  /** Every year the event and category raced, whether or not the club did. */
  years: string[];
  /** The races the club took part in, oldest first. */
  races: ClubRace[];
};

export type ClubHistory = {
  club: Club;
  /** Sections the club raced in, in `eventsOf` order, men before women. */
  sections: ClubSection[];
};

/** A crew in a particular race, for the records. */
export type CrewYear = { year: string; crew: CrewResult };

export type SectionRecords = {
  firstYear: string;
  lastYear: string;
  headships: CrewYear[];
  blades: number;
  spoons: number;
  /** The best finish any crew achieved, and the races it came in. */
  highest: { position: number; races: CrewYear[] };
  /** The biggest gains and losses in a single year, biggest first. */
  rises: CrewYear[];
  falls: CrewYear[];
  /** The club's crews in the latest year, or none if it didn't race. */
  current: CrewResult[];
};

/** The results names a club's crews raced under. */
const namesOf = (club: Club) => [
  club.short,
  ...(club.formerly ?? []),
  ...(club.joint ?? []),
];

const raceCrewNames = (race: Event) =>
  new Set(race.crews.map((crew) => crew.club));

// A crew's position after each day, following its moves; null once it
// withdraws.
function dailyPositions(race: Event, start: number): (number | null)[] {
  const positions: (number | null)[] = [];
  let position: number | null = start;

  for (let day = 0; day < race.days; day++) {
    const move: number | null | undefined =
      position === null ? null : race.move[day]?.[position];
    position = move === null || move === undefined ? null : position! - move;
    positions.push(position);
  }

  return positions;
}

// Which crew finished head, by the statistics pages' rule: the best-placed
// 1st boat, in complete events that aren't flagged `skip_headship` (the
// early Mays, raced several times a year).
function headIndex(race: Event): number | undefined {
  if (!race.full_set || race.flags.includes("skip_headship")) return undefined;

  let best: { index: number; finish: number } | undefined;

  race.crews.forEach((crew, index) => {
    if (crew.number !== 1 || crew.gain === null) return;
    const finish = index - crew.gain;
    if (!best || finish < best.finish) best = { index, finish };
  });

  return best?.index;
}

// A former name is a rename, carrying the club's lines on, when no race has it
// alongside another of the club's own names.
function renamesOf(club: Club, events: EventKey[]): Set<string> {
  const own = [club.short, ...(club.formerly ?? [])];
  const renames = new Set(club.formerly ?? []);

  for (const event of events) {
    for (const gender of genders) {
      for (const race of results[event][gender]) {
        const names = raceCrewNames(race);
        const present = own.filter((name) => names.has(name));
        if (present.length > 1) present.forEach((name) => renames.delete(name));
      }
    }
  }

  return renames;
}

function getSection(
  club: Club,
  event: EventKey,
  gender: Gender,
  renames: Set<string>,
): ClubSection {
  const names = new Set(namesOf(club));
  const races: ClubRace[] = [];

  for (const race of results[event][gender]) {
    const head = headIndex(race);
    const crews: CrewResult[] = [];

    race.crews.forEach((crew, index) => {
      if (!names.has(crew.club)) return;

      const positions = dailyPositions(race, index);
      const finish = crew.gain === null ? null : index - crew.gain + 1;
      const lineClub = renames.has(crew.club) ? club.short : crew.club;

      crews.push({
        name: crew.num_name.trim(),
        club: crew.club,
        number: crew.number,
        line: `${lineClub} ${crew.number}`,
        start: index + 1,
        finish,
        gain: crew.gain,
        // Blades and spoons only mean something once every day has raced.
        blades: Boolean(race.full_set && crew.blades),
        spoons: Boolean(
          race.full_set &&
          positions.every(
            (position, day) =>
              position !== null &&
              position > (day === 0 ? index : positions[day - 1]!),
          ),
        ),
        head: index === head,
      });
    });

    if (crews.length > 0) {
      races.push({
        year: String(race.year),
        divisions: race.div_size[0],
        crews,
      });
    }
  }

  return { event, gender, years: summary[event][gender], races };
}

const histories = new Map<Club, ClubHistory>();

export function getClubHistory(club: Club): ClubHistory {
  let history = histories.get(club);

  if (!history) {
    const events = eventsOf(club);
    const renames = renamesOf(club, events);

    history = {
      club,
      sections: events
        .flatMap((event) =>
          genders.map((gender) => getSection(club, event, gender, renames)),
        )
        .filter((section) => section.races.length > 0),
    };
    histories.set(club, history);
  }

  return history;
}

/** The latest of a section's years: the event's, not necessarily the club's. */
export const latestYear = (section: ClubSection) =>
  section.years[section.years.length - 1];

const byYearDesc = (a: CrewYear, b: CrewYear) =>
  yearOf(b.year) - yearOf(a.year);

export function getSectionRecords(section: ClubSection): SectionRecords {
  const all: CrewYear[] = section.races.flatMap((race) =>
    race.crews.map((crew) => ({ year: race.year, crew })),
  );
  const finished = all.filter(({ crew }) => crew.finish !== null);
  const position = Math.min(...finished.map(({ crew }) => crew.finish!));

  // Ties go to the most recent year.
  const moves = finished.filter(({ crew }) => crew.gain !== 0).sort(byYearDesc);
  const rises = moves
    .filter(({ crew }) => crew.gain! > 0)
    .sort((a, b) => b.crew.gain! - a.crew.gain!)
    .slice(0, 3);
  const falls = moves
    .filter(({ crew }) => crew.gain! < 0)
    .sort((a, b) => a.crew.gain! - b.crew.gain!)
    .slice(0, 3);

  const latest = latestYear(section);
  const current = section.races
    .filter((race) => yearOf(race.year) === yearOf(latest))
    .flatMap((race) => race.crews);

  return {
    firstYear: section.races[0].year,
    lastYear: section.races[section.races.length - 1].year,
    headships: all.filter(({ crew }) => crew.head).sort(byYearDesc),
    blades: all.filter(({ crew }) => crew.blades).length,
    spoons: all.filter(({ crew }) => crew.spoons).length,
    highest: {
      position,
      races: finished
        .filter(({ crew }) => crew.finish === position)
        .sort(byYearDesc),
    },
    rises,
    falls,
    current,
  };
}

/**
 * Whether a club still races: in any of the last three years one of its
 * events ran, so missing a year or two doesn't retire it.
 */
export const isCurrent = (history: ClubHistory) =>
  history.sections.some((section) => {
    const recent = [...new Set(section.years.map(yearOf))].slice(-3);
    const last = yearOf(section.races[section.races.length - 1].year);
    return last >= recent[0];
  });

export const clubsIn = (city: City) =>
  clubs.filter((club) => club.city === city);

export function getClub(city: City, slug: string): Club | undefined {
  return clubsIn(city).find((club) => club.slug === slug);
}

// Fails the build when the curated club list and the results disagree: a name
// that qualifies for a page but has no club (and isn't `unlisted`), or a
// listed name that never raced (a typo). A name can be only one club's own in
// an event; only joint crews belong to more than one.
function checkClubs() {
  const problems: string[] = [];
  const raced = new Map<EventKey, Map<string, Set<number>>>();

  for (const event of events) {
    const years = new Map<string, Set<number>>();
    const current = new Set<string>();

    for (const gender of genders) {
      const latest = yearOf(summary[event][gender].at(-1)!);

      for (const race of results[event][gender]) {
        for (const name of raceCrewNames(race)) {
          if (!name) continue;
          const yearsRaced = years.get(name) ?? new Set<number>();
          yearsRaced.add(yearOf(race.year));
          years.set(name, yearsRaced);
          if (yearOf(race.year) === latest) current.add(name);
        }
      }
    }

    raced.set(event, years);

    const owners = new Map<string, Club[]>();
    for (const club of clubs.filter((club) => eventsOf(club).includes(event))) {
      for (const name of namesOf(club)) {
        owners.set(name, [...(owners.get(name) ?? []), club]);
      }
    }

    for (const [name, clubsOwning] of owners) {
      const own = clubsOwning.filter((club) => !club.joint?.includes(name));
      if (own.length > 1) {
        problems.push(
          `${event}: "${name}" belongs to ${own.map((club) => club.slug).join(" and ")}`,
        );
      }
    }

    for (const [name, yearsRaced] of years) {
      const qualifies = yearsRaced.size >= MIN_YEARS || current.has(name);
      if (qualifies && !owners.has(name) && !unlisted[event]?.includes(name)) {
        problems.push(
          `${event}: "${name}" raced in ${yearsRaced.size} years but has no club`,
        );
      }
    }

    for (const name of unlisted[event] ?? []) {
      if (!years.has(name)) {
        problems.push(`${event}: unlisted "${name}" never raced`);
      }
    }
  }

  for (const club of clubs) {
    for (const name of namesOf(club)) {
      if (!eventsOf(club).some((event) => raced.get(event)?.has(name))) {
        problems.push(
          `${club.slug}: "${name}" never raced in ${eventsOf(club).join("/")}`,
        );
      }
    }
  }

  for (const city of ["Cambridge", "Oxford"] as City[]) {
    const slugs = clubsIn(city).map((club) => club.slug);
    for (const slug of new Set(slugs)) {
      if (slugs.indexOf(slug) !== slugs.lastIndexOf(slug)) {
        problems.push(`${city}: two clubs share the slug "${slug}"`);
      }
    }
  }

  if (problems.length > 0) {
    throw new Error(
      `src/data/clubs.ts disagrees with the results:\n  ${problems.join("\n  ")}`,
    );
  }
}

checkClubs();
