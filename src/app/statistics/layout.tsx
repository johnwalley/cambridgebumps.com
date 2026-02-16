"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";

import { Label } from "@/components/ui/label";
import { PropsWithChildren } from "react";
// @ts-ignore no types
import { statisticMapping } from "./stats";

export default function Statistics({ children }: PropsWithChildren) {
  const router = useRouter();

  const segments = useSelectedLayoutSegments();

  return (
    <div className="container relative">
      <section>
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 text-lg tracking-tight">
          <div className="pt-4">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-4">
              Statistics
            </h1>
          </div>
          <div className="flex flex-col gap-2 mb-4 md:flex-row md:gap-4">
            <div>
              <Label htmlFor="event" className="mb-4 block">Event</Label>
              <Select
                value={segments[0]}
                onValueChange={(value) => {
                  router.push(
                    segments[2]
                      ? `/statistics/${value}/${segments[1]}/${segments[2]}`
                      : `/statistics/${value}/${segments[1]}`
                  );
                }}
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
            <div>
              <Label htmlFor="gender" className="mb-4 block">Gender</Label>
              <RadioGroup
                id="gender"
                className="flex flex-row space-x-1 items-center"
                value={segments[1]}
                onValueChange={(value) => {
                  router.push(
                    segments[2]
                      ? `/statistics/${segments[0]}/${value}/${segments[2]}`
                      : `/statistics/${segments[0]}/${value}`
                  );
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="men" id="men" />
                  <Label htmlFor="men">Men</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="women" id="women" />
                  <Label htmlFor="women">Women</Label>
                </div>
              </RadioGroup>
            </div>
            {segments[2] && (
              <div>
                <Label htmlFor="statistic" className="mb-4 block">Statistic</Label>
                <Select
                  value={segments[2]}
                  onValueChange={(value) => {
                    router.push(
                      `/statistics/${segments[0]}/${segments[1]}/${value}`
                    );
                  }}
                >
                  <SelectTrigger id="statistic" className="w-[280px]">
                    <SelectValue placeholder="Select a statistic" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(statisticMapping).map((statistic) => (
                      <SelectItem key={statistic} value={statistic}>
                        {statisticMapping[statistic].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <div>{children}</div>
        </div>
      </section>
    </div>
  );
}
