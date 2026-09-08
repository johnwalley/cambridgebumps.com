import { useEffect, useRef, type KeyboardEvent } from "react";

export type YearPickerItem = {
  href: string;
  label: string;
};

type YearPickerProps = {
  /** One entry per year, oldest first. */
  items: YearPickerItem[];
  skipLength: number;
  focusElement?: number;
  position?: ScrollLogicalPosition;
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
  skipLength,
  focusElement = 0,
  position = "start",
}: YearPickerProps) {
  const ref = useRef<HTMLDivElement>(null!);
  const listRef = useRef<HTMLDivElement>(null!);
  const selectedRef = useRef<HTMLAnchorElement>(null!);

  const leftRef = useRef<HTMLDivElement>(null!);
  const rightRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    selectedRef.current?.scrollIntoView?.({
      inline: position,
      block: "nearest",
      behavior: "instant",
    });
  }, [position]);

  useEffect(() => {
    const e = ref.current;

    const f = () => {
      // The gradient fades and their scroll buttons are toggled by hiding the
      // DOM rather than by re-rendering: this component owns ~200 children, and
      // a state update on every scroll frame would reconcile all of them.
      leftRef.current.hidden = Math.abs(e.scrollLeft) < 1;
      rightRef.current.hidden =
        Math.abs(e.scrollLeft - (e.scrollWidth - e.clientWidth)) < 1;
    };

    e.addEventListener("scroll", f);

    f();

    return () => {
      e.removeEventListener("scroll", f);
    };
  }, []);

  // Arrow/Home/End move focus along the strip, as the tablist used to.
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
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

  return (
    <section className="relative px-0">
      <div className="m-0 border-0 p-0">
        <div className="relative">
          <div
            ref={ref}
            className="overflow-x-scroll scroll-smooth"
            style={{ scrollbarWidth: "none" }}
          >
            <div
              ref={listRef}
              onKeyDown={handleKeyDown}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground"
            >
              {items.map((item, i) => (
                <a
                  key={item.href}
                  ref={i === focusElement ? selectedRef : null}
                  href={item.href}
                  className="year-tab"
                  tabIndex={i === focusElement ? 0 : -1}
                  aria-current={i === focusElement ? "page" : undefined}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div ref={leftRef}>
            <div className="pointer-events-none absolute top-0 right-auto left-0 h-full w-24 bg-gradient-to-r from-white dark:from-black"></div>
            <button
              type="button"
              aria-label="Scroll left"
              className="absolute right-auto bottom-1/2 left-0 h-full w-[24px] translate-y-1/2 rounded focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
              onClick={() => {
                const e = ref.current;

                e.scrollLeft -= skipLength;
              }}
            >
              <span>
                <svg
                  viewBox="0 0 32 32"
                  width="1em"
                  height="1em"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path
                    className="fill-black dark:fill-white"
                    d="M10.4 14.3 26.5 31h-6.4L5.5 16 20.1 1h6.4L10.4 17.7z"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
          <div ref={rightRef}>
            <div className="pointer-events-none absolute top-0 right-0 left-auto h-full w-24 bg-gradient-to-l from-white dark:from-black"></div>
            <button
              type="button"
              aria-label="Scroll right"
              className="absolute right-0 bottom-1/2 left-auto h-full w-[24px] translate-y-1/2 rounded focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
              onClick={() => {
                const e = ref.current;

                e.scrollLeft += skipLength;
              }}
            >
              <span>
                <svg
                  viewBox="0 0 32 32"
                  width="1em"
                  height="1em"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path
                    className="fill-black dark:fill-white"
                    d="M21.6 14.3 5.5 31h6.4l14.6-15L11.9 1H5.5l16.1 16.7z"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
