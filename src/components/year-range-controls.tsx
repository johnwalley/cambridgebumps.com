import { useId } from "react";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { yearOf } from "@/lib/utils";

// The span of years a multi-year chart covers, from `?from=` and `?to=`.
// Either can be left out, and either can name a year the event didn't run —
// the range snaps inward to the nearest year it did. A pair given the wrong
// way round is swapped, and one that takes in no years at all (a women's
// event linked with a range from the 1800s, say) falls back to every year.
export function yearRange(
  years: string[],
  params: URLSearchParams,
): { from: string; to: string } {
  const first = years[0];
  const last = years[years.length - 1];

  const parse = (value: string | null, fallback: string) => {
    const year = yearOf(value ?? fallback);

    return Number.isNaN(year) ? yearOf(fallback) : year;
  };

  const a = parse(params.get("from"), first);
  const b = parse(params.get("to"), last);
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);

  const from = years.find((year) => yearOf(year) >= lo);
  const to = years.findLast((year) => yearOf(year) <= hi);

  if (from === undefined || to === undefined || yearOf(from) > yearOf(to)) {
    return { from: first, to: last };
  }

  return { from, to };
}

type YearRangeControlsProps = {
  /** Every year the event ran, oldest first. */
  years: string[];
  from: string;
  to: string;
  setParam: (name: string, value: string | null) => void;
  /** The native selects shown above the chart on narrow screens. */
  compact?: boolean;
};

// "From" and "To" pickers for a multi-year chart. Each only offers the years
// that keep the range the right way round. Choosing the event's first or last
// year drops the param, so the default chart keeps its bare URL.
//
// Rendered twice, like `HighlightControls`, hence the `useId` ids.
export function YearRangeControls({
  years,
  from,
  to,
  setParam,
  compact = false,
}: YearRangeControlsProps) {
  const id = useId();

  const first = years[0];
  const last = years[years.length - 1];

  const fromYears = years.filter((year) => yearOf(year) <= yearOf(to));
  const toYears = years.filter((year) => yearOf(year) >= yearOf(from));

  const setFrom = (year: string) =>
    setParam("from", year === first ? null : year);
  const setTo = (year: string) => setParam("to", year === last ? null : year);

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <YearNativeSelect
          years={fromYears}
          value={from}
          onChange={setFrom}
          aria-label="First year"
        />
        <span className="text-muted-foreground">to</span>
        <YearNativeSelect
          years={toYears}
          value={to}
          onChange={setTo}
          aria-label="Last year"
        />
      </div>
    );
  }

  return (
    <div>
      <Label htmlFor={`${id}-from`} className="mb-4 block">
        Years
      </Label>
      <div className="flex w-[280px] items-center gap-2">
        <YearSelect
          id={`${id}-from`}
          years={fromYears}
          value={from}
          onChange={setFrom}
          aria-label="First year"
        />
        <span className="text-sm text-muted-foreground">to</span>
        <YearSelect
          years={toYears}
          value={to}
          onChange={setTo}
          aria-label="Last year"
        />
      </div>
    </div>
  );
}

type YearSelectProps = {
  id?: string;
  years: string[];
  value: string;
  onChange: (year: string) => void;
  "aria-label": string;
};

function YearSelect({
  id,
  years,
  value,
  onChange,
  "aria-label": ariaLabel,
}: YearSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} aria-label={ariaLabel} className="flex-1">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// A native select on phones, for the same reason as `ClubNativeSelect`.
function YearNativeSelect({
  years,
  value,
  onChange,
  "aria-label": ariaLabel,
}: Omit<YearSelectProps, "id">) {
  return (
    <div className="relative flex min-w-0 flex-1">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={ariaLabel}
        // 16px text: iOS zooms the page into any smaller form control on focus.
        className="h-8 w-full min-w-0 appearance-none rounded-md border border-input bg-transparent py-0 pr-8 pl-3 text-base shadow-sm ring-offset-background focus:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:[color-scheme:dark]"
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <CaretSortIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 opacity-50" />
    </div>
  );
}
