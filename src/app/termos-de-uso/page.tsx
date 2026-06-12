import { company } from "@/lib/company";

export const metadata = {
  title: `Termos de Uso | ${company.legalName}`,
  description: `Termos de Uso do site oficial da ${company.legalName}.`
};

export default function TermsOfUse() {
  return (
    <main className="legal-page">
      <a href="/">Voltar ao inicio</a>
      <h1>Termos de Uso</h1>
      <p>
        Ao acessar este site, voce concorda com estes Termos de Uso. O conteudo
        apresentado tem finalidade institucional e informativa sobre a
        {` ${company.legalName}`}.
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
        O canal oficial para contato e {company.email}, alem do telefone
        {` ${company.phone}`}.
      </p>
    </main>
  );
}
