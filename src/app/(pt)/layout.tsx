import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "../globals.css";
import { COMPANY } from "@/lib/constants";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  title: {
    default: "Adalberto Business | Engenharia de Software no Sul de Minas",
    template: "%s | Adalberto Business"
  },
  description:
    "Engenharia de software para empresas de pequeno a grande porte em São Gonçalo do Sapucaí, Varginha, Pouso Alegre e Santa Rita do Sapucaí — Sul de Minas.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png"
  },
  openGraph: {
    title: "Adalberto Business | Engenharia de Software no Sul de Minas",
    description:
      "Engenharia de software para empresas de pequeno a grande porte em São Gonçalo do Sapucaí, Varginha, Pouso Alegre e Santa Rita do Sapucaí — Sul de Minas.",
    url: COMPANY.website,
    siteName: "Adalberto Business",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image-pt.png", width: 1200, height: 630, alt: "Adalberto Business" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Adalberto Business | Engenharia de Software no Sul de Minas",
    description:
      "Engenharia de software para empresas de pequeno a grande porte em São Gonçalo do Sapucaí, Varginha, Pouso Alegre e Santa Rita do Sapucaí — Sul de Minas.",
    images: ["/og-image-pt.png"]
  },
  alternates: {
    canonical: "/",
    languages: { pt: "/", en: "/en" }
  }
};

export default function PortugueseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-near-black font-sans antialiased`}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
