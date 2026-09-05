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

- Trabalhar direto em `main` — o usuário pediu para não criar branches de `feature/*` por tarefa. Lembrar sempre que `main` faz deploy automático para o Hostinger em produção via `.github/workflows/deploy.yml`, então cada commit ali publica imediatamente.
- **Não alterar `next.config.ts` nem `.github/workflows/deploy.yml`** até a fase de Produção (migração para Vercel), a menos que explicitamente pedido.
- Site é só em português (`/`, foco regional Sul de Minas) — não há mais versão em inglês (`/en` foi removida). Páginas legais (`/politica-de-privacidade`, `/termos-de-uso`) permanecem só em português.
- Dados legais/CNPJ da empresa vivem em `src/lib/constants.ts` (`COMPANY`) — nunca alterar os valores sem confirmação.
- Não existe suite de testes automatizados neste projeto. Verificação é manual: `npm run dev` + revisão visual, mais `npx tsc --noEmit`, `npm run lint` e `npm run build`.
- **`src/app/layout.tsx` NÃO deve existir.** O roteamento usa o padrão "multiple root layouts" do Next.js — cada grupo de rotas (`(pt)`, `(legal)`) tem seu próprio `layout.tsx` com `<html>`/`<body>`. Recriar um `app/layout.tsx` na raiz quebra esse esquema inteiro. Se um `app/layout.tsx` aparecer (ex: gerado por uma ferramenta), delete-o.
- Conteúdo textual (nav, hero) vive em `src/data/dictionaries/pt.ts`, tipado por `src/data/dictionaries/types.ts`. Editar copy ali, não direto nos componentes.
- Dependências do próprio scaffold do shadcn/ui (`radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`, `tw-animate-css`) são uma exceção esperada à lista de dependências da regra acima — não são "dependências desnecessárias" a remover.
