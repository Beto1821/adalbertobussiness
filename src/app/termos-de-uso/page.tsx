import Link from "next/link";
import { COMPANY } from "@/lib/constants";

export const metadata = {
  title: `Termos de Uso | ${COMPANY.legalName}`,
  description: `Termos de Uso do site oficial da ${COMPANY.legalName}.`
};

export default function TermsOfUse() {
  return (
    <main className="legal-page">
      <Link href="/">Voltar ao inicio</Link>
      <h1>Termos de Uso</h1>
      <p>
        Ao acessar este site, voce concorda com estes Termos de Uso. O conteudo
        apresentado tem finalidade institucional e informativa sobre a
        {` ${COMPANY.legalName}`}.
      </p>
      <h2>Informacoes institucionais</h2>
      <p>
        Os dados oficiais da empresa devem corresponder aos registros
        documentais, fiscais e aos dados informados em plataformas de verificacao
        empresarial.
      </p>
      <h2>Servicos</h2>
      <p>
        A prestacao de servicos depende de avaliacao tecnica, escopo acordado e
        condicoes comerciais definidas diretamente com a empresa.
      </p>
      <h2>Contato</h2>
      <p>
        O canal oficial para contato e {COMPANY.email}, alem do telefone
        {` ${COMPANY.phone}`}.
      </p>
    </main>
  );
}
