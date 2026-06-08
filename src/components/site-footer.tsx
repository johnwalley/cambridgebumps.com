import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-balance text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href={siteConfig.links.website}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            John Walley
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
