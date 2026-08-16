import type { Dictionary } from "./types";

export const pt: Dictionary = {
  nav: {
    items: [
      { label: "Servicos", href: "#capabilities" },
      { label: "Tecnologia", href: "#technology" },
      { label: "Projetos", href: "#work" },
      { label: "Contato", href: "#cta" }
    ],
    localeSwitchLabel: "EN",
    localeSwitchHref: "/"
  },
  hero: {
    eyebrow: "Parceiro de Engenharia de Software",
    headline: "Equipes de engenharia de software para empresas que precisam entregar.",
    subheadline: "Engenheiros experientes construindo, modernizando e escalando produtos digitais.",
    primaryCta: "Iniciar um projeto",
    secondaryCta: "Falar com o time"
  },
  positioning: {
    eyebrow: "Como atuamos",
    title: "Capacidade de engenharia, quando voce precisar.",
    body: "A Adalberto Business coloca engenharia experiente a disposicao de empresas que precisam construir, evoluir ou modernizar software — como equipe de projeto, squad integrado ou consultoria tecnica continua."
  },
  capabilities: {
    eyebrow: "Capacidades",
    title: "Quatro formas de trabalhar com a gente.",
    items: [
      {
        title: "Software Engineering",
        description: "Entrega backend e full-stack — Python, FastAPI, APIs REST e stacks web modernas — com base em trabalho real em producao na Proconect.",
        cta: "Iniciar um projeto",
        href: "#cta"
      },
      {
        title: "Dedicated Teams",
        description: "Uma rede de engenheiros e consultores com dominio nas stacks que as empresas ja usam: Python, Java, PHP, JavaScript/TypeScript, .NET, cloud e DevOps.",
        cta: "Falar com o time",
        href: "#cta"
      },
      {
        title: "Technical Consulting",
        description: "Revisao de arquitetura, otimizacao de performance e modernizacao — de cache e processamento assincrono a evolucao de sistemas legados.",
        cta: "Agendar uma avaliacao",
        href: "#cta"
      },
      {
        title: "AI & Automation",
        description: "Automacao de fluxos e pipelines de dados resilientes, apoiados em experiencia real de treinamento e auditoria de qualidade de IA na Scale AI e automacao na CRM DataCrazy.",
        cta: "Conhecer a automacao",
        href: "#cta"
      }
    ]
  }
};
