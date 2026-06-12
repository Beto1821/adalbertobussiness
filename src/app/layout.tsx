import type { Metadata } from "next";
import "./globals.css";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: `${company.legalName} | Solucoes digitais e automacao`,
  description:
    `${company.legalName} atua com solucoes digitais, automacao, CRM, integracoes com APIs, webhooks e suporte operacional em tecnologia.`,
  metadataBase: new URL(company.website),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${company.legalName} | Site oficial`,
    description:
      "Solucoes digitais, automacao e tecnologia para empresas.",
    url: company.website,
    siteName: company.legalName,
    locale: "pt_BR",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
