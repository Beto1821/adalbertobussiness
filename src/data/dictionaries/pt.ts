import type { Dictionary } from "./types";

export const pt: Dictionary = {
  nav: {
    items: [
      { label: "Serviços", href: "#capabilities" },
      { label: "Tecnologia", href: "#technology" },
      { label: "Projetos", href: "#work" },
      { label: "Contato", href: "#cta" }
    ],
    localeSwitchLabel: "EN",
    localeSwitchHref: "/en"
  },
  hero: {
    eyebrow: "Parceiro de Engenharia de Software · Sul de Minas",
    regionLabel: "São Gonçalo do Sapucaí · Varginha · Pouso Alegre · Santa Rita do Sapucaí",
    headline: "Engenharia de software para empresas do Sul de Minas que precisam entregar.",
    subheadline: "Do pequeno ao grande porte, a mesma engenharia experiente por trás de sistemas, automações e squads dedicados — nascida no Vale da Eletrônica.",
    primaryCta: "Iniciar um projeto",
    secondaryCta: "Falar com o time"
  },
  positioning: {
    eyebrow: "Como atuamos",
    title: "Capacidade de engenharia, perto de você.",
    body: "A Adalberto Business atua em todo o Sul de Minas — São Gonçalo do Sapucaí, Varginha, Pouso Alegre e Santa Rita do Sapucaí — colocando engenharia experiente à disposição de empresas de qualquer porte que precisam construir, evoluir ou modernizar software."
  },
  tiers: {
    eyebrow: "Para qual porte você é",
    title: "Mesma engenharia, para cada estágio do seu negócio.",
    items: [
      {
        title: "Pequeno porte",
        description: "Sistemas enxutos, automações e presença digital sob medida para começar com o pé direito, sem contratar uma estrutura que você ainda não precisa.",
        cta: "Ver como começar",
        href: "#cta"
      },
      {
        title: "Médio porte",
        description: "Sistemas próprios, integrações entre ferramentas e consultoria técnica pontual para quem já sente os limites de soluções genéricas.",
        cta: "Agendar uma conversa",
        href: "#cta"
      },
      {
        title: "Grande porte",
        description: "Squads dedicados, modernização de legado e consultoria técnica contínua para operações que não podem parar.",
        cta: "Falar com o time",
        href: "#cta"
      }
    ]
  },
  capabilities: {
    eyebrow: "Capacidades",
    title: "Quatro formas de trabalhar com a gente.",
    items: [
      {
        title: "Software Engineering",
        description: "Entrega backend e full-stack — Python, FastAPI, APIs REST e stacks web modernas — com base em trabalho real em produção na Proconect.",
        cta: "Iniciar um projeto",
        href: "#cta"
      },
      {
        title: "Dedicated Teams",
        description: "Uma rede de engenheiros e consultores com domínio nas stacks que as empresas já usam: Python, Java, PHP, JavaScript/TypeScript, .NET, cloud e DevOps.",
        cta: "Falar com o time",
        href: "#cta"
      },
      {
        title: "Technical Consulting",
        description: "Revisão de arquitetura, otimização de performance e modernização — de cache e processamento assíncrono à evolução de sistemas legados.",
        cta: "Agendar uma avaliação",
        href: "#cta"
      },
      {
        title: "AI & Automation",
        description: "Automação de fluxos e pipelines de dados resilientes, apoiados em experiência real de treinamento e auditoria de qualidade de IA na Scale AI e automação na CRM DataCrazy.",
        cta: "Conhecer a automação",
        href: "#cta"
      }
    ]
  }
};
