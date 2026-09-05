# Regional Sul de Minas Repositioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposition the site around the Sul de Minas (DDD 35) regional market — São Gonçalo do Sapucaí, Varginha, Pouso Alegre, Santa Rita do Sapucaí — serving small, medium and large companies, with Portuguese becoming the default site (`/`) and English becoming a dormant, non-indexed secondary offering (`/en`).

**Architecture:** Content and dictionary-schema changes first (additive, testable at the existing `/pt` route without touching routing), then a mechanical route-group swap (`(pt)` → `/`, `(en)` → `/en`), then regional SEO structured data and an inert Google Ads/Analytics readiness scaffold. No new dependencies; no automated test suite exists in this repo, so every task's verification is `npx tsc --noEmit` + `npm run lint` + manual review via `npm run dev` (per `CLAUDE.md`).

**Tech Stack:** Next.js 15 (App Router, multiple root layouts), TypeScript (strict), Tailwind CSS v4, Framer Motion, GSAP.

**Spec:** `docs/superpowers/specs/2026-09-05-regional-sul-de-minas-repositioning-design.md`

## Global Constraints

- Não instalar dependências além de: Next.js, TypeScript, Tailwind CSS, GSAP, Framer Motion, shadcn/ui, lucide-react. This plan needs zero new dependencies.
- TypeScript strict sempre ativo — não enfraquecer `tsconfig.json`.
- Priorizar Server Components; Client Components somente quando houver interatividade real.
- Reutilizar componentes existentes antes de criar novos.
- Não existe suite de testes automatizados. Verificação por task: `npx tsc --noEmit`, `npm run lint`, e revisão manual via `npm run dev` (`npm run build` no fim como checagem final de rota/build).
- `prefers-reduced-motion` deve continuar respeitado (já garantido pelo `<MotionConfig reducedMotion="user">` nos layouts — não remover).
- Dados legais/CNPJ em `COMPANY` (`src/lib/constants.ts`) não podem ter valores alterados — só é permitido *adicionar* o campo novo `regionCities`.
- `src/app/layout.tsx` NÃO deve existir — a estrutura de "multiple root layouts" (`(en)`, `(pt)`, `(legal)`, cada um com seu próprio `layout.tsx`) deve ser preservada durante o swap de rotas.
- Não alterar `next.config.ts` nem `.github/workflows/deploy.yml`.
- Conteúdo textual vive nos dicionários (`src/data/dictionaries/en.ts`, `pt.ts`), tipado por `types.ts` — nunca hardcode copy dentro de componentes.
- Trabalhar na branch `feature/regional-repositioning` (já existe, criada a partir de `develop`). Commit direto em `main` só é permitido mediante pedido explícito do usuário para este trabalho — o padrão aqui é a branch de feature.

---

### Task 1: Add regional cities to company constants

**Files:**
- Modify: `src/lib/constants.ts`

**Interfaces:**
- Produces: `COMPANY.regionCities: string[]` — consumed by Task 3 (copy), Task 7 (metadata description), Task 8 (structured data `areaServed`).

- [ ] **Step 1: Add the `regionCities` field**

Edit `src/lib/constants.ts` — add a new field to the existing `COMPANY` object, without changing any existing value:

```ts
export const COMPANY = {
  legalName: "67.055.281 ADALBERTO RAMOS RIBEIRO",
  tradeName: "Adalberto Business",
  cnpj: "67.055.281/0001-50",
  phone: "+55 (35) 91019-8999",
  email: "contato@adalbertobussiness.com",
  cityState: "São Gonçalo do Sapucaí - MG",
  domain: "adalbertobussiness.com",
  website: "https://adalbertobussiness.com",
  whatsappUrl: "https://wa.me/5535910198999",
  businessHours: "Segunda a sexta, das 9h às 18h",
  regionCities: [
    "São Gonçalo do Sapucaí",
    "Varginha",
    "Pouso Alegre",
    "Santa Rita do Sapucaí"
  ]
};
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat: add regionCities to COMPANY constants"
```

---

