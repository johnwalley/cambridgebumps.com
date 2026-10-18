import { useEffect, useRef, type KeyboardEvent } from "react";

export type YearPickerItem = {
  href: string;
  label: string;
};

type YearPickerProps = {
  /** One entry per year, oldest first. */
  items: YearPickerItem[];
  focusElement?: number;
  /** Where in the strip the selected year comes to rest. */
  position?: "start" | "center" | "end";
};

// The horizontal strip of years above (and beside) a bumps chart.
//
// This was built on Radix `Tabs`, which was the wrong primitive twice over: the
// entries are links to other pages rather than tabs over in-page panels (no
// `TabsContent` was ever rendered, so their `aria-controls` pointed at ids that
// didn't exist), and an event with ~200 years meant ~200 roving-focus
// collection items to register on every page swap. Plain anchors with a roving
// `tabIndex` give the same keyboard behaviour — Tab reaches the strip once,
// arrows move along it — for a fraction of the markup and hydration work.
export function YearPicker({
  items,
  focusElement = 0,
  position = "start",
}: YearPickerProps) {
  const navRef = useRef<HTMLElement>(null!);
  const ref = useRef<HTMLDivElement>(null!);
  const listRef = useRef<HTMLUListElement>(null!);
  const selectedRef = useRef<HTMLAnchorElement>(null!);

  // A year with no results yet — the current year, pre-generated before its
  // results are posted (see the chart page's `getStaticPaths`) — isn't in the
  // strip, so nothing is selected. Its nearest year is then the strip's last:
  // make that the Tab stop and scroll target, or the strip couldn't be reached
  // from the keyboard at all and would open at 1815.
  const tabStop = focusElement >= 0 ? focusElement : items.length - 1;

  // The chart pages persist their island across view transitions, so clicking a
  // year updates `focusElement` in place rather than tearing the strip down and
  // rebuilding it at `scrollLeft: 0`. The first pass still has to jump — the
  // selected year has never been on screen — but every later one can slide it
  // back into the middle.
  const firstScroll = useRef(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const strip = ref.current;
    const target = selectedRef.current;

    if (!target) return;

    const jump =
      firstScroll.current ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    firstScroll.current = false;

    // Scroll the strip itself rather than calling `scrollIntoView`, which
    // scrolls every scrollable ancestor too — the page included. Mid-transition
    // that matters: the view transition's overlay covers the scrollbar's
    // gutter, so for its duration the page is a scrollbar's width wider than
    // the window, and `scrollIntoView` slid the whole page left by that much
    // until the transition ended and it snapped back.
    const scroll = (behavior: ScrollBehavior) => {
      const offset =
        target.getBoundingClientRect().left -
        strip.getBoundingClientRect().left +
        strip.scrollLeft;
      const slack = strip.clientWidth - target.offsetWidth;

      const left =
        position === "center"
          ? offset - slack / 2
          : position === "end"
            ? offset - slack
            : offset;

      strip.scrollTo({ left, behavior });
    };

    if (jump) {
      scroll("instant");
      return;
    }

    // A smooth scroll asked for mid-swap is dropped on the floor: the view
    // transition suppresses rendering while it swaps the document, and the
    // pending scroll animation goes with it. A frame later it takes.
    const frame = requestAnimationFrame(() => scroll("smooth"));

    return () => cancelAnimationFrame(frame);
  }, [tabStop, position]);

  useEffect(() => {
    const nav = navRef.current;
    const e = ref.current;
    const [left, right] = nav.querySelectorAll("button");

    const f = () => {
      // The edge fades and scroll buttons are switched off at either end by
      // flagging the <nav> for CSS (see `.year-picker` in globals.css) rather
      // than by re-rendering: this component owns ~200 children, and a state
      // update on every scroll frame would reconcile all of them.
      const atStart = Math.abs(e.scrollLeft) < 1;
      const atEnd =
        Math.abs(e.scrollLeft - (e.scrollWidth - e.clientWidth)) < 1;

      nav.toggleAttribute("data-at-start", atStart);
      nav.toggleAttribute("data-at-end", atEnd);
      left.ariaDisabled = String(atStart);
      right.ariaDisabled = String(atEnd);

      lastScroll.current = e.scrollLeft;
    };

    // Surviving the swap keeps the strip's React state and its DOM, but not its
    // scroll offset: the router lifts the island out of the old document and
    // drops it into the new one, and a box that leaves the tree comes back at
    // zero. Put it back before the new page paints, or the slide to the chosen
    // year starts from year one every time.
    // `behavior: "instant"` matters: the box sets `scroll-behavior: smooth`, so
    // assigning `scrollLeft` would animate the restore itself.
    const restore = () => {
      e.scrollTo({ left: lastScroll.current, behavior: "instant" });
    };

    e.addEventListener("scroll", f);
    document.addEventListener("astro:after-swap", restore);

    f();

    return () => {
      e.removeEventListener("scroll", f);
      document.removeEventListener("astro:after-swap", restore);
    };
  }, []);

  // Arrow/Home/End move focus along the strip, as the tablist used to.
  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const { key } = event;

    if (
      key !== "ArrowLeft" &&
      key !== "ArrowRight" &&
      key !== "Home" &&
      key !== "End"
    ) {
      return;
    }

    const links = Array.from(
      listRef.current.querySelectorAll<HTMLAnchorElement>("a"),
    );
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);

    if (current === -1) return;

    const next =
      key === "Home"
        ? 0
        : key === "End"
          ? links.length - 1
          : current + (key === "ArrowRight" ? 1 : -1);

    const target = links[next];

    if (!target) return;

    event.preventDefault();
    target.focus();
  };

  // A click moves the strip on by most of its own width, so the next run of
  // years is all new apart from the one or two that were under the fade.
  const page = (direction: 1 | -1) => {
    const e = ref.current;

    e.scrollBy({ left: direction * e.clientWidth * 0.8 });
  };

  return (
    // Named so a screen reader announces "Year, navigation" rather than an
    // unlabelled run of ~200 links.
    <nav ref={navRef} aria-label="Year" className="year-picker">
      <ScrollButton direction="left" onClick={() => page(-1)} />
      <div
        ref={ref}
        className="year-picker-strip overflow-x-scroll scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {/* `role="list"` because Safari stops announcing a list once its
            bullets are styled away. */}
        <ul
          ref={listRef}
          role="list"
          onKeyDown={handleKeyDown}
          className="year-picker-list"
        >
          {items.map((item, i) => (
            <li key={item.href}>
              <a
                ref={i === tabStop ? selectedRef : null}
                href={item.href}
                className="year-tab"
                tabIndex={i === tabStop ? 0 : -1}
                aria-current={i === focusElement ? "page" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ScrollButton direction="right" onClick={() => page(1)} />
    </nav>
  );
}

const chevrons = {
  left: "M10.4 14.3 26.5 31h-6.4L5.5 16 20.1 1h6.4L10.4 17.7z",
  right: "M21.6 14.3 5.5 31h6.4l14.6-15L11.9 1H5.5l16.1 16.7z",
};

// The arrows sit beside the strip rather than over it, so they never cover a
// year and get a target of their own.
function ScrollButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Scroll ${direction}`}
      className={`year-picker-scroll year-picker-scroll-${direction}`}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 32 32"
        width="1em"
        height="1em"
        focusable="false"
        aria-hidden="true"
        className="fill-current"
      >
        <path d={chevrons[direction]} />
      </svg>
    </button>
  );
}
