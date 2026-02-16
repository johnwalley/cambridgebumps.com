import "./globals.css";

import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/providers";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.BASE_URL || "https://www.cambridgebumps.com"
  ),
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  other: { chrome: "nointentdetection" },
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_TITLE} Bumps`,
    default: `${process.env.NEXT_PUBLIC_TITLE} Bumps`,
  },
  description:
    "Interactive charts and historical results for Cambridge and Oxford bumps rowing races. Explore May Bumps, Lent Bumps, Summer Eights, and Torpids from 1815 to today.",
  keywords: [
    "Bumps",
    "rowing",
    "charts",
    "Cambridge",
    "Oxford",
    "Eights",
    "Lents",
    "Mays",
    "Torpids",
  ],
  authors: [
    {
      name: "John Walley",
      url: "https://www.walley.org.uk",
    },
  ],
  creator: "John Walley",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: `${process.env.NEXT_PUBLIC_TITLE} Bumps`,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@johnmwalley",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground"
          >
            Skip to main content
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1">{children}</main>
          {/* <SiteFooter /> */}
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG} />
    </html>
  );
}
