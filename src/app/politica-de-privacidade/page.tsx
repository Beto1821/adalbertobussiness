import Link from "next/link";
import { company } from "@/lib/company";

export const metadata = {
  title: `Politica de Privacidade | ${company.legalName}`,
  description: `Politica de Privacidade da ${company.legalName}.`
};

export default function PrivacyPolicy() {
  return (
    <main className="legal-page">
      <Link href="/">Voltar ao inicio</Link>
      <h1>Politica de Privacidade</h1>
      <p>
        Esta Politica de Privacidade descreve como a {company.legalName} pode
        coletar, usar e proteger informacoes fornecidas por clientes, parceiros
        e visitantes deste site.
      </p>
      <h2>Coleta de informacoes</h2>
      <p>
        Podemos receber dados de contato, como nome, telefone, e-mail e mensagem,
        quando enviados voluntariamente por canais oficiais de atendimento.
      </p>
      <h2>Uso das informacoes</h2>
      <p>
        As informacoes sao utilizadas para atendimento, retorno comercial,
        suporte operacional e comunicacoes relacionadas aos servicos solicitados.
      </p>
      <h2>Contato</h2>
      <p>
        Para duvidas sobre privacidade, entre em contato pelo e-mail {company.email}.
      </p>
    </main>
  );
}
