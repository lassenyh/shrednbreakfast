import type { Metadata } from "next";
import { Bebas_Neue, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const siteUrl =
  process.env.VERCEL_URL != null
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shred' n Breakfast",
    template: "%s · Shred' n Breakfast",
  },
  description:
    "A rediscovered ski web series from 2009 — twintips, travel, and the good kind of bad ideas.",
  /** Utover app/favicon.ico + icon.png — eksplisitte lenker for nettlesere som ber om /favicon.ico først */
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: "Shred' n Breakfast",
    locale: "en_US",
    title: "Shred' n Breakfast",
    description:
      "A rediscovered ski web series from 2009 — twintips, travel, and the good kind of bad ideas.",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Shred' n Breakfast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shred' n Breakfast",
    description:
      "A rediscovered ski web series from 2009 — twintips, travel, and the good kind of bad ideas.",
    images: ["/opengraph.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-zinc-100">
        {children}
      </body>
    </html>
  );
}
