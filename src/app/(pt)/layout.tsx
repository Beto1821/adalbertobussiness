import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { COMPANY } from "@/lib/constants";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  title: {
    default: "Adalberto Business | Parceiro de Engenharia de Software",
    template: "%s | Adalberto Business"
  },
  description: "Equipes de engenharia de software experientes para empresas que precisam entregar, modernizar e escalar produtos digitais.",
  openGraph: {
    title: "Adalberto Business | Parceiro de Engenharia de Software",
    description:
      "Equipes de engenharia de software experientes para empresas que precisam entregar, modernizar e escalar produtos digitais.",
    url: `${COMPANY.website}/pt`,
    siteName: "Adalberto Business",
    locale: "pt_BR",
    type: "website"
  },
  alternates: {
    canonical: "/pt",
    languages: { en: "/", pt: "/pt" }
  }
};

export default function PortugueseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-near-black font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
