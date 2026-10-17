import { useId } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

import { HighlightToggle } from "@/components/highlight-toggle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type HighlightControlsProps = {
  /** Club names for the "Highlight club" dropdown. */
  clubs: string[];
  club: string | null;
  blades: boolean;
  spoons: boolean;
  setParam: (name: string, value: string | null) => void;
  /**
   * The single row shown above the chart on narrow screens, rather than the
   * labelled stack in the sidebar.
   */
  compact?: boolean;
};

// The "Highlight club" select and blades/spoons toggles shared by both
// chart shells. Each shell renders it twice — in the sidebar and above the
// chart on narrow screens, one of them hidden by CSS — so the ids come from
// `useId` rather than being fixed, or the two copies' labels would point at
// the same control.
export function HighlightControls({
  clubs,
  club,
  blades,
  spoons,
  setParam,
  compact = false,
}: HighlightControlsProps) {
  const id = useId();
  const clubId = `${id}-club`;

  const clubPicker = (
    <div className={cn("flex", compact && "min-w-40 flex-1")}>
      <Select
        value={club ?? ""}
        onValueChange={(value) => setParam("club", value)}
      >
        <SelectTrigger
          id={clubId}
          aria-label={compact ? "Highlight club" : undefined}
          className={compact ? "h-8 min-w-0 flex-1" : "w-[280px]"}
        >
          <SelectValue
            placeholder={compact ? "Highlight a club" : "Select a club"}
          />
        </SelectTrigger>
        <SelectContent>
          {clubs.map((name) => (
            <SelectItem key={name} value={name}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        variant="link"
        size="icon"
        className={cn(compact && "h-8 w-8 shrink-0")}
        disabled={club === null}
        onClick={() => setParam("club", null)}
        aria-label="Clear highlighted club"
      >
        <Cross2Icon className="h-4 w-4" />
      </Button>
    </div>
  );

  const toggle = (
    name: "blades" | "spoons",
    label: string,
    checked: boolean,
    description: string,
  ) => (
    <div
      className={cn(
        "flex space-x-2",
        compact ? "shrink-0 items-center" : "items-top",
      )}
    >
      <HighlightToggle
        id={`${id}-${name}`}
        label={compact ? label : `Highlight ${name}`}
        description={compact ? undefined : description}
        checked={checked}
        onCheckedChange={(next) => setParam(name, next ? "true" : "false")}
      />
    </div>
  );

  const bladesToggle = toggle(
    "blades",
    "Blades",
    blades,
    "Crews who have gone up every day are highlighted.",
  );
  const spoonsToggle = toggle(
    "spoons",
    "Spoons",
    spoons,
    "Crews who have gone down every day are highlighted.",
  );

  if (compact) {
    return (
      // On the narrowest phones the toggles wrap below the club picker
      // rather than squeezing it.
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {clubPicker}
        {bladesToggle}
        {spoonsToggle}
      </div>
    );
  }

  return (
    <>
      {bladesToggle}
      {spoonsToggle}
      <div>
        <Label htmlFor={clubId} className="mb-4 block">
          Highlight club
        </Label>
        {clubPicker}
      </div>
    </>
  );
}
