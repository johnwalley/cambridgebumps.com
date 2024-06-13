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
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            What&apos;s it all about?
          </Link>
        </PageActions>
      </PageHeader>
      {/*       <section className="-mx-4 sm:-mx-8 pb-20">
       */}
      <section className="pb-20 w-screen relative left-1/2 right-1/2 ml-[-50vw]">
        <Photos />
      </section>
    </div>
  );
}
