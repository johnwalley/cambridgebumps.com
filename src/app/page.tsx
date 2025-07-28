import { Announcement } from "@/components/announcement";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Photos } from "@/components/photos";

export default function Home() {
  return (
    <div className="container relative">
      <PageHeader>
        <Announcement />
        <PageHeaderHeading>
          There is nothing — absolutely nothing — half so much worth doing as
          simply messing about in boats.
        </PageHeaderHeading>
        <PageHeaderDescription>
          Bumps charts, statistics, and more.
        </PageHeaderDescription>
        <PageActions>
          <Link href="/charts/" className={cn(buttonVariants())}>
            Bumps charts
          </Link>
          <Link
            href="/about"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            Bumps explained
          </Link>
        </PageActions>
      </PageHeader>
      <section className="pb-20">
        <Photos />
      </section>
    </div>
  );
}
