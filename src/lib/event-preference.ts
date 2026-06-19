import { isEvent, isGender, type Gender, type Set } from "@/lib/utils";

// Where the user's last-chosen event/gender is stored. The app is a static
// export (no server), so this preference lives entirely in the browser.
export const EVENT_PREFERENCE_KEY = "bumps:event-preference";

export type EventPreference = { event: Set; gender: Gender };

// Parse a raw stored value, validating both fields against the canonical
// event/gender lists. Anything missing, malformed, or no-longer-valid (e.g. an
// event that was removed from the data) yields null, falling back to defaults.
export function parseEventPreference(
  raw: string | null,
): EventPreference | null {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as { event?: unknown; gender?: unknown };
    const { event, gender } = parsed;

    if (
      typeof event === "string" &&
      typeof gender === "string" &&
      isEvent(event) &&
      isGender(gender)
    ) {
      return { event, gender };
    }

    return null;
  } catch {
    return null;
  }
}
// Persist the preference, but only when both values are valid event/gender
// slugs. Wrapped in try/catch because localStorage throws in private mode.
export function writeEventPreference(event: string, gender: string): void {
  if (typeof window === "undefined") return;
  if (!isEvent(event) || !isGender(gender)) return;

  try {
    window.localStorage.setItem(
      EVENT_PREFERENCE_KEY,
      JSON.stringify({ event, gender }),
    );
  } catch {
    // Ignore (private mode / storage full).
  }
}
