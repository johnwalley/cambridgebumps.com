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
import { Metadata } from "next";

export const metadata: Metadata = {
  description: `Interactive bumps charts and historical results for ${process.env.NEXT_PUBLIC_TITLE} rowing races. View race results, track your college or club, and explore statistics from over 200 years of bumps racing.`,
  openGraph: {
    title: `${process.env.NEXT_PUBLIC_TITLE} Bumps - Rowing Race Charts & Statistics`,
    description: `Interactive bumps charts and historical results for ${process.env.NEXT_PUBLIC_TITLE} rowing races. View race results, track your college or club, and explore statistics from over 200 years of bumps racing.`,
  },
  alternates: {
    canonical: "/",
  },
};

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
