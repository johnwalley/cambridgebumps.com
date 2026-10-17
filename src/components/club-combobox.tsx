import * as React from "react";
import { CaretSortIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type ClubComboboxProps = {
  clubs: string[];
  value: string | null;
  onValueChange: (value: string | null) => void;
};

// The "Highlight club" picker: shadcn's Combobox (Popover + Command) so the
// list can be searched. Picking the selected club again clears it, as does the
// × button.
export function ClubCombobox({
  clubs,
  value,
  onValueChange,
}: ClubComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Label htmlFor="highlight-club" className="mb-4 block">
        Highlight club
      </Label>
      <div className="flex">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="highlight-club"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[280px] justify-between px-3 font-normal"
            >
              <span
                className={cn("truncate", !value && "text-muted-foreground")}
              >
                {value ?? "Select a club"}
              </span>
              <CaretSortIcon className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search clubs..." />
              <CommandList>
                <CommandEmpty>No club found.</CommandEmpty>
                <CommandGroup>
                  {clubs.map((name) => (
                    <CommandItem
                      key={name}
                      value={name}
                      onSelect={() => {
                        onValueChange(name === value ? null : name);
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
        <Button
          variant="link"
          size="icon"
          aria-label="Clear highlighted club"
          disabled={value === null}
          onClick={() => onValueChange(null)}
        >
          <Cross2Icon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
