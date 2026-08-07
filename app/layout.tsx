import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";

import "./globals.css";
import { site } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// One weight, plus the italic that carries the emphasis in every heading.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const title = "arifwork — We make sure no lead slips through";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s · arifwork" },
  description: site.description,
  icons: {
    icon: "/favicon.svg",
  },
  keywords: [
    "AI marketing agency India",
    "missed call automation",
    "WhatsApp CRM",
    "AI receptionist",
    "lead generation for clinics",
    "local business marketing India",
    "Google Meta ads management",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F7F5",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  slogan: site.tagline,
  areaServed: { "@type": "Country", name: "India" },
  serviceType: [
    "Local Lead Generation",
    "Google & Meta Ads Management",
    "Reviews & Reputation Management",
    "Website and Booking Systems",
    "AI Missed-Call Receptionist",
    "WhatsApp CRM Automation",
    "AI Lead Qualification",
    "AI Support Desk",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-canvas font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
