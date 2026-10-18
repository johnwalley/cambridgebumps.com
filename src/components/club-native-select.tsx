import { CaretSortIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

type ClubNativeSelectProps = {
  id: string;
  clubs: string[];
  value: string | null;
  onChange: (club: string) => void;
  placeholder: string;
  "aria-label"?: string;
  className?: string;
};

// The "Highlight club" picker on phones. `ClubCombobox` focuses its search box
// on open, and on iOS the keyboard that brings up shrinks the visual viewport
// Floating UI positions against: the popover flips above the trigger and runs
// off the top of the screen, search box and all (#86). The platform's own
// picker has no such trouble, and on a touch screen there's no first-letter
// typeahead to miss.
export function ClubNativeSelect({
  id,
  clubs,
  value,
  onChange,
  placeholder,
  "aria-label": ariaLabel,
  className,
}: ClubNativeSelectProps) {
  // As in `ClubCombobox`: `?club=` can name a club that didn't race this year,
  // so give it an option of its own rather than showing the placeholder.
  const didNotRace = value !== null && !clubs.includes(value);

  return (
    <div className={cn("relative flex", className)}>
      <select
        id={id}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        aria-label={ariaLabel}
        // 16px text: iOS zooms the page into any smaller form control on focus.
        className={cn(
          "w-full min-w-0 appearance-none truncate rounded-md border border-input bg-transparent py-0 pr-8 pl-3 text-base shadow-sm ring-offset-background focus:outline-none focus-visible:ring-1 focus-visible:ring-ring dark:[color-scheme:dark]",
          !value && "text-muted-foreground",
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {didNotRace && <option value={value}>{value} (did not race)</option>}
        {clubs.map((name) => (
          <option key={name} value={name} className="text-foreground">
            {name}
          </option>
        ))}
      </select>
      <CaretSortIcon className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 opacity-50" />
    </div>
  );
}
