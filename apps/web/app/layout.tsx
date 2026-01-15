import type React from "react";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/global.css";
import "mapbox-gl/dist/mapbox-gl.css";

config.autoAddCss = false;

const _plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const _dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WahalaFix | Nigeria 311 Service for City Issues",
    template: "%s | WahalaFix",
  },
  description:
    "WahalaFix is Nigeria's 311-style civic reporting app. Report potholes, broken streetlights, flooding, waste, and public safety issues in Lagos and beyond in seconds.",
  generator: "v0.app",
  applicationName: "WahalaFix",
  keywords: [
    "Nigeria 311",
    "Lagos 311",
    "report potholes Lagos",
    "streetlight outage report",
    "flooding report Lagos",
    "waste management report",
    "civic reporting app",
    "local government service request",
    "public works reporting",
    "city problem reporting",
    "community reporting Nigeria",
    "municipal issue reporting",
  ],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "WahalaFix | Nigeria 311 Service for City Issues",
    description:
      "Report potholes, broken streetlights, flooding, waste, and public safety issues in Lagos and across Nigeria. Snap a photo, drop a pin, and notify the right authorities.",
    type: "website",
    locale: "en_NG",
    siteName: "WahalaFix",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WahalaFix - Nigeria 311 Service",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "WahalaFix | Nigeria 311 Service for City Issues",
    description:
      "Nigeria's 311-style civic reporting app for potholes, streetlights, flooding, waste, and safety issues.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1a5f2a",
  width: "device-width",
  initialScale: 1,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className={`${_plusJakarta.variable} ${_dmSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
