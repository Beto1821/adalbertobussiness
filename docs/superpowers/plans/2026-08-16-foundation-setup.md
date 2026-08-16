# Adalberto Business — Foundation & Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Take the current MEI-validation landing page (Next.js 15 / React 19, single monolithic page, plain CSS) to the point described in `ADALBERTO_BUSINESS_SITE_PLAN.md` §30 steps 3–9: dependencies installed, design tokens defined, a bilingual (EN default / PT) routing skeleton in place, and a working Header + Hero ready for the first visual review — without touching production deploy.

**Architecture:** Bilingual routing via Next.js "multiple root layouts" (route groups `(en)`, `(pt)`, `(legal)`, each with its own `<html lang>`), Tailwind CSS v4 (`@theme`-based tokens, no `tailwind.config.ts`), shadcn/ui for primitives (`Button`), GSAP for the Hero entrance, Framer Motion reserved for later micro-interaction phases, content sourced from per-locale dictionaries in `src/data/dictionaries/`. All company legal/compliance data (CNPJ, razão social, etc.) moves from `src/lib/company.ts` to `src/lib/constants.ts` unchanged in value, matching the target file structure in §5 of the spec.

**Tech Stack:** Next.js 15.3, React 19, TypeScript 5.8 (already installed) + Tailwind CSS v4, shadcn/ui, lucide-react, gsap, framer-motion (new installs this plan).

**Spec:** `ADALBERTO_BUSINESS_SITE_PLAN.md` (repo root)

## Global Constraints

- **Stack is locked:** Next.js + TypeScript + Tailwind CSS + GSAP + Framer Motion + shadcn/ui + Lucide Icons. Do not add other UI/animation libraries (spec §3, §29).
- **No backend in this phase** (spec §3).
- **Do not modify `next.config.ts` or `.github/workflows/deploy.yml` in this plan.** `output: "export"` and the Hostinger FTP/gh-pages pipeline stay exactly as-is until the Production phase (spec §4, §29 — user decision: migrate to Vercel only at final launch).
- **Never commit to `main`.** `main` auto-deploys to the live Hostinger site on every push (`.github/workflows/deploy.yml`). All work in this plan happens on `develop` and a `feature/*` branch off it, per the spec's own git workflow (§23).
- **Bilingual site:** English is the default locale at `/`; Portuguese is mirrored at `/pt` (user decision, this session). Legal pages (`/politica-de-privacidade`, `/termos-de-uso`) stay Portuguese-only regardless of visitor locale — they are compliance documents tied to a Brazilian CNPJ, not marketing copy.
- **Legal/company data is preserved, not removed.** CNPJ, razão social, phone, e-mail, etc. (currently in `src/lib/company.ts`) must keep their exact values. Do not invent client content or results (spec §24).
- **TypeScript strict** (already enabled in `tsconfig.json` — do not weaken it).
- **Server Components by default; Client Components only where interactivity requires it** (mobile menu toggle, GSAP DOM animation) — spec §18, §24.
- **All motion must respect `prefers-reduced-motion`** (spec §21).
- **No automated test suite exists in this repo, and the spec's own QA process is manual per-phase review** ("executar → visualizar → testar → revisar → commit", §22) — not unit tests. Every task below is verified with `npm run dev` (manual browser check), `npx tsc --noEmit`, `npm run lint`, and `npm run build`, instead of a test framework. Do not introduce a test runner in this plan — out of scope and not requested by the spec.
- **PT copy in this codebase consistently drops accents** (e.g. "Servicos", "Duvidas" in the existing pages/README) — match that existing convention in new PT dictionary content for consistency.
- **Avoid:** dashboards, excessive cards/gradients/icons, stock photography, generic corporate copy, exaggerated animation (spec §25).

---

### Task 1: Git branch safety net

**Files:** none (git operations only)

**Interfaces:**
- Produces: a `develop` branch and a `feature/site-foundation-setup` branch, both off current `main`. All later tasks commit to `feature/site-foundation-setup`. `main` receives zero new commits from this task.

- [ ] **Step 1: Confirm there are no unexpected TRACKED changes**

Run: `git status`
Expected: only untracked entries (e.g. `ADALBERTO_BUSINESS_SITE_PLAN.md`, `docs/`, `.superpowers/`) — no modified/staged tracked files. If a tracked file shows as modified, stop and ask before continuing; do not discard it.

