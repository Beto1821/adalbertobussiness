# Positioning & Capabilities Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Positioning (spec §7) and Capabilities (spec §8) sections below the Hero on both `/` and `/pt`, with real content grounded in the site owner's actual professional background (no fabricated client work), GSAP scroll-reveal on Positioning, and Framer Motion hover microinteractions on the four Capability cards (the first real use of Framer Motion in this codebase).

**Architecture:** Same pattern as the Hero: dictionary-driven content (`Dictionary` type extended with `positioning`/`capabilities`), one Server/Client component pair per section, wired into the existing `(en)/page.tsx` and `(pt)/pt/page.tsx`. Framer Motion gets a project-wide reduced-motion guard (`MotionConfig reducedMotion="user"`) added once at the locale layouts, so every future Framer Motion usage inherits it automatically instead of each component re-implementing the check GSAP components do manually.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger (new: first scroll-triggered animation in this codebase), Framer Motion (new: first usage — already installed, unused until now).

**Spec:** `ADALBERTO_BUSINESS_SITE_PLAN.md` §7 (Positioning), §8 (Capabilities)

## Global Constraints

- **Content honesty (spec §24, confirmed with the site owner this session):** Capability descriptions may name real employers/engagements as background credibility (`Proconect`, `CRM DataCrazy`, `Scale AI` are all confirmed real, current or recent professional experience) — but never phrase them as if they were "Adalberto Business" client deliverables. "Dedicated Teams" honestly reflects a real network of consultants/partners across multiple stacks (confirmed this session) — do not invent specific named colleagues without further authorization (spec §12: "não expor dados pessoais dos profissionais sem autorização" — out of scope for this plan, which contains no named third parties).
- **Never commit to `main`.** Work happens on `develop` and a `feature/*` branch off it, exactly as the Foundation & Setup plan did.
- **No new dependencies.** GSAP, `gsap/ScrollTrigger`, and `framer-motion` are already installed (Foundation & Setup plan, Task 5) — this plan only starts using Framer Motion for the first time, it does not install anything.
- **All motion must respect `prefers-reduced-motion`** — GSAP components check `window.matchMedia` manually (established pattern from the Hero); Framer Motion gets the equivalent via `MotionConfig reducedMotion="user"` wrapping the locale layouts' children, so `whileHover`/`whileTap` etc. automatically no-op for users who request reduced motion.
- **Avoid excess cards/icons/gradients** (spec §25) — four plain bordered cards, no icon library usage, no gradient fills.
- **Server Components by default; Client Components only where interactivity/animation requires it** (Positioning and Capabilities both need client-side animation, same as Hero).
- **Verification gates** (no automated test suite in this project, by design): `npx tsc --noEmit`, `npm run lint`, `npm run build`, plus a manual visual QA checkpoint (Task 6) using `npx playwright screenshot --channel chrome` against system Chrome — the same tool proven to work in the Foundation & Setup plan, no new dependency.
- **Anchor consistency:** every Capability card's CTA links to `#cta` — the nav's "Contact" item and the Hero's own CTAs already point there (spec's final CTA section, not yet built). Do not introduce a different anchor.

---

### Task 1: Git branch

**Files:** none (git operations only)

**Interfaces:**
- Produces: `feature/positioning-capabilities` branch off `develop`, current tip `00ff86b` (the commit `develop` was merged to at the end of the Foundation & Setup plan).

- [ ] **Step 1: Confirm clean state and branch**

```bash
git status
git checkout develop
git pull
git checkout -b feature/positioning-capabilities develop
```

Expected: working tree clean before branching; `git branch --show-current` reports `feature/positioning-capabilities` afterward.

---

### Task 2: Extend the `Dictionary` type and content

**Files:**
- Modify: `src/data/dictionaries/types.ts`
- Modify: `src/data/dictionaries/en.ts`
- Modify: `src/data/dictionaries/pt.ts`

**Interfaces:**
- Produces: `dict.positioning.{eyebrow,title,body}` and `dict.capabilities.{eyebrow,title,items[].{title,description,cta,href}}`, consumed by Task 4 (Positioning component) and Task 5 (Capabilities component).

- [ ] **Step 1: Extend `src/data/dictionaries/types.ts`**

