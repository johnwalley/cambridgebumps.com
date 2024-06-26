import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { BellIcon } from "@radix-ui/react-icons";

import { Separator } from "@/components/ui/separator";

export function Announcement() {
  return (
    <Link
      href="/charts/town/men/2024"
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      <BellIcon className="h-4 w-4" />{" "}
      <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span>Town Bumps 2024</span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </Link>
  );
}
