import { Separator } from "@/components/ui/separator";
import { ArrowRightIcon, BellIcon } from "@radix-ui/react-icons";

export function Announcement({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      <BellIcon className="h-4 w-4" />
      <Separator className="mx-2 h-4" orientation="vertical" />{" "}
      <span>{label}</span>
      <ArrowRightIcon className="ml-1 h-4 w-4" />
    </a>
  );
}
