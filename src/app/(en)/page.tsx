import Image from "next/image";
import { COMPANY } from "@/lib/constants";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Servicos", href: "#servicos" },
  { label: "Contato", href: "#contato" }
];

const companyInfo = [
  ["Razao social", COMPANY.legalName],
  ["Nome fantasia", COMPANY.tradeName],
  ["CNPJ", COMPANY.cnpj],
  ["Telefone", COMPANY.phone],
  ["E-mail", COMPANY.email],
  ["Cidade/UF", COMPANY.cityState],
  ["Site oficial", COMPANY.domain]
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label={`${COMPANY.legalName} - inicio`}>
          <Image src="/logo.png" alt={COMPANY.tradeName} width={140} height={48} priority />
        </a>

        <nav aria-label="Menu principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <section id="inicio" className="hero section">
        <div className="hero-content">
          <p className="eyebrow">Site oficial</p>
          <h1>
            <Image src="/logo.png" alt={COMPANY.tradeName} width={640} height={220} priority />
          </h1>
          <p className="subtitle">Solucoes digitais, automacao e tecnologia para empresas</p>
          <p className="hero-text">
            Atuamos na organizacao de processos digitais, configuracao de CRM,
            integracoes com APIs e webhooks, automacao de rotinas e suporte operacional
            para empresas que precisam tornar seus fluxos comerciais mais claros e eficientes.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contato">Entrar em contato</a>
            <a className="button secondary" href="#informacoes">Ver dados oficiais</a>
          </div>
        </div>
      </section>

      <section id="sobre" className="section split">
        <div>
          <p className="eyebrow">Sobre a empresa</p>
          <h2>Tecnologia aplicada a processos empresariais</h2>
        </div>
        <div className="content-block">
          <p>
            A {COMPANY.legalName} presta servicos digitais voltados a automacao,
            CRM, integracoes entre plataformas, webhooks e suporte operacional em
            tecnologia. O trabalho e conduzido com foco em organizacao, clareza
            tecnica e consistencia na execucao de processos comerciais.
          </p>
          <p>
            As solucoes sao planejadas conforme a realidade operacional de cada
            empresa, sem promessas de resultados financeiros garantidos e sem uso
            de informacoes exageradas. O objetivo e apoiar fluxos digitais mais
            estaveis, rastreaveis e adequados ao uso empresarial.
          </p>
        </div>
      </section>

      <section id="informacoes" className="section official-info">
        <div className="section-heading">
          <p className="eyebrow">Dados oficiais</p>
          <h2>Informacoes da empresa</h2>
        </div>
        <dl className="info-list">
          {companyInfo.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="contato" className="section contact">
        <div>
          <p className="eyebrow">Contato</p>
          <h2>Canais oficiais de atendimento</h2>
          <p>
            Para solicitar suporte, consultoria ou informacoes comerciais, entre em
            contato pelos canais oficiais abaixo.
          </p>
        </div>
        <div className="contact-panel">
          <a href={`tel:${COMPANY.phone.replace(/\D/g, "")}`}>{COMPANY.phone}</a>
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          <p>{COMPANY.businessHours}</p>
          <a className="button primary full" href={COMPANY.whatsappUrl} target="_blank" rel="noreferrer">
            Falar pelo WhatsApp
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <strong>{COMPANY.legalName}</strong>
          <p>CNPJ: {COMPANY.cnpj}</p>
          <p>{COMPANY.email} | {COMPANY.phone}</p>
        </div>
        <div className="footer-links">
          <a href="/politica-de-privacidade">Politica de Privacidade</a>
          <a href="/termos-de-uso">Termos de Uso</a>
        </div>
        <p className="copyright">
          © 2026 {COMPANY.legalName}. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}
