import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Little Weekends Bay Area",
  description:
    "A toddler-friendly Bay Area outings prototype for parents looking for story times, parks, indoor play, and weekend ideas.",
  openGraph: {
    title: "Little Weekends Bay Area",
    description:
      "Find toddler-friendly Bay Area outings by date, distance, type, indoor/outdoor, and price.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="/styles.css?v=2" />
      </head>
      <body>{children}</body>
    </html>
  );
}