Add these two fields to the existing `Dictionary` type (keep `nav` and `hero` exactly as they are):

```ts
export type Dictionary = {
  nav: {
    items: { label: string; href: string }[];
    localeSwitchLabel: string;
    localeSwitchHref: string;
  };
  hero: {
    eyebrow: string;
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

- [ ] **Step 2: Add to `src/data/dictionaries/en.ts`**

Add these two top-level fields to the existing `en` object (keep `nav` and `hero` exactly as they are):

```ts
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
```

- [ ] **Step 3: Add to `src/data/dictionaries/pt.ts`**

Add these two top-level fields to the existing `pt` object (keep `nav` and `hero` exactly as they are; the four capability titles stay in English — the spec itself names them in English even in its otherwise-Portuguese text, and follows this codebase's established convention of dropping accents from new Portuguese copy):

```ts
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
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: no errors (both dictionaries must satisfy the extended `Dictionary` type).

- [ ] **Step 5: Commit**

```bash
git add src/data/dictionaries/types.ts src/data/dictionaries/en.ts src/data/dictionaries/pt.ts
git commit -m "feat: add Positioning and Capabilities content to EN/PT dictionaries"
```

---

### Task 3: Reduced-motion guard for Framer Motion

**Files:**
- Modify: `src/app/(en)/layout.tsx`
- Modify: `src/app/(pt)/layout.tsx`

**Interfaces:**
- Produces: every Framer Motion component rendered under these two layouts automatically respects `prefers-reduced-motion`, consumed by Task 5 (Capabilities cards) and any future Framer Motion usage.
- Consumes: `framer-motion`'s `MotionConfig` export (already installed).

- [ ] **Step 1: Wrap `children` in `MotionConfig` in `src/app/(en)/layout.tsx`**

Add the import and wrap only the `{children}` expression inside `<body>` — do not change anything else in this file (fonts, metadata, `<html>` tag stay exactly as they are):

```tsx
import { MotionConfig } from "framer-motion";
```

```tsx
      <body className={`${geistSans.variable} ${geistMono.variable} bg-near-black font-sans antialiased`}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
```

- [ ] **Step 2: Same change in `src/app/(pt)/layout.tsx`**

Identical import and wrap.

- [ ] **Step 3: Do NOT touch `src/app/(legal)/layout.tsx`**

