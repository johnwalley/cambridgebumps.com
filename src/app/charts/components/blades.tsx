"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const Blades = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      <Checkbox
        id="blades"
        checked={searchParams.get("blades") === "true"}
        onCheckedChange={(checked) => {
          router.push(
            pathname +
              "?" +
              createQueryString("blades", checked ? "true" : "false")
          );
        }}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="blades"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Highlight blades
        </label>
        <p className="text-sm text-muted-foreground">
          Crews who have gone up every day are highlighted.
        </p>
      </div>
    </>
  );
};
