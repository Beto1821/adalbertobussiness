import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { COMPANY } from "@/lib/constants";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website)
};

export default function LegalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-off-white font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
