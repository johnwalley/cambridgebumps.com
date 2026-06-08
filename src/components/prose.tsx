import { cn } from "@/lib/utils";

export function Prose({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("prose prose-slate dark:prose-invert", className)}
      {...props}
    />
  );
}
