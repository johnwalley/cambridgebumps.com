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
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  other: { chrome: "nointentdetection" },
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_TITLE} Bumps`,
    default: `${process.env.NEXT_PUBLIC_TITLE} Bumps`, // a default is required when creating a template
  },
  description: "Bumps charts, statistics, and more.",
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
          <SiteHeader />
          <main className="flex-1">{children}</main>
          {/* <SiteFooter /> */}
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TAG} />
    </html>
  );
}
