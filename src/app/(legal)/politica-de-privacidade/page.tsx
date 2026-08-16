import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: `Política de Privacidade | ${COMPANY.legalName}`,
  description: `Política de Privacidade da ${COMPANY.legalName}.`
};

export default function PrivacyPolicy() {
  return (
    <main className="legal-page">
      <Link href="/">Voltar ao inicio</Link>
      <h1>Política de Privacidade</h1>
      <p>
        Esta Política de Privacidade descreve como a {COMPANY.legalName} pode
        coletar, usar e proteger informações fornecidas por clientes, parceiros
        e visitantes deste site.
      </p>
      <h2>Coleta de informações</h2>
      <p>
        Podemos receber dados de contato, como nome, telefone, e-mail e mensagem,
        quando enviados voluntariamente por canais oficiais de atendimento.
      </p>
      <h2>Uso das informações</h2>
      <p>
        As informações são utilizadas para atendimento, retorno comercial,
        suporte operacional e comunicações relacionadas aos serviços solicitados.
      </p>
      <h2>Contato</h2>
      <p>
        Para dúvidas sobre privacidade, entre em contato pelo e-mail {COMPANY.email}.
      </p>
    </main>
  );
}