### Task 2: Extend the Dictionary type for regional content

**Files:**
- Modify: `src/data/dictionaries/types.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: `Dictionary.hero.regionLabel?: string`, `Dictionary.tiers?: { eyebrow: string; title: string; items: { title: string; description: string; cta: string; href: string }[] }` — consumed by Task 3 (pt.ts content), Task 5 (Tiers component), Task 6 (Hero component).

- [ ] **Step 1: Add the new optional fields**

Edit `src/data/dictionaries/types.ts`:

```ts
export type Dictionary = {
  nav: {
    items: { label: string; href: string }[];
    localeSwitchLabel: string;
    localeSwitchHref: string;
  };
  hero: {
    eyebrow: string;
    regionLabel?: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  positioning: {
    eyebrow: string;
    title: string;
    body: string;
  };
  tiers?: {
    eyebrow: string;
    title: string;
    items: {
      title: string;
      description: string;
      cta: string;
      href: string;
    }[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    items: {
      title: string;
      description: string;
      cta: string;
      href: string;
    }[];
  };
};
```

`regionLabel` and `tiers` are optional because the English dictionary (Task 7 onward, dormant `/en`) keeps its current international message and does not need either.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors — `en.ts` and `pt.ts` still satisfy `Dictionary` since the new fields are optional.

- [ ] **Step 3: Commit**

```bash
git add src/data/dictionaries/types.ts
git commit -m "feat: add optional regionLabel and tiers fields to Dictionary type"
```

---

### Task 3: Write the regional PT copy

**Files:**
- Modify: `src/data/dictionaries/pt.ts`

**Interfaces:**
- Consumes: `Dictionary` type from Task 2, `COMPANY.regionCities` is referenced conceptually (city names below are written out directly in copy, not imported — dictionaries are static data, no cross-import needed).
- Produces: `pt.hero.regionLabel`, updated `pt.hero.headline`/`subheadline`, updated `pt.positioning.title`/`body`, new `pt.tiers` block — consumed by Task 5 (Tiers component) and Task 6 (Hero component).

- [ ] **Step 1: Update hero and positioning copy, add the tiers block**

Edit `src/data/dictionaries/pt.ts` — replace the `hero` and `positioning` fields and add `tiers` (keep `nav` and `capabilities` unchanged for now; `nav.localeSwitchHref` is updated in Task 7):

```ts
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
    localeSwitchHref: "/"
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
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Visually check the copy on the existing route**

Run: `npm run dev`, open `http://localhost:3000/pt`
Expected: hero still renders (regionLabel not wired into the component yet — that's Task 6, so it's fine if it's not visible yet); no console errors.

- [ ] **Step 4: Commit**

```bash
git add src/data/dictionaries/pt.ts
git commit -m "feat: write regional Sul de Minas positioning and tiers copy (PT)"
```

---

### Task 4: Extract a shared CardGrid component and refactor Capabilities

**Files:**
- Create: `src/components/ui/card-grid.tsx`
- Modify: `src/components/services/capabilities.tsx`

**Interfaces:**
- Produces: `CardGrid({ items, columns }: { items: { title: string; description: string; cta: string; href: string }[]; columns?: 2 | 3 | 4 })` — a client component — consumed by `Capabilities` (this task) and `Tiers` (Task 5).

- [ ] **Step 1: Create the shared CardGrid component**

Create `src/components/ui/card-grid.tsx` with the hover-card grid markup currently duplicated inside `Capabilities`:

```tsx
"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

export type CardGridItem = {
  title: string;
  description: string;
  cta: string;
  href: string;
};

export function CardGrid({ items, columns = 4 }: { items: CardGridItem[]; columns?: 2 | 3 | 4 }) {
  const columnsClass =
    columns === 2 ? "lg:grid-cols-2" : columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";

  return (
    <LazyMotion features={domAnimation}>
      <div className={`mt-14 grid gap-6 sm:grid-cols-2 ${columnsClass}`}>
        {items.map((item) => (
          <m.div
            key={item.title}
            whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.4)" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col rounded-lg border border-white/15 p-6 transition-[transform,border-color] duration-200 ease-out focus-within:border-white/40 motion-safe:focus-within:-translate-y-1"
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{item.description}</p>
            <a href={item.href} className="mt-6 text-sm font-semibold text-electric-purple-text hover:text-white">
              {item.cta} →
            </a>
          </m.div>
        ))}
      </div>
    </LazyMotion>
  );
}
```

- [ ] **Step 2: Refactor Capabilities to use CardGrid**

Replace the full contents of `src/components/services/capabilities.tsx`:

```tsx
import type { Dictionary } from "@/data/dictionaries/types";
import { CardGrid } from "@/components/ui/card-grid";

export function Capabilities({ dict }: { dict: Dictionary }) {
  return (
    <section id="capabilities" className="border-t border-white/10 bg-near-black px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-purple-text">
            {dict.capabilities.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {dict.capabilities.title}
          </h2>
        </div>
        <CardGrid items={dict.capabilities.items} columns={4} />
      </div>
    </section>
  );
}
```

Note: `Capabilities` drops `"use client"` and becomes a Server Component — the interactivity now lives entirely inside `CardGrid`.

- [ ] **Step 3: Verify it compiles and lints**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 4: Visually confirm no regression**

Run: `npm run dev`, open `http://localhost:3000/pt#capabilities`
Expected: the 4 capability cards render identically to before (same 4-column layout at desktop width, same hover lift + border-brighten effect, same copy).

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/card-grid.tsx src/components/services/capabilities.tsx
git commit -m "refactor: extract shared CardGrid component from Capabilities"
```

---

### Task 5: Build the Tiers section and wire it into the PT page

**Files:**
- Create: `src/components/sections/tiers.tsx`
- Modify: `src/app/(pt)/pt/page.tsx`

**Interfaces:**
- Consumes: `CardGrid` from Task 4, `Dictionary.tiers` from Task 2/3.
- Produces: `Tiers({ dict }: { dict: Dictionary })` — a Server Component, rendered between `Positioning` and `Capabilities`.

- [ ] **Step 1: Create the Tiers component**

Create `src/components/sections/tiers.tsx`:

```tsx
import type { Dictionary } from "@/data/dictionaries/types";
import { CardGrid } from "@/components/ui/card-grid";

export function Tiers({ dict }: { dict: Dictionary }) {
  if (!dict.tiers) return null;

  return (
    <section id="tiers" className="border-t border-white/10 bg-near-black px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-purple-text">
            {dict.tiers.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {dict.tiers.title}
          </h2>
        </div>
        <CardGrid items={dict.tiers.items} columns={3} />
      </div>
    </section>
  );
}
```

The `if (!dict.tiers) return null` guard exists because `Dictionary.tiers` is optional (the English dictionary doesn't set it) — this makes the component safe to reuse later even if `en` gains its own tiers content.

- [ ] **Step 2: Wire it into the PT page**

Edit `src/app/(pt)/pt/page.tsx`:

```tsx
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/hero/hero";
import { Positioning } from "@/components/sections/positioning";
import { Tiers } from "@/components/sections/tiers";
import { Capabilities } from "@/components/services/capabilities";
import { pt } from "@/data/dictionaries/pt";

export default function PortugueseHome() {
  return (
    <main>
      <SiteHeader dict={pt} homeHref="/pt" />
      <Hero dict={pt} />
      <Positioning dict={pt} />
      <Tiers dict={pt} />
      <Capabilities dict={pt} />
    </main>
  );
}
```

(`homeHref="/pt"` stays as-is here — the routing swap happens in Task 7.)

- [ ] **Step 3: Verify it compiles and lints**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 4: Visually confirm the new section**

Run: `npm run dev`, open `http://localhost:3000/pt`
Expected: a new "Para qual porte você é" section appears between Positioning and Capabilities, with 3 cards (Pequeno/Médio/Grande porte), same visual style (hover lift, focus-visible outline reachable by keyboard) as Capabilities.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/tiers.tsx "src/app/(pt)/pt/page.tsx"
git commit -m "feat: add Tiers section (segmentação por porte) to PT homepage"
```

---

### Task 6: Render the region label in Hero

**Files:**
- Modify: `src/components/hero/hero.tsx`

**Interfaces:**
- Consumes: `Dictionary.hero.regionLabel` from Task 2/3.

- [ ] **Step 1: Add the conditional region line**

Edit `src/components/hero/hero.tsx` — insert a new line between the eyebrow and the headline:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/data/dictionaries/types";

export function Hero({ dict }: { dict: Dictionary }) {
  const scopeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !scopeRef.current) return;

    const targets = scopeRef.current.querySelectorAll("[data-hero-animate]");
    const tween = gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.12 }
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section ref={scopeRef} id="hero" className="flex min-h-screen flex-col justify-center bg-near-black px-6 pt-16">
      <div className="mx-auto w-full max-w-4xl">
        <p data-hero-animate className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-purple-text">
          {dict.hero.eyebrow}
        </p>
        {dict.hero.regionLabel ? (
          <p data-hero-animate className="mb-6 text-sm text-white/50">
            {dict.hero.regionLabel}
          </p>
        ) : null}
        <h1 data-hero-animate className="text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
          {dict.hero.headline}
        </h1>
        <p data-hero-animate className="mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">
          {dict.hero.subheadline}
        </p>
        <div data-hero-animate className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" className="h-12 px-6 hover:bg-electric-purple">
            <a href="#cta">{dict.hero.primaryCta}</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 px-6 bg-transparent border-white/20 text-white hover:border-white/40 hover:bg-transparent hover:text-white">
            <a href="#cta">{dict.hero.secondaryCta}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify it compiles and lints**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 3: Visually confirm both locales**

Run: `npm run dev`
- Open `http://localhost:3000/pt` — expect the cities line ("São Gonçalo do Sapucaí · Varginha · Pouso Alegre · Santa Rita do Sapucaí") between eyebrow and headline, included in the GSAP stagger entrance.
- Open `http://localhost:3000/` (still English at this point — routing swap is Task 7) — expect no region line (English hero unchanged).

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/hero.tsx
git commit -m "feat: render regional cities line in Hero when present"
```

---

### Task 7: Swap default locale routing (PT → `/`, EN → `/en`, dormant)

**Files:**
- Move: `src/app/(pt)/pt/page.tsx` → `src/app/(pt)/page.tsx`
- Move: `src/app/(en)/page.tsx` → `src/app/(en)/en/page.tsx`
- Modify: `src/app/(pt)/layout.tsx`
- Modify: `src/app/(en)/layout.tsx`
- Modify: `src/data/dictionaries/pt.ts` (nav only)
- Modify: `src/data/dictionaries/en.ts` (nav only)
- Modify: `src/lib/i18n.ts`
- Modify: `CLAUDE.md`

**Interfaces:**
- Consumes: `COMPANY` (Task 1).
- Produces: `/` serves the PT homepage, `/en` serves the EN homepage (noindex).

- [ ] **Step 1: Move the PT page to the group root**

```bash
git mv "src/app/(pt)/pt/page.tsx" "src/app/(pt)/page.tsx"
```

Edit the moved `src/app/(pt)/page.tsx` — change `homeHref` from `"/pt"` to `"/"`:

```tsx
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/hero/hero";
import { Positioning } from "@/components/sections/positioning";
import { Tiers } from "@/components/sections/tiers";
import { Capabilities } from "@/components/services/capabilities";
import { pt } from "@/data/dictionaries/pt";

export default function PortugueseHome() {
  return (
    <main>
      <SiteHeader dict={pt} homeHref="/" />
      <Hero dict={pt} />
      <Positioning dict={pt} />
      <Tiers dict={pt} />
      <Capabilities dict={pt} />
    </main>
  );
}
```

- [ ] **Step 2: Move the EN page under `/en`**

```bash
git mv "src/app/(en)/page.tsx" "src/app/(en)/en/page.tsx"
```

Edit the moved `src/app/(en)/en/page.tsx` — change `homeHref` from `"/"` to `"/en"`:

```tsx
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/hero/hero";
import { Positioning } from "@/components/sections/positioning";
import { Capabilities } from "@/components/services/capabilities";
import { en } from "@/data/dictionaries/en";

export default function EnglishHome() {
  return (
    <main>
      <SiteHeader dict={en} homeHref="/en" />
      <Hero dict={en} />
      <Positioning dict={en} />
      <Capabilities dict={en} />
    </main>
  );
}
```

- [ ] **Step 3: Update the locale switch links in both dictionaries**

In `src/data/dictionaries/pt.ts`, change only `nav.localeSwitchHref` from `"/"` to `"/en"` (label stays `"EN"`).

In `src/data/dictionaries/en.ts`, change only `nav.localeSwitchHref` from `"/pt"` to `"/"` (label stays `"PT"`).

- [ ] **Step 4: Update PT layout metadata (now the primary landing page)**

Edit `src/app/(pt)/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "../globals.css";
import { COMPANY } from "@/lib/constants";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  title: {
    default: "Adalberto Business | Engenharia de Software no Sul de Minas",
    template: "%s | Adalberto Business"
  },
  description:
    "Engenharia de software para empresas de pequeno a grande porte em São Gonçalo do Sapucaí, Varginha, Pouso Alegre e Santa Rita do Sapucaí — Sul de Minas.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png"
  },
  openGraph: {
    title: "Adalberto Business | Engenharia de Software no Sul de Minas",
    description:
      "Engenharia de software para empresas de pequeno a grande porte em São Gonçalo do Sapucaí, Varginha, Pouso Alegre e Santa Rita do Sapucaí — Sul de Minas.",
    url: COMPANY.website,
    siteName: "Adalberto Business",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/og-image-pt.png", width: 1200, height: 630, alt: "Adalberto Business" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Adalberto Business | Engenharia de Software no Sul de Minas",
    description:
      "Engenharia de software para empresas de pequeno a grande porte em São Gonçalo do Sapucaí, Varginha, Pouso Alegre e Santa Rita do Sapucaí — Sul de Minas.",
    images: ["/og-image-pt.png"]
  },
  alternates: {
    canonical: "/",
    languages: { pt: "/", en: "/en" }
  }
};

export default function PortugueseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-near-black font-sans antialiased`}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Update EN layout metadata (now dormant, noindex)**

Edit `src/app/(en)/layout.tsx` — update `alternates` and `openGraph.url`, and add `robots`:

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "../globals.css";
import { COMPANY } from "@/lib/constants";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  title: {
    default: "Adalberto Business | Software Engineering Partner",
    template: "%s | Adalberto Business"
  },
  description:
    "Experienced software engineering teams for businesses that need to deliver, modernize and scale digital products.",
  robots: {
    index: false,
    follow: false
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-icon.png"
  },
  openGraph: {
    title: "Adalberto Business | Software Engineering Partner",
    description:
      "Experienced software engineering teams for businesses that need to deliver, modernize and scale digital products.",
    url: `${COMPANY.website}/en`,
    siteName: "Adalberto Business",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Adalberto Business" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Adalberto Business | Software Engineering Partner",
    description:
      "Experienced software engineering teams for businesses that need to deliver, modernize and scale digital products.",
    images: ["/og-image.png"]
  },
  alternates: {
    canonical: "/en",
    languages: { pt: "/", en: "/en" }
  }
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-near-black font-sans antialiased`}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Update the default locale constant**

Edit `src/lib/i18n.ts`:

```ts
export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";
```

- [ ] **Step 7: Update CLAUDE.md's now-outdated bilingual routing note**

In `CLAUDE.md`, under "Regras específicas deste repositório", replace:

```
- Site é bilíngue: inglês em `/` (padrão), português em `/pt`. Páginas legais (`/politica-de-privacidade`, `/termos-de-uso`) permanecem só em português.
```

with:

```
- Site é bilíngue: português em `/` (padrão, foco regional Sul de Minas), inglês em `/en` (oferta internacional secundária, `noindex` por enquanto). Páginas legais (`/politica-de-privacidade`, `/termos-de-uso`) permanecem só em português.
```

- [ ] **Step 8: Verify the build and both routes**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: build succeeds with `/` and `/en` as generated routes (no `/pt` route in the build output).

Run: `npm run dev`
- Open `http://localhost:3000/` → expect the PT regional homepage (hero eyebrow "Parceiro de Engenharia de Software · Sul de Minas", cities line, Tiers section).
- Open `http://localhost:3000/en` → expect the English homepage, unchanged content.
- Open `http://localhost:3000/pt` → expect a 404 (old path no longer exists — this is intentional per the spec, no redirect for now).
- View source on `/en` and confirm a `<meta name="robots" content="noindex, nofollow">` tag is present.

- [ ] **Step 9: Commit**

```bash
git add "src/app/(pt)/page.tsx" "src/app/(en)/en/page.tsx" "src/app/(pt)/layout.tsx" "src/app/(en)/layout.tsx" src/data/dictionaries/pt.ts src/data/dictionaries/en.ts src/lib/i18n.ts CLAUDE.md
git commit -m "feat: swap default locale routing — PT at / (primary), EN at /en (dormant, noindex)"
```

---

### Task 8: Add regional structured data (JSON-LD)

**Files:**
- Create: `src/components/seo/local-business-jsonld.tsx`
- Modify: `src/app/(pt)/layout.tsx`

**Interfaces:**
- Consumes: `COMPANY` (Task 1, including `regionCities`).
- Produces: `<LocalBusinessJsonLd />` — a Server Component rendered once, inside the PT layout body.

- [ ] **Step 1: Create the structured data component**

Create `src/components/seo/local-business-jsonld.tsx`:

```tsx
import { COMPANY } from "@/lib/constants";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: COMPANY.tradeName,
    url: COMPANY.website,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: COMPANY.cityState.split(" - ")[0],
      addressRegion: "MG",
      addressCountry: "BR"
    },
    areaServed: COMPANY.regionCities.map((city) => ({
      "@type": "City",
      name: city
    }))
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: Render it in the PT layout**

Edit `src/app/(pt)/layout.tsx` — import and render `<LocalBusinessJsonLd />` as the first child inside `<body>`, before `<MotionConfig>`:

```tsx
import { LocalBusinessJsonLd } from "@/components/seo/local-business-jsonld";
// ...other imports unchanged

export default function PortugueseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-near-black font-sans antialiased`}>
        <LocalBusinessJsonLd />
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify it compiles and lints**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors (the `eslint-disable-next-line` comment suppresses the expected `dangerouslySetInnerHTML` warning for this one legitimate JSON-LD use).

- [ ] **Step 4: Verify the structured data is valid JSON and renders**

Run: `npm run dev`, open `http://localhost:3000/`, view page source, and find the `<script type="application/ld+json">` tag. Copy its contents into a local scratch file (e.g. `ldjson-check.json`, anywhere outside the repo) and validate:

```bash
node -e "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')); console.log('valid JSON')" ldjson-check.json
```

Expected: prints `valid JSON`, and the parsed object's `areaServed` has exactly the 4 cities from `COMPANY.regionCities` (eyeball the copied content — `name`, `phone`, `email` should match `COMPANY`).

- [ ] **Step 5: Commit**

```bash
git add src/components/seo/local-business-jsonld.tsx "src/app/(pt)/layout.tsx"
git commit -m "feat: add ProfessionalService structured data for regional SEO"
```

---

### Task 9: Google Ads / Analytics readiness scaffold (inert by default)

**Files:**
- Create: `.env.example`
- Create: `src/components/analytics.tsx`
- Modify: `src/app/(pt)/layout.tsx`
- Modify: `src/app/(en)/layout.tsx`

**Interfaces:**
- Produces: `<Analytics />` — a Server Component that renders nothing unless `process.env.NEXT_PUBLIC_GTAG_ID` is set — consumed by both layouts.

- [ ] **Step 1: Document the env var**

Create `.env.example`:

```
# Google Ads / Analytics conversion tracking.
# Leave empty until tracking is actually launched — LGPD requires the
# privacy policy to describe cookie use accurately, so don't set this
# in production until that policy update ships alongside it.
NEXT_PUBLIC_GTAG_ID=
```

- [ ] **Step 2: Create the Analytics component**

Create `src/components/analytics.tsx`:

```tsx
import Script from "next/script";

export function Analytics() {
  const gtagId = process.env.NEXT_PUBLIC_GTAG_ID;
  if (!gtagId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtagId}');
        `}
      </Script>
    </>
  );
}
```

- [ ] **Step 3: Wire it into both layouts**

In `src/app/(pt)/layout.tsx`, import `Analytics` and render it right after `<LocalBusinessJsonLd />`:

```tsx
import { Analytics } from "@/components/analytics";
// ...

        <LocalBusinessJsonLd />
        <Analytics />
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
```

In `src/app/(en)/layout.tsx`, import `Analytics` and render it as the first child inside `<body>`:

```tsx
import { Analytics } from "@/components/analytics";
// ...

      <body className={`${geistSans.variable} ${geistMono.variable} bg-near-black font-sans antialiased`}>
        <Analytics />
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
```

- [ ] **Step 4: Verify it compiles and lints**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 5: Verify it stays inert with no env var set**

Run: `npm run dev` (with no `NEXT_PUBLIC_GTAG_ID` in `.env.local` — it shouldn't exist yet), open `http://localhost:3000/`, view page source.
Expected: no `googletagmanager.com` script tag present anywhere on the page.

