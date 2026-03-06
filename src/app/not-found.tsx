import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="text-muted-foreground">
        We have no results to show for this page.
      </p>
      <Link href="/" className="underline underline-offset-4 hover:text-primary">
        Go back home
      </Link>
    </div>
  );
}
