"use client";

import * as React from "react";

import {
  EVENT_PREFERENCE_KEY,
  parseEventPreference,
  type EventPreference,
} from "@/lib/event-preference";

// Subscribe to cross-tab changes so the preference stays in sync.
function subscribe(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

// Return the raw stored string (a stable primitive, so useSyncExternalStore
// won't loop). null on the server / when unset.
function getSnapshot(): string | null {
  try {
    return window.localStorage.getItem(EVENT_PREFERENCE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot(): string | null {
  return null;
}

// Returns the user's stored event/gender preference, or null if none.
//
// useSyncExternalStore reads null during server render and hydration, matching
// the static default href, then re-renders with the stored value on the client
// — no hydration mismatch, and no setState-in-effect.
export function useEventPreference(): EventPreference | null {
  const raw = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return React.useMemo(() => parseEventPreference(raw), [raw]);
}
