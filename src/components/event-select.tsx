import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { Set } from "@/lib/utils";

// The event picker shared by the chart and statistics pages.
export function EventSelect({
  value,
  onValueChange,
}: {
  value: Set;
  onValueChange: (value: Set) => void;
}) {
  return (
    <div>
      <Label htmlFor="event" className="mb-4 block">
        Event
      </Label>
      <Select
        value={value}
        onValueChange={(next) => onValueChange(next as Set)}
      >
        <SelectTrigger id="event" className="w-[280px]">
          <SelectValue placeholder="Select an event" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Cambridge</SelectLabel>
            <SelectItem value="lents">Lent Bumps</SelectItem>
            <SelectItem value="mays">May Bumps</SelectItem>
            <SelectItem value="town">Town Bumps</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Oxford</SelectLabel>
            <SelectItem value="torpids">Torpids</SelectItem>
            <SelectItem value="eights">Summer Eights</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
