import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://little-weekends-bay-area.cashmire2.chatgpt.site"),
  title: "Little Weekends Bay Area",
  description:
    "오늘 아이와 갈 만한 Bay Area 나들이를 시간, 거리, 준비 정보로 빠르게 비교하세요.",
  openGraph: {
    title: "Little Weekends Bay Area",
    description:
      "영유아 가족을 위한 빠르고 믿을 수 있는 Bay Area 나들이 가이드.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Little Weekends Bay Area",
    description: "영유아 가족을 위한 빠르고 믿을 수 있는 Bay Area 나들이 가이드.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