The legal pages don't use Framer Motion and are out of scope for this plan.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit && npm run build`
Expected: both succeed (the app still has no Framer Motion component consuming this yet — this step only confirms the wrapper itself compiles and doesn't break the existing Hero/Header render).

- [ ] **Step 5: Commit**

```bash
git add "src/app/(en)/layout.tsx" "src/app/(pt)/layout.tsx"
git commit -m "feat: wrap locale layouts in MotionConfig for reduced-motion-aware Framer Motion"
```

---

### Task 4: Positioning component

**Files:**
- Create: `src/components/sections/positioning.tsx`

**Interfaces:**
- Consumes: `Dictionary` (`dict.positioning`), `gsap` + `gsap/ScrollTrigger`, design tokens (`bg-near-black`, `text-electric-purple`).
- Produces: `Positioning({ dict })`, consumed by Task 6.

- [ ] **Step 1: `src/components/sections/positioning.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Dictionary } from "@/data/dictionaries/types";

gsap.registerPlugin(ScrollTrigger);

export function Positioning({ dict }: { dict: Dictionary }) {
  const scopeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !scopeRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-reveal]",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: scopeRef.current,
            start: "top 80%"
          }
        }
      );
    }, scopeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={scopeRef} id="positioning" className="border-t border-white/10 bg-near-black px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <p data-reveal className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-purple">
          {dict.positioning.eyebrow}
        </p>
        <h2 data-reveal className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
          {dict.positioning.title}
        </h2>
        <p data-reveal className="mt-6 text-lg text-white/70">
          {dict.positioning.body}
        </p>
      </div>
    </section>
  );
}
```

(`gsap.context` + `ctx.revert()` is the React-safe cleanup pattern for `ScrollTrigger` — it removes the ScrollTrigger instance on unmount, unlike the plain `tween.kill()` pattern the Hero uses for its simpler on-mount animation.)

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/positioning.tsx
git commit -m "feat: add Positioning section with GSAP scroll-reveal"
```

---

### Task 5: Capabilities component

**Files:**
- Create: `src/components/services/capabilities.tsx`

**Interfaces:**
- Consumes: `Dictionary` (`dict.capabilities`), `framer-motion` (`motion`), design tokens.
- Produces: `Capabilities({ dict })`, consumed by Task 6.

- [ ] **Step 1: `src/components/services/capabilities.tsx`**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary } from "@/data/dictionaries/types";

export function Capabilities({ dict }: { dict: Dictionary }) {
  return (
    <section id="capabilities" className="border-t border-white/10 bg-near-black px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-purple">
            {dict.capabilities.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
            {dict.capabilities.title}
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.capabilities.items.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.4)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex flex-col rounded-lg border border-white/15 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{item.description}</p>
              <Link href={item.href} className="mt-6 text-sm font-semibold text-electric-purple hover:text-white">
                {item.cta} →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

(No icon library usage, no gradients, one border-and-lift microinteraction per spec §25's "avoid excess icons/gradients/cards" — `whileHover` automatically no-ops under `MotionConfig reducedMotion="user"` from Task 3.)

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/services/capabilities.tsx
git commit -m "feat: add Capabilities section with Framer Motion hover cards"
```

---

### Task 6: Wire into both homepages + visual QA checkpoint

**Files:**
- Modify: `src/app/(en)/page.tsx`
- Modify: `src/app/(pt)/pt/page.tsx`

**Interfaces:**
- Consumes: `Positioning` (Task 4), `Capabilities` (Task 5), `en`/`pt` dictionaries (Task 2).

- [ ] **Step 1: `src/app/(en)/page.tsx`**

```tsx
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/hero/hero";
import { Positioning } from "@/components/sections/positioning";
import { Capabilities } from "@/components/services/capabilities";
import { en } from "@/data/dictionaries/en";

export default function EnglishHome() {
  return (
    <main>
      <SiteHeader dict={en} homeHref="/" />
      <Hero dict={en} />
      <Positioning dict={en} />
      <Capabilities dict={en} />
    </main>
  );
}
```

- [ ] **Step 2: `src/app/(pt)/pt/page.tsx`**

```tsx
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/hero/hero";
import { Positioning } from "@/components/sections/positioning";
import { Capabilities } from "@/components/services/capabilities";
import { pt } from "@/data/dictionaries/pt";

export default function PortugueseHome() {
  return (
    <main>
      <SiteHeader dict={pt} homeHref="/pt" />
      <Hero dict={pt} />
      <Positioning dict={pt} />
      <Capabilities dict={pt} />
    </main>
  );
}
```

- [ ] **Step 3: Full verification**

Run: `npx tsc --noEmit && npm run lint && npm run build`
Expected: all three succeed with no errors.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(en)/page.tsx" "src/app/(pt)/pt/page.tsx"
git commit -m "feat: wire Positioning and Capabilities into EN/PT homepages"
```

- [ ] **Step 5: Visual QA checkpoint**

Start the dev server (`npm run dev &`, poll `curl -sf http://localhost:3000`, don't sleep-guess) and use `npx --no-install playwright screenshot --channel chrome` (system Chrome, proven to work in this environment, no project dependency needed) to actually render and Read (as images) both `/` and `/pt` at 375px and 1440px. Confirm:
- Positioning text is legible, not overlapping the Hero above it, reveals on scroll into view (a screenshot after scrolling past the fold, or with `--wait-for-timeout` long enough for the page to have painted, should show it already visible since `ScrollTrigger`'s default trigger fires once the section enters the viewport — if you scroll the viewport down via a second screenshot at a larger `--viewport-size` height or by checking computed opacity, confirm it isn't stuck at `opacity: 0`).
- All four Capability cards render in a 4-column grid on desktop (1440px) and stack to fewer columns on mobile (375px), each with title, description, and CTA link visible, no text overflow.
- Emulate `prefers-reduced-motion: reduce` (if your screenshot tooling supports it, otherwise verify by reading the code paths) and confirm Positioning's text is immediately visible (not stuck at `opacity: 0` from the GSAP `fromTo` never running).

Stop the dev server when done.

- [ ] **Step 6: Push**

```bash
git push -u origin feature/positioning-capabilities
```
