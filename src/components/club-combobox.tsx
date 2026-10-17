import { useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type ClubComboboxProps = {
  id: string;
  clubs: string[];
  value: string | null;
  onChange: (club: string) => void;
  placeholder: string;
  "aria-label"?: string;
  className?: string;
};

// The "Highlight club" picker. A year of May Bumps has ~80 clubs and the
// multi-year list several times that, so it filters as you type rather than
// relying on a select's first-letter typeahead ("St Catharine's II" is a long
// way down the S's).
export function ClubCombobox({
  id,
  clubs,
  value,
  onChange,
  placeholder,
  "aria-label": ariaLabel,
  className,
}: ClubComboboxProps) {
  const [open, setOpen] = useState(false);

  // `?club=` is carried between years, so it can name a club that didn't race
  // in this one. Show it anyway, flagged, so the picker says what's selected
  // (and the clear button beside it makes sense) instead of silently falling
  // back to its placeholder. The highlight returns on the years it did race.
  const didNotRace = value !== null && !clubs.includes(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-label={ariaLabel}
          className={cn(
            "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-sm ring-offset-background focus:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            className,
          )}
        >
          <span className={cn("truncate", !value && "text-muted-foreground")}>
            {value ?? placeholder}
            {didNotRace && (
              <span className="text-muted-foreground"> (did not race)</span>
            )}
          </span>
          <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] min-w-56 p-0"
      >
        <Command>
          <CommandInput placeholder="Search clubs…" />
          <CommandList>
            <CommandEmpty>No club found.</CommandEmpty>
            <CommandGroup>
              {clubs.map((name) => (
                <CommandItem
                  key={name}
                  value={name}
                  onSelect={() => {
                    onChange(name);
                    setOpen(false);
                  }}
                >
                  {name}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      name === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
