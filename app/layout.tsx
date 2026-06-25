import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Body / UI: clean, modern grotesque — the "consultancy" half of the brand.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Display / headlines: elegant serif — the "premium publication" half.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const SITE_NAME = "ReeCo";
const SITE_DESCRIPTION =
  "ReeCo helps businesses uncover revenue leaks, improve customer journeys, increase retention, and build systems that drive long-term growth.";

export const metadata: Metadata = {
  // TODO: set metadataBase to the production URL once the domain is confirmed.
  title: {
    default: "ReeCo — Customer Journeys, Retention & Growth Systems",
    template: "%s — ReeCo",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "customer journey",
    "lifecycle marketing",
    "retention marketing",
    "revenue optimization",
    "growth systems",
    "business strategy",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "ReeCo — Customer Journeys, Retention & Growth Systems",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "ReeCo — Customer Journeys, Retention & Growth Systems",
    description: SITE_DESCRIPTION,
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
      className={`${inter.variable} ${fraunces.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