- [ ] **Step 2: Create `develop` from `main` (still carrying the untracked files)**

```bash
git checkout -b develop main
```

(Untracked files are not attached to a branch — they stay in the working directory across this checkout.)

- [ ] **Step 3: Gitignore the SDD scratch workspace, then commit it plus the planning docs onto `develop`**

Append to `.gitignore`:

```
.superpowers/
```

```bash
git add .gitignore ADALBERTO_BUSINESS_SITE_PLAN.md docs
git commit -m "docs: add site redesign spec and foundation/setup implementation plan"
git push -u origin develop
```

(These land on `develop`, never on `main` — `main` stays exactly as it was, still auto-deploying the current live site.)

- [ ] **Step 4: Create the working branch off `develop`**

```bash
git checkout -b feature/site-foundation-setup develop
```

- [ ] **Step 5: Verify branch and remote state**

Run: `git branch -vv` and `git log --oneline -3 main`
Expected: `feature/site-foundation-setup` current; `develop` tracking `origin/develop` with the new docs commit; `main`'s log unchanged (still ends at `f037595 Double hero logo size`).

- [ ] **Step 6: Done**

The docs commit already happened in Step 3 — proceed to Task 2 on `feature/site-foundation-setup`.

---

### Task 2: `CLAUDE.md`

**Files:**
- Create: `CLAUDE.md`

**Interfaces:**
- Produces: project-level guidance file read automatically by Claude Code in this repo going forward.

- [ ] **Step 1: Write `CLAUDE.md`**

