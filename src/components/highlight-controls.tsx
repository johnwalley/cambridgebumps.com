import { useId } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

import { ClubCombobox } from "@/components/club-combobox";
import { HighlightToggle } from "@/components/highlight-toggle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type HighlightControlsProps = {
  /** Club names for the "Highlight club" dropdown. */
  clubs: string[];
  club: string | null;
  blades: boolean;
  setParam: (name: string, value: string | null) => void;
  /**
   * The single row shown above the chart on narrow screens, rather than the
   * labelled stack in the sidebar.
   */
  compact?: boolean;
};

// The "Highlight club" select and "Highlight blades" toggle shared by both
// chart shells. Each shell renders it twice — in the sidebar and above the
// chart on narrow screens, one of them hidden by CSS — so the ids come from
// `useId` rather than being fixed, or the two copies' labels would point at
// the same control.
export function HighlightControls({
  clubs,
  club,
  blades,
  setParam,
  compact = false,
}: HighlightControlsProps) {
  const id = useId();
  const clubId = `${id}-club`;
  const bladesId = `${id}-blades`;

  const clubPicker = (
    <div className={cn("flex", compact && "min-w-0 flex-1")}>
      <ClubCombobox
        id={clubId}
        clubs={clubs}
        value={club}
        onChange={(value) => setParam("club", value)}
        placeholder={compact ? "Highlight a club" : "Select a club"}
        aria-label={compact ? "Highlight club" : undefined}
        className={compact ? "h-8 min-w-0 flex-1" : "w-[280px]"}
      />
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

  const bladesToggle = (
    <div
      className={cn(
        "flex space-x-2",
        compact ? "shrink-0 items-center" : "items-top",
      )}
    >
      <HighlightToggle
        id={bladesId}
        label={compact ? "Blades" : "Highlight blades"}
        description={
          compact
            ? undefined
            : "Crews who have gone up every day are highlighted."
        }
        checked={blades}
        onCheckedChange={(checked) =>
          setParam("blades", checked ? "true" : "false")
        }
      />
    </div>
  );

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        {clubPicker}
        {bladesToggle}
      </div>
    );
  }

  return (
    <>
      {bladesToggle}
      <div>
        <Label htmlFor={clubId} className="mb-4 block">
          Highlight club
        </Label>
        {clubPicker}
      </div>
    </>
  );
}
