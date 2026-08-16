import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { COMPANY } from "@/lib/constants";

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
  openGraph: {
    title: "Adalberto Business | Software Engineering Partner",
    description:
      "Experienced software engineering teams for businesses that need to deliver, modernize and scale digital products.",
    url: COMPANY.website,
    siteName: "Adalberto Business",
    locale: "en_US",
    type: "website"
  },
  alternates: {
    canonical: "/",
    languages: { en: "/", pt: "/pt" }
  }
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-near-black font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
