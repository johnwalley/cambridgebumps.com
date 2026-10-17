import { useId } from "react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn, getGenderLabel, type Gender, type Set } from "@/lib/utils";

// The category picker shared by the chart and statistics pages. The men's
// category of the Cambridge events is labelled "Open" (see `getGenderLabel`).
export function GenderRadioGroup({
  event,
  value,
  onValueChange,
  orientation = "vertical",
}: {
  event: Set;
  value: Gender;
  onValueChange: (value: Gender) => void;
  orientation?: "vertical" | "horizontal";
}) {
  const id = useId();

  // A `<label for>` can't name the radio group — its root is a div, which
  // isn't labellable — so the heading names it through `aria-labelledby`.
  return (
    <div>
      <span
        id={`${id}-label`}
        className="mb-4 block text-sm leading-none font-medium"
      >
        Category
      </span>
      <RadioGroup
        aria-labelledby={`${id}-label`}
        className={cn(
          "flex",
          orientation === "vertical"
            ? "flex-col space-y-1"
            : "flex-row items-center space-x-1",
        )}
        value={value}
        onValueChange={(next) => onValueChange(next as Gender)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="men" id={`${id}-men`} />
          <Label htmlFor={`${id}-men`}>{getGenderLabel(event, "men")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="women" id={`${id}-women`} />
          <Label htmlFor={`${id}-women`}>Women</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
