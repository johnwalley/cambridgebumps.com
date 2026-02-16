"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const Spoons = () => {
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
        id="spoons"
        checked={searchParams.get("spoons") === "true"}
        onCheckedChange={(checked) => {
          router.push(
            pathname +
              "?" +
              createQueryString("spoons", checked ? "true" : "false")
          );
        }}
      />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="spoons"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Highlight spoons
        </label>
        <p className="text-sm text-muted-foreground">
          Crews who have gone down every day are highlighted.
        </p>
      </div>
    </>
  );
};
