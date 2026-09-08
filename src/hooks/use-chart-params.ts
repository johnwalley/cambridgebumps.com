import * as React from "react";

// The chart pages keep their view options — highlighted club, blades, spoons —
// in the query string so a chart can be linked to. Under Next.js these were
// read with `useSearchParams` and written with `router.push`; Astro ships plain
// static pages, so the island owns the query string directly via the History
// API. Updating a view option therefore no longer reloads the page.
//
// The first render (server render and hydration alike) sees an empty set of
// params, matching the static HTML; the real query string is read in an effect.
export function useChartParams() {
  // The raw query string, not a `URLSearchParams`: a fresh object is never
  // equal to the last one, so storing one would re-render the whole shell —
  // both year strips included — on mount even when the URL carries no params
  // at all, which is the common case. A string lets React bail out.
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    const read = () => setSearch(window.location.search);

    read();

    // Keep in sync with the back/forward buttons.
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const params = React.useMemo(() => new URLSearchParams(search), [search]);

  const setParam = React.useCallback((name: string, value: string | null) => {
    const next = new URLSearchParams(window.location.search);

    if (value === null) {
      next.delete(name);
    } else {
      next.set(name, value);
    }

    const query = next.toString();

    // Carry the router's own history state onto the new entry. `<ClientRouter />`
    // stores a scroll position and an index on every entry it creates and reads
    // them back on `popstate`; an entry pushed with a bare `{}` would leave it
    // restoring an undefined scroll position. Copying the current state keeps
    // the bookkeeping intact, at the cost of stepping back over a view option
    // being a page swap rather than an update in place.
    window.history.pushState(
      window.history.state,
      "",
      query ? `${window.location.pathname}?${query}` : window.location.pathname,
    );

    setSearch(query ? `?${query}` : "");
  }, []);

  return { params, setParam };
}

// Append the current query string to a link, so switching event/gender/year
// keeps the highlighted club and the blades/spoons toggles.
export function withParams(href: string, params: URLSearchParams): string {
  const query = params.toString();

  return query ? `${href}?${query}` : href;
}
