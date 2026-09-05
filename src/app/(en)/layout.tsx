import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "../globals.css";
import { COMPANY } from "@/lib/constants";
import { Analytics } from "@/components/analytics";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  title: {
    default: "Adalberto Business | Software Engineering Partner",
    template: "%s | Adalberto Business"
  },
  description:
    "Experienced software engineering teams for businesses that need to deliver, modernize and scale digital products.",
  robots: {
    index: false,
    follow: false
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png"
  },
  openGraph: {
    title: "Adalberto Business | Software Engineering Partner",
    description:
      "Experienced software engineering teams for businesses that need to deliver, modernize and scale digital products.",
    url: `${COMPANY.website}/en`,
    siteName: "Adalberto Business",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Adalberto Business" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Adalberto Business | Software Engineering Partner",
    description:
      "Experienced software engineering teams for businesses that need to deliver, modernize and scale digital products.",
    images: ["/og-image.png"]
  },
  alternates: {
    canonical: "/en",
    languages: { pt: "/", en: "/en" }
  }
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-near-black font-sans antialiased`}>
        <Analytics />
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
