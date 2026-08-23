import { EventSelect } from "@/components/event-select";
import { GenderRadioGroup } from "@/components/gender-radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statisticMapping } from "@/data/stats";
import type { Gender, Set } from "@/lib/utils";

type StatisticsNavProps = {
  event: Set;
  gender: Gender;
  /** Only set on an individual statistic's page. */
  statistic?: string;
};

// The event/category/statistic pickers above every statistics page.
export function StatisticsNav({
  event,
  gender,
  statistic,
}: StatisticsNavProps) {
  const go = (nextEvent: Set, nextGender: Gender, nextStatistic?: string) => {
    window.location.href = nextStatistic
      ? `/statistics/${nextEvent}/${nextGender}/${nextStatistic}`
      : `/statistics/${nextEvent}/${nextGender}`;
  };

  return (
    <div className="mb-4 flex flex-col gap-2 md:flex-row md:gap-4">
      <EventSelect
        value={event}
        onValueChange={(value) => go(value, gender, statistic)}
      />
      <GenderRadioGroup
        event={event}
        value={gender}
        onValueChange={(value) => go(event, value, statistic)}
        orientation="horizontal"
      />
      {statistic && (
        <div>
          <Label htmlFor="statistic" className="mb-4 block">
            Statistic
          </Label>
          <Select
            value={statistic}
            onValueChange={(value) => go(event, gender, value)}
          >
            <SelectTrigger id="statistic" className="w-[280px]">
              <SelectValue placeholder="Select a statistic" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(statisticMapping).map((key) => (
                <SelectItem key={key} value={key}>
                  {statisticMapping[key].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
