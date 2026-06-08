"use client";

import {
  Children,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

type YearPickerProps = {
  skipLength: number;
  focusElement?: number;
  position?: ScrollLogicalPosition;
  spacing?: number;
};

export function YearPicker({
  children,
  skipLength,
  focusElement = 0,
  position = "start",
  spacing = 0,
}: PropsWithChildren<YearPickerProps>) {
  const ref = useRef<HTMLDivElement>(null!);
  const selectedRef = useRef<HTMLButtonElement>(null!);

  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);

  useEffect(() => {
    const f = () => {
      selectedRef.current &&
        selectedRef.current.scrollIntoView &&
        selectedRef.current.scrollIntoView({
          inline: position,
          block: "nearest",
          behavior: "instant",
        });
    };

    f();
  }, [position]);

  useEffect(() => {
    const e = ref.current;

    const f = () => {
      setLeft(Math.abs(e.scrollLeft) < 1);
      setRight(Math.abs(e.scrollLeft - (e.scrollWidth - e.clientWidth)) < 1);
    };

    e.addEventListener("scroll", f);

    f();

    return () => {
      e.removeEventListener("scroll", f);
    };
  }, []);

  return (
    <section className="relative px-0">
      <div className="m-0 border-0 p-0">
        <div className="relative">
          <Tabs
            ref={ref}
            className="overflow-x-scroll scroll-smooth"
            style={{ scrollbarWidth: "none" }}
            value={`${focusElement}`}
          >
            <TabsList className="">
              {Children.map(children, (child, i) => (
                <TabsTrigger
                  key={i}
                  ref={i === focusElement ? selectedRef : null}
                  className="h-[1.45rem] rounded-sm px-2 text-sm"
                  value={`${i}`}
                  asChild
                >
                  {child}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          {!left && (
            <>
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
            </>
          )}
          {!right && (
            <>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}
