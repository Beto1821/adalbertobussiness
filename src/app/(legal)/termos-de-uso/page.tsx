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
        Ao acessar este site, você concorda com estes Termos de Uso. O conteúdo
        apresentado tem finalidade institucional e informativa sobre a
        {` ${COMPANY.legalName}`}.
      </p>
      <h2>Informações institucionais</h2>
      <p>
        Os dados oficiais da empresa devem corresponder aos registros
        documentais, fiscais e aos dados informados em plataformas de verificação
        empresarial.
      </p>
      <h2>Serviços</h2>
      <p>
        A prestação de serviços depende de avaliação técnica, escopo acordado e
        condições comerciais definidas diretamente com a empresa.
      </p>
      <h2>Contato</h2>
      <p>
        O canal oficial para contato é {COMPANY.email}, além do telefone
        {` ${COMPANY.phone}`}.
      </p>
    </main>
  );
}
