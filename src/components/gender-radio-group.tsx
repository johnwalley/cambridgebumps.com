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
  return (
    <div>
      <Label htmlFor="gender" className="mb-4 block">
        Category
      </Label>
      <RadioGroup
        id="gender"
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
          <RadioGroupItem value="men" id="men" />
          <Label htmlFor="men">{getGenderLabel(event, "men")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="women" id="women" />
          <Label htmlFor="women">Women</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
