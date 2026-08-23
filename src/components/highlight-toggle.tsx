import { Checkbox } from "@/components/ui/checkbox";

type HighlightToggleProps = {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

// The "Highlight blades"/"Highlight spoons" checkboxes. The chart shells own
// the query string, so this is a plain controlled checkbox.
export function HighlightToggle({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: HighlightToggleProps) {
  return (
    <>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={id}
          className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </>
  );
}