- [ ] **Step 6: Commit**

```bash
git add .env.example src/components/analytics.tsx "src/app/(pt)/layout.tsx" "src/app/(en)/layout.tsx"
git commit -m "feat: add inert Google Ads/Analytics readiness scaffold"
```

---

### Task 10: Final verification pass

**Files:** none (verification only; fix-forward if issues are found).

- [ ] **Step 1: Full type-check, lint, and build**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all three succeed with no errors or warnings.

- [ ] **Step 2: Responsive check on `/` (PT, primary)**

Run: `npm run dev`, open `http://localhost:3000/` in the browser devtools responsive mode, check at each width: 320, 375, 390, 768, 1024, 1440, 1920px.
Expected: Hero, region line, Positioning, Tiers (1 col → 2 col → 3 col grid) and Capabilities (1 col → 2 col → 4 col grid) all reflow cleanly, no horizontal scroll, no overlapping text.

- [ ] **Step 3: Keyboard and reduced-motion check**

- Tab through the header nav, Tiers cards, and Capabilities cards on `/` — confirm each card's focus-visible outline is reachable and visible (the existing `focus-within:border-white/40` / `motion-safe:focus-within:-translate-y-1` classes, unchanged by the CardGrid extraction).
- In devtools, emulate `prefers-reduced-motion: reduce`, reload `/` — confirm the Hero/Positioning GSAP entrance animations no longer animate (content still appears, just without motion).

- [ ] **Step 4: Confirm success criteria from the spec**

Open `http://localhost:3000/` and confirm, within a few seconds of reading:
1. The site names the Sul de Minas region (cities line + positioning body).
2. It's clear the company serves any company size (Tiers section).
3. There's a credible technical root (Vale da Eletrônica mention in the hero subheadline, Capabilities section).
4. There's an obvious way to start a conversation (primary/secondary CTA buttons scrolling to `#cta`, WhatsApp reachable via `COMPANY.whatsappUrl` in `constants.ts`).

- [ ] **Step 5: Fix forward if anything fails**

If any check in Steps 1-4 fails, fix the specific issue in the relevant component/file from the earlier tasks and re-run the failing check. Do not proceed to Step 6 until all checks pass.

- [ ] **Step 6: Final commit (only if fixes were made in Step 5)**

```bash
git add -A
git commit -m "fix: address final verification findings for regional repositioning"
```