```markdown
# CLAUDE.md — Adalberto Business

Guia de trabalho para Claude Code neste repositório. Segue `ADALBERTO_BUSINESS_SITE_PLAN.md` (spec completa) e o plano em `docs/superpowers/plans/`.

## Regras (spec §24)

- Não alterar a arquitetura do projeto sem autorização explícita.
- Não instalar dependências além de: Next.js, TypeScript, Tailwind CSS, GSAP, Framer Motion, shadcn/ui, lucide-react.
- Priorizar Server Components; usar Client Components somente quando houver interatividade real (estado, eventos, animação client-side).
- TypeScript strict sempre ativo — não enfraquecer `tsconfig.json`.
- Reutilizar componentes existentes antes de criar novos.
- Manter acessibilidade: HTML semântico, navegação por teclado, foco visível, `aria-label` quando necessário, `prefers-reduced-motion` respeitado em toda animação.
- Manter performance: Core Web Vitals, imagens otimizadas, lazy loading, evitar JS desnecessário.
- Não criar conteúdo fictício de clientes nem inventar resultados/depoimentos.
- Seguir o design system definido (tokens em `globals.css`) em vez de estilos ad-hoc.
- Testar responsividade nos breakpoints: 320, 375, 390, 768, 1024, 1440, 1920px.
- Explicar mudanças importantes antes/durante a execução.
- Evitar overengineering: sem abstrações além do que a tarefa pede.

## Regras específicas deste repositório

- **Nunca commitar direto em `main`.** `main` faz deploy automático para o Hostinger em produção via `.github/workflows/deploy.yml`. Trabalhar em `develop` e branches `feature/*`.
- **Não alterar `next.config.ts` nem `.github/workflows/deploy.yml`** até a fase de Produção (migração para Vercel), a menos que explicitamente pedido.
- Site é bilíngue: inglês em `/` (padrão), português em `/pt`. Páginas legais (`/politica-de-privacidade`, `/termos-de-uso`) permanecem só em português.
- Dados legais/CNPJ da empresa vivem em `src/lib/constants.ts` (`COMPANY`) — nunca alterar os valores sem confirmação.
- Não existe suite de testes automatizados neste projeto. Verificação é manual: `npm run dev` + revisão visual, mais `npx tsc --noEmit`, `npm run lint` e `npm run build`.
```

- [ ] **Step 2: Verify**

Run: `test -f CLAUDE.md && echo OK`
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add CLAUDE.md with project working rules"
```

---

### Task 3: Tailwind CSS v4

**Files:**
- Modify: `package.json` (new deps)
- Create: `postcss.config.mjs`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: Tailwind utility classes available in all components from this point forward; `@theme` block in `globals.css` that Task 8 (design tokens) extends.

- [ ] **Step 1: Install Tailwind v4**

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

- [ ] **Step 2: Create PostCSS config**

`postcss.config.mjs`:

```js
const config = {
  plugins: ["@tailwindcss/postcss"]
};

export default config;
```

- [ ] **Step 3: Replace `globals.css` with a minimal Tailwind entrypoint**

Replace the entire contents of `src/app/globals.css` with:

```css
@import "tailwindcss";

body {
  min-height: 100dvh;
}
```

(The old hand-rolled CSS — `.site-header`, `.hero`, `.service-grid`, etc. — is dropped here: it belonged to the old homepage layout being replaced. Design tokens are added back in Task 8; new component classes come from Tailwind utilities from here on.)

- [ ] **Step 4: Verify the build still compiles**

Run: `npm run build`
Expected: build succeeds (existing `page.tsx` still references old classNames like `className="section"` — these will render as plain unstyled `div`s until Task 13 rewrites the page; a successful **compile** is what this step checks, not visual correctness).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json postcss.config.mjs src/app/globals.css
git commit -m "feat: install and configure Tailwind CSS v4"
```

---

### Task 4: ESLint flat config

**Files:**
- Create: `eslint.config.mjs`
- Modify: `package.json` (new devDependency if not already present)

**Interfaces:** none consumed/produced beyond `npm run lint` working.

- [ ] **Step 1: Install the Next.js ESLint config package**

```bash
npm install -D eslint eslint-config-next @eslint/eslintrc
```

- [ ] **Step 2: Create `eslint.config.mjs`**

```js
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript")
];

export default eslintConfig;
```

- [ ] **Step 3: Verify lint runs**

Run: `npm run lint`
Expected: exits without a "no config found" error (existing code may report warnings — fix any `error`-level findings; warnings can carry over into later tasks that touch those files).

- [ ] **Step 4: Commit**

```bash
git add eslint.config.mjs package.json package-lock.json
git commit -m "chore: add ESLint flat config for next/core-web-vitals"
```

---

### Task 5: Install GSAP, Framer Motion, Lucide

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: `gsap`, `framer-motion`, `lucide-react` importable from Task 11 (Header icons) and Task 12 (Hero animation) onward.

- [ ] **Step 1: Install**

```bash
npm install gsap framer-motion lucide-react
```

- [ ] **Step 2: Verify**

Run: `node -e "require('gsap'); require('lucide-react'); require('framer-motion'); console.log('OK')"`
Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add gsap, framer-motion and lucide-react"
```

---

### Task 6: shadcn/ui init + Button

**Files:**
- Create: `components.json`
- Create: `src/components/ui/button.tsx` (generated by the CLI)
- Modify: `src/lib/utils.ts` (created by the CLI — `cn` helper)

**Interfaces:**
- Produces: `Button` component at `@/components/ui/button`, consumed by Task 12 (Hero CTAs).
- Consumes: Tailwind config from Task 3 (must run after Tailwind is set up).

- [ ] **Step 1: Run shadcn init**

```bash
npx shadcn@latest init -d
```

If the CLI prompts interactively despite `-d`, answer: TypeScript = yes, style = New York, base color = Neutral, CSS variables = yes, import alias `@/components` and `@/lib/utils` (already configured via `tsconfig.json` `@/*` paths).

- [ ] **Step 2: Add the Button primitive**

```bash
npx shadcn@latest add button
```

- [ ] **Step 3: Verify the files exist**

Run: `test -f components.json && test -f src/components/ui/button.tsx && test -f src/lib/utils.ts && echo OK`
Expected: `OK`

- [ ] **Step 4: Verify the project still builds**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components.json src/components/ui/button.tsx src/lib/utils.ts package.json package-lock.json
git commit -m "feat: initialize shadcn/ui and add Button primitive"
```

---

### Task 7: Restructure company data → `lib/constants.ts`

**Files:**
- Create: `src/lib/constants.ts`
- Delete: `src/lib/company.ts`
- Modify: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/politica-de-privacidade/page.tsx`, `src/app/termos-de-uso/page.tsx` (import path fix — full rewrite of these files happens in Task 10/13, this step only needs them importable without breaking the build in between)

**Interfaces:**
- Consumes: nothing.
- Produces: `COMPANY` object at `@/lib/constants`, exact same shape/values as the old `company` export (`legalName`, `tradeName`, `cnpj`, `phone`, `email`, `cityState`, `domain`, `website`, `whatsappUrl`, `businessHours`). The old `services` array is dropped — it described the previous "automação/CRM" positioning, not the new Capabilities content (spec §8), which is authored fresh in a later phase.

- [ ] **Step 1: Create `src/lib/constants.ts`**

```ts
export const COMPANY = {
  legalName: "67.055.281 ADALBERTO RAMOS RIBEIRO",
  tradeName: "Adalberto Business",
  cnpj: "67.055.281/0001-50",
  phone: "+55 (35) 91019-8999",
  email: "contato@adalbertobussiness.com",
  cityState: "Sao Goncalo do Sapucai - MG",
  domain: "adalbertobussiness.com",
  website: "https://adalbertobussiness.com",
  whatsappUrl: "https://wa.me/5535910198999",
  businessHours: "Segunda a sexta, das 9h as 18h"
};
```

- [ ] **Step 2: Delete the old file**

```bash
rm src/lib/company.ts
```

- [ ] **Step 3: Fix imports in the two legal pages**

In `src/app/politica-de-privacidade/page.tsx` and `src/app/termos-de-uso/page.tsx`, replace:

```ts
import { company } from "@/lib/company";
```

with:

```ts
import { COMPANY } from "@/lib/constants";
```

and replace every `company.` reference in those two files with `COMPANY.` (values are identical, only the identifier changes).

- [ ] **Step 4: Leave `src/app/layout.tsx` and `src/app/page.tsx` importing the old `company` name for now**

Do not fix these two yet — they are fully rewritten in Task 10 and Task 13. Confirm the build still fails only on those two known files:

Run: `npx tsc --noEmit`
Expected: errors only in `src/app/layout.tsx` and `src/app/page.tsx` (`Cannot find module '@/lib/company'`) — no errors elsewhere.

- [ ] **Step 5: Commit**

```bash
git add src/lib/constants.ts src/app/politica-de-privacidade/page.tsx src/app/termos-de-uso/page.tsx
git rm src/lib/company.ts
git commit -m "refactor: move company data from lib/company.ts to lib/constants.ts"
```

---

### Task 8: Design tokens

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: Tailwind utility classes `bg-near-black`, `bg-deep-navy`, `text-off-white`, `text-electric-purple`, `bg-cobalt-blue`, `font-sans`, `font-mono`, consumed by Task 11 (Header) and Task 12 (Hero). Also produces brand-aligned values for shadcn's `--primary`/`--primary-foreground` CSS variables, consumed by Task 12's `Button` usage.
- Consumes: the `@theme` block and `:root` color variables shadcn's init (Task 6) already added to `globals.css` — merge into them rather than duplicating or overwriting unrelated tokens.

- [ ] **Step 1: Open `src/app/globals.css` and locate the `@theme` block**

shadcn's init in Task 6 adds something like `@theme inline { --radius: ...; --color-background: ...; ... }`. Add the following custom tokens **inside that existing block** (do not create a second `@theme` block if one already exists):

```css
--color-near-black: #0a0a0f;
--color-deep-navy: #0d1424;
--color-off-white: #f5f5f3;
--color-electric-purple: #7c3aed;
--color-cobalt-blue: #1d4ed8;

--font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
--font-mono: var(--font-geist-mono), ui-monospace, monospace;
```

If Task 6's init did **not** add an `@theme` block (older/newer CLI behavior), add a new one directly below the `@import "tailwindcss";` line:

```css
@theme {
  --color-near-black: #0a0a0f;
  --color-deep-navy: #0d1424;
  --color-off-white: #f5f5f3;
  --color-electric-purple: #7c3aed;
  --color-cobalt-blue: #1d4ed8;

  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}
```

- [ ] **Step 2: Align shadcn's semantic color variables with the brand palette**

shadcn's init (Task 6) also added a `:root { ... }` block with its own semantic variables (`--primary`, `--primary-foreground`, `--secondary`, etc., as `oklch(...)` values) above the `@theme` block. Find `--primary` and `--primary-foreground` in that `:root` block and replace their values so shadcn's `Button` `default` variant renders in the brand's Cobalt Blue instead of the generated neutral color:

```css
--primary: #1d4ed8;
--primary-foreground: #f5f5f3;
```

Leave every other shadcn-generated variable (`--secondary`, `--muted`, `--radius`, dark-mode overrides, etc.) untouched — only `--primary`/`--primary-foreground` are in scope here.

- [ ] **Step 3: Verify Tailwind picks up the new utilities**

Run: `npm run build`
Expected: build succeeds (utilities are generated on demand — a real usage check happens in Task 11/12, this step just confirms no CSS syntax error).

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add Adalberto Business color and font design tokens"
```

---

### Task 9: Bilingual dictionaries

**Files:**
- Create: `src/data/dictionaries/types.ts`
- Create: `src/data/dictionaries/en.ts`
- Create: `src/data/dictionaries/pt.ts`
- Create: `src/lib/i18n.ts`

**Interfaces:**
- Produces: `Dictionary` type, `en: Dictionary`, `pt: Dictionary`, `locales`, `defaultLocale`, `Locale` — consumed by Task 11 (Header), Task 12 (Hero), Task 13 (page wiring).

- [ ] **Step 1: `src/lib/i18n.ts`**

```ts
export const locales = ["en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
```

- [ ] **Step 2: `src/data/dictionaries/types.ts`**

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
};
```

- [ ] **Step 3: `src/data/dictionaries/en.ts`**

```ts
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
  }
};
```

- [ ] **Step 4: `src/data/dictionaries/pt.ts`**

```ts
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
  }
};
```

- [ ] **Step 5: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no new errors introduced by these four files (the two known pre-existing errors from Task 7 Step 4 still stand until Task 10).

- [ ] **Step 6: Commit**

```bash
git add src/lib/i18n.ts src/data/dictionaries
git commit -m "feat: scaffold EN/PT content dictionaries"
```

---

### Task 10: Multi-root-layout routing restructure

**Files:**
- Create: `src/app/(en)/layout.tsx`
- Create: `src/app/(pt)/layout.tsx`
- Create: `src/app/(legal)/layout.tsx`
- Move: `src/app/page.tsx` → `src/app/(en)/page.tsx`
- Move: `src/app/politica-de-privacidade/page.tsx` → `src/app/(legal)/politica-de-privacidade/page.tsx`
- Move: `src/app/termos-de-uso/page.tsx` → `src/app/(legal)/termos-de-uso/page.tsx`
- Create: `src/app/(pt)/pt/page.tsx`
- Delete: `src/app/layout.tsx` (replaced by the three group layouts — Next.js requires the root `app/layout.tsx` to NOT exist when using multiple root layouts via route groups)

**Interfaces:**
- Consumes: `COMPANY` (Task 7), Geist fonts (installed with Next.js, no new package needed), the `--font-sans`/`--font-mono` CSS custom property names already wired into `src/app/globals.css`'s `@theme inline` block by shadcn's init (Task 6) and Task 8. shadcn's scaffold maps Tailwind's `font-sans` utility via `--font-sans: var(--font-sans);` (self-referential — expects something to set the literal `--font-sans` custom property) and Task 8 added `--font-mono: var(--font-geist-mono), ui-monospace, monospace;`. This is why the Geist loader below uses `variable: "--font-sans"` (not `--font-geist-sans`) for Geist Sans — it must match shadcn's existing mapping exactly — while the Geist Mono loader keeps `variable: "--font-geist-mono"` to match Task 8's already-committed token. Do not "fix" this asymmetry — it's intentional, matching what's already committed in `globals.css`.
- Produces: three working routes — `/` (English, `lang="en"`), `/pt` (Portuguese, `lang="pt"`), `/politica-de-privacidade` + `/termos-de-uso` (Portuguese, `lang="pt"`). Task 13 fills in `(en)/page.tsx` and `(pt)/pt/page.tsx` with real Header+Hero content; this task only needs them to render *something* valid.

- [ ] **Step 1: Create the three route group directories and move files**

```bash
mkdir -p "src/app/(en)" "src/app/(pt)/pt" "src/app/(legal)"
git mv src/app/page.tsx "src/app/(en)/page.tsx"
git mv src/app/politica-de-privacidade "src/app/(legal)/politica-de-privacidade"
git mv src/app/termos-de-uso "src/app/(legal)/termos-de-uso"
```

- [ ] **Step 2: `src/app/(en)/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  alternates: {
    canonical: "/",
    languages: { en: "/", pt: "/pt" }
  }
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-near-black font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: `src/app/(pt)/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { COMPANY } from "@/lib/constants";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website),
  title: {
    default: "Adalberto Business | Parceiro de Engenharia de Software",
    template: "%s | Adalberto Business"
  },
  description: "Equipes de engenharia de software experientes para empresas que precisam entregar, modernizar e escalar produtos digitais.",
  alternates: {
    canonical: "/pt",
    languages: { en: "/", pt: "/pt" }
  }
};

export default function PortugueseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-near-black font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: `src/app/(legal)/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { COMPANY } from "@/lib/constants";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.website)
};

export default function LegalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-off-white font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Remove the old root layout**

```bash
git rm src/app/layout.tsx
```

- [ ] **Step 6: Create `src/app/(pt)/pt/page.tsx` as a placeholder (real content in Task 13)**

```tsx
export default function PortugueseHome() {
  return <main />;
}
```

- [ ] **Step 7: Verify all four routes resolve**

Run: `npm run dev`, then in a browser check:
- `http://localhost:3000/` — loads (old Header/Hero markup, unstyled — expected, Task 13 replaces it)
- `http://localhost:3000/pt` — loads empty `<main>`
- `http://localhost:3000/politica-de-privacidade` — loads with `lang="pt"` (check via devtools `<html>` tag)
- `http://localhost:3000/termos-de-uso` — loads with `lang="pt"`

Expected: no Next.js routing error ("You cannot have two parallel pages that resolve to the same path" or similar) in the terminal or browser.

- [ ] **Step 8: Verify build**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors (the `(en)/page.tsx` file still imports the now-deleted `@/lib/company` — fix that import now, same mechanical rename as Task 7 Step 3, since this file is being kept temporarily until Task 13):

In `src/app/(en)/page.tsx`, replace `import { company, services } from "@/lib/company";` with `import { COMPANY } from "@/lib/constants";` and replace all `company.` with `COMPANY.`; delete the `services.map(...)` block and its surrounding `<section id="servicos">` (the old Serviços section — `services` no longer exists, and this content is superseded by Capabilities in a later phase).

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "refactor: split into (en)/(pt)/(legal) route groups for bilingual routing"
```

---

### Task 11: Header + MobileNav components

**Files:**
- Create: `src/components/layout/site-header.tsx`
- Create: `src/components/navigation/mobile-nav.tsx`

**Interfaces:**
- Consumes: `Dictionary` (Task 9), design tokens (Task 8).
- Produces: `SiteHeader({ dict, homeHref })`, consumed by Task 13.

- [ ] **Step 1: `src/components/navigation/mobile-nav.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { Dictionary } from "@/data/dictionaries/types";

export function MobileNav({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-center text-white"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open ? (
        <div id="mobile-nav-panel" className="fixed inset-x-0 top-16 border-b border-white/10 bg-near-black px-6 py-6">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {dict.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white/80"
              >
                {item.label}
              </a>
            ))}
            <Link
              href={dict.nav.localeSwitchHref}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-white/50"
            >
              {dict.nav.localeSwitchLabel}
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 2: `src/components/layout/site-header.tsx`**

```tsx
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/data/dictionaries/types";
import { MobileNav } from "@/components/navigation/mobile-nav";

export function SiteHeader({ dict, homeHref }: { dict: Dictionary; homeHref: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-near-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={homeHref} aria-label="Adalberto Business" className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={36} height={36} priority className="rounded-sm" />
          <span className="text-sm font-semibold tracking-wide text-white">ADALBERTO BUSINESS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {dict.nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <Link href={dict.nav.localeSwitchHref} className="text-sm font-medium text-white/50 hover:text-white">
            {dict.nav.localeSwitchLabel}
          </Link>
        </nav>

        <MobileNav dict={dict} />
      </div>
    </header>
  );
}
```

(`alt=""` on the logo image because the adjacent text `ADALBERTO BUSINESS` already names the brand — an image and adjacent text both announcing the same name is redundant for screen readers.)

- [ ] **Step 3: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/site-header.tsx src/components/navigation/mobile-nav.tsx
git commit -m "feat: add SiteHeader and MobileNav components"
```

---

### Task 12: Hero component

**Files:**
- Create: `src/components/hero/hero.tsx`

**Interfaces:**
- Consumes: `Dictionary` (Task 9), `gsap` (Task 5), design tokens + brand-aligned `--primary` (Task 8), `Button` from `@/components/ui/button` (Task 6).
- Produces: `Hero({ dict })`, consumed by Task 13.

- [ ] **Step 1: `src/components/hero/hero.tsx`**

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
        <p data-hero-animate className="mb-4 text-sm font-semibold uppercase tracking-widest text-electric-purple">
          {dict.hero.eyebrow}
        </p>
        <h1 data-hero-animate className="text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
          {dict.hero.headline}
        </h1>
        <p data-hero-animate className="mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">
          {dict.hero.subheadline}
        </p>
        <div data-hero-animate className="mt-10 flex flex-wrap gap-4">
          <Button asChild size="lg" className="hover:bg-electric-purple">
            <a href="#cta">{dict.hero.primaryCta}</a>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-transparent border-white/20 text-white hover:border-white/40 hover:bg-transparent">
            <a href="#contact">{dict.hero.secondaryCta}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify types**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/hero/hero.tsx
git commit -m "feat: add Hero component with GSAP entrance animation"
```

---

### Task 13: Wire Header + Hero into both locale homepages

**Files:**
- Modify: `src/app/(en)/page.tsx` (full rewrite)
- Modify: `src/app/(pt)/pt/page.tsx` (full rewrite of the Task 10 placeholder)

**Interfaces:**
- Consumes: `SiteHeader` (Task 11), `Hero` (Task 12), `en`/`pt` dictionaries (Task 9).

- [ ] **Step 1: `src/app/(en)/page.tsx`**

```tsx
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/hero/hero";
import { en } from "@/data/dictionaries/en";

export default function EnglishHome() {
  return (
    <main>
      <SiteHeader dict={en} homeHref="/" />
      <Hero dict={en} />
    </main>
  );
}
```

- [ ] **Step 2: `src/app/(pt)/pt/page.tsx`**

```tsx
import { SiteHeader } from "@/components/layout/site-header";
import { Hero } from "@/components/hero/hero";
import { pt } from "@/data/dictionaries/pt";

export default function PortugueseHome() {
  return (
    <main>
      <SiteHeader dict={pt} homeHref="/pt" />
      <Hero dict={pt} />
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
git commit -m "feat: wire SiteHeader and Hero into EN/PT homepages"
```

---

### Task 14: Visual QA checkpoint (spec §30 step 9)

**Files:** none — verification only, matching this branch's commit for it if any fix is needed.

**Interfaces:** none — this is the "primeira revisão visual" gate the spec (§30 step 10) requires before continuing to any further section.

- [ ] **Step 1: Run the dev server**

Run: `npm run dev`

- [ ] **Step 2: Manually check `/` and `/pt` at each required breakpoint**

Using browser devtools responsive mode, check both routes at: 320px, 375px, 390px, 768px, 1024px, 1440px, 1920px (spec §19). Confirm:
- Header stays fixed, logo + nav visible on desktop, hamburger menu appears below `md` breakpoint.
- Mobile menu opens/closes and traps no focus incorrectly (tab through it).
- Hero headline/subheadline/CTAs never overflow or clip at any width.

- [ ] **Step 3: Check reduced motion**

In devtools, emulate `prefers-reduced-motion: reduce` (Rendering tab → Emulate CSS media feature) and reload `/`. Confirm the Hero content is immediately visible (no animation, no stuck-at-opacity-0 content).

- [ ] **Step 4: Check `/politica-de-privacidade` and `/termos-de-uso` still render correctly**

Confirm both still show the original legal copy, unaffected by the routing restructure.

- [ ] **Step 5: Fix anything found, re-run Step 1–4 until clean, then push**

```bash
git push -u origin feature/site-foundation-setup
```

- [ ] **Step 6: Stop here — do not continue to Capabilities/Technology/Work/etc.**

Per spec §22 and §30 step 10, the next sections (Positioning, Capabilities, Technology, Selected Work, Team, CTA, Footer) are separate plans, started only after this checkpoint is reviewed.
