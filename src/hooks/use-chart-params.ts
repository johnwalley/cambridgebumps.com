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
  const [params, setParams] = React.useState(() => new URLSearchParams());

  React.useEffect(() => {
    const read = () => setParams(new URLSearchParams(window.location.search));

    read();

    // Keep in sync with the back/forward buttons.
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const setParam = React.useCallback((name: string, value: string | null) => {
    const next = new URLSearchParams(window.location.search);

    if (value === null) {
      next.delete(name);
    } else {
      next.set(name, value);
    }

    const query = next.toString();

    window.history.pushState(
      {},
      "",
      query ? `${window.location.pathname}?${query}` : window.location.pathname,
    );

    setParams(next);
  }, []);

  return { params, setParam };
}

// Append the current query string to a link, so switching event/gender/year
// keeps the highlighted club and the blades/spoons toggles.
export function withParams(href: string, params: URLSearchParams): string {
  const query = params.toString();

  return query ? `${href}?${query}` : href;
}
