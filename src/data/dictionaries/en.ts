import type { Dictionary } from "./types";

export const en: Dictionary = {
  nav: {
    items: [
      { label: "Capabilities", href: "#capabilities" },
      { label: "Technology", href: "#technology" },
      { label: "Work", href: "#work" },
      { label: "Contact", href: "#cta" }
    ],
    localeSwitchLabel: "PT",
    localeSwitchHref: "/pt"
  },
  hero: {
    eyebrow: "Software Engineering Partner",
    headline: "Software engineering teams for businesses that need to deliver.",
    subheadline: "Experienced engineers building, modernizing and scaling digital products.",
    primaryCta: "Start a project",
    secondaryCta: "Talk to our team"
  },
  positioning: {
    eyebrow: "How we work",
    title: "Engineering capacity, when you need it.",
    body: "Adalberto Business puts experienced engineering behind companies that need to build, evolve or modernize software — as a project team, an embedded squad, or ongoing technical consulting."
  },
  capabilities: {
    eyebrow: "Capabilities",
    title: "Four ways to work with us.",
    items: [
      {
        title: "Software Engineering",
        description: "Backend and full-stack delivery — Python, FastAPI, REST APIs and modern web stacks — grounded in ongoing production work at Proconect.",
        cta: "Start a project",
        href: "#cta"
      },
      {
        title: "Dedicated Teams",
        description: "A network of engineers and consultants fluent in the stacks companies already run: Python, Java, PHP, JavaScript/TypeScript, .NET, cloud and DevOps.",
        cta: "Talk to our team",
        href: "#cta"
      },
      {
        title: "Technical Consulting",
        description: "Architecture reviews, performance optimization and modernization — from caching and async processing to legacy system evolution.",
        cta: "Book a review",
        href: "#cta"
      },
      {
        title: "AI & Automation",
        description: "Workflow automation and resilient data pipelines, backed by hands-on AI training and quality auditing experience at Scale AI and automation delivery at CRM DataCrazy.",
        cta: "Explore automation",
        href: "#cta"
      }
    ]
  }
};
