# Reposicionamento Regional — Sul de Minas (DDD 35)

**Data:** 2026-09-05
**Status:** Aprovado para escrita de plano de implementação
**Supersede:** As seções §2 (Posicionamento), §6 (Hero), §8 (Capabilities) e §20 (SEO) de `ADALBERTO_BUSINESS_SITE_PLAN.md` passam a ser guiadas por este documento. As demais seções do plano original continuam válidas.

## 1. Contexto e objetivo

O site foi construído com posicionamento internacional genérico ("Software Engineering Partner", EN como idioma padrão em `/`, PT em `/pt`). A decisão de negócio agora é focar no mercado regional: empresas de **pequeno, médio e grande porte** na região do **DDD 35 (Sul de Minas)** — especificamente São Gonçalo do Sapucaí, Varginha, Pouso Alegre e Santa Rita do Sapucaí — em vez de um público internacional abstrato.

Este documento define como o conteúdo, o esquema de dados, o roteamento e o SEO do site mudam para refletir esse foco, mantendo o padrão de qualidade "engenharia de software premium" já estabelecido (evitar cair em tom de agência de marketing genérica).

## 2. Posicionamento e mensagem

**Eixo central:** *"Engenharia de software para empresas do Sul de Minas — de pequeno a grande porte."*

Diretrizes de tom:
- Manter o vocabulário de engenharia (evitar "criamos sites", preferir "sistemas sob medida", "automação", "consultoria técnica").
- A referência ao **Vale da Eletrônica** (identidade nacional de Santa Rita do Sapucaí como polo de tecnologia) entra como prova de credibilidade técnica regional — usar com moderação, não como slogan turístico.
- "Atende pequeno a grande porte" é comunicado como *mesma barra de execução, entrega diferente por estágio* (seção 4), nunca como "fazemos qualquer coisa para qualquer um".

**Risco identificado:** mensagem ampla demais pode diluir o posicionamento premium. Mitigação: a seção de segmentação por porte (§4) explicita que o que muda é o tipo de entrega, não o nível de qualidade.

## 3. Dados centrais (`src/lib/constants.ts`)

Adicionar um campo novo ao objeto `COMPANY` — **sem alterar nenhum valor legal existente** (CNPJ, razão social, endereço, telefone permanecem intocados):

```ts
export const COMPANY = {
  // ...campos existentes inalterados
  regionCities: [
    "São Gonçalo do Sapucaí",
    "Varginha",
    "Pouso Alegre",
    "Santa Rita do Sapucaí"
  ]
};
```

Essa lista se torna a fonte única usada em copy (hero/positioning/tiers), SEO (keywords, structured data) e qualquer menção futura às cidades atendidas.

## 4. Conteúdo e esquema do dicionário

### 4.1 Alterações em `src/data/dictionaries/types.ts`

- `hero` ganha um campo novo `regionLabel: string` (chip/linha curta com as cidades, exibida perto do eyebrow).
- Novo bloco `tiers`, com o **mesmo formato de `capabilities.items`** (reaproveitar shape, sem criar um tipo novo):

```ts
tiers: {
  eyebrow: string;
  title: string;
  items: { title: string; description: string; cta: string; href: string }[];
};
```

### 4.2 Copy proposta — PT (`src/data/dictionaries/pt.ts`)

Rascunho de conteúdo (ajustável em detalhe durante a implementação, mas a estrutura e o eixo de mensagem abaixo são o que a spec fixa):

- **hero.eyebrow:** "Parceiro de Engenharia de Software · Sul de Minas"
- **hero.regionLabel:** "São Gonçalo do Sapucaí · Varginha · Pouso Alegre · Santa Rita do Sapucaí"
- **hero.headline:** "Engenharia de software para empresas do Sul de Minas que precisam entregar."
- **hero.subheadline:** "Do pequeno ao grande porte, a mesma engenharia experiente por trás de sistemas, automações e squads dedicados — nascida no Vale da Eletrônica."
- **positioning.title:** "Capacidade de engenharia, perto de você."
- **positioning.body:** "A Adalberto Business atua em todo o Sul de Minas — São Gonçalo do Sapucaí, Varginha, Pouso Alegre e Santa Rita do Sapucaí — colocando engenharia experiente à disposição de empresas de qualquer porte que precisam construir, evoluir ou modernizar software."
- **tiers.eyebrow:** "Para qual porte você é"
- **tiers.title:** "Mesma engenharia, para cada estágio do seu negócio."
- **tiers.items:**
  1. *Pequeno porte* — "Sistemas enxutos, automações e presença digital sob medida para começar com o pé direito, sem contratar uma estrutura que você ainda não precisa." · CTA "Ver como começar"
  2. *Médio porte* — "Sistemas próprios, integrações entre ferramentas e consultoria técnica pontual para quem já sente os limites de soluções genéricas." · CTA "Agendar uma conversa"
  3. *Grande porte* — "Squads dedicados, modernização de legado e consultoria técnica contínua para operações que não podem parar." · CTA "Falar com o time"

`capabilities` (as 4 já existentes) permanece como está — continua válido para qualquer porte, é ortogonal à segmentação por porte.

### 4.3 EN (`src/data/dictionaries/en.ts`)

Sem mudanças de conteúdo. A página em inglês vira dormente (§6) e mantém a mensagem internacional atual, para eventual reativação futura.

## 5. Componentes

### 5.1 Extração de `CardGrid` compartilhado

`Capabilities` ([capabilities.tsx](../../../src/components/services/capabilities.tsx)) e a nova seção `Tiers` renderizam o mesmo padrão visual (grid de cards com hover, título, descrição, CTA). Extrair um componente compartilhado:

- `src/components/ui/card-grid.tsx` — `CardGrid({ items }: { items: { title: string; description: string; cta: string; href: string }[] })`, client component, contém o `LazyMotion`/`m.div` de hover que hoje está duplicado dentro de `Capabilities`.
- `Capabilities` e o novo `Tiers` passam a ser wrappers finos: cabeçalho (eyebrow/title) + `<CardGrid items={...} />`.

### 5.2 Nova seção `Tiers`

`src/components/sections/tiers.tsx` — segue o mesmo padrão de `Positioning`/`Capabilities` (Server Component de layout + `CardGrid` client). Posição na página: entre `Positioning` e `Capabilities`.

## 6. Troca de idioma padrão (PT → `/`)

Estrutura atual (route groups do Next.js App Router):
- `(pt)/pt/page.tsx` → gera `/pt`
- `(en)/page.tsx` → gera `/`

Mudança:
- `(pt)/pt/page.tsx` → mover para `(pt)/page.tsx` (PT passa a gerar `/`)
- `(en)/page.tsx` → mover para `(en)/en/page.tsx` (EN passa a gerar `/en`, mesmo padrão simétrico já usado hoje para o PT)

Ajustes decorrentes em ambos os layouts (`(pt)/layout.tsx`, `(en)/layout.tsx`):
- `homeHref` passado ao `SiteHeader` em cada página
- `dict.nav.localeSwitchHref`: PT aponta para `/en` (era `/`), EN aponta para `/` (era `/pt`)
- `metadata.alternates.canonical` e `alternates.languages` em cada layout (PT: canonical `/`, languages `{ pt: "/", en: "/en" }`; EN: canonical `/en`, languages `{ pt: "/", en: "/en" }`)
- `openGraph.url` em cada layout

### 6.1 EN dormente

Por decisão de negócio, a oferta internacional sai do posicionamento principal "por enquanto", mas o código/copy em inglês já existe e não será descartado. `/en`:
- Fica fora do nav principal em destaque (permanece acessível via locale switcher, para quem quiser)
- Recebe `robots: { index: false, follow: false }` no metadata, para não competir por indexação com a home PT
- Conteúdo permanece o atual (Software Engineering Partner internacional), sem mudanças

### 6.2 Metadata PT (agora landing principal)

- `title.default`: "Adalberto Business | Engenharia de Software no Sul de Minas"
- `description`: "Engenharia de software para empresas de pequeno a grande porte em São Gonçalo do Sapucaí, Varginha, Pouso Alegre e Santa Rita do Sapucaí — Sul de Minas."
- `openGraph.locale`: `pt_BR`, `url`: `COMPANY.website`

## 7. SEO regional

- **Structured data:** adicionar JSON-LD `schema.org/ProfessionalService` no layout PT (agora root), usando `COMPANY` (nome, telefone, endereço) e `COMPANY.regionCities` como `areaServed`. Server-rendered, sem JS adicional no cliente.
- **Keywords (variantes regionais das do §20 original):** "desenvolvimento de software Sul de Minas", "engenharia de software Varginha", "sistemas sob medida Pouso Alegre", "TI para empresas São Gonçalo do Sapucaí", "software Vale da Eletrônica" — usadas naturalmente em `description`/copy, sem keyword stuffing.
- Sitemap.xml/robots.txt formais continuam como item futuro já previsto no plano original (§20); quando forem implementados, PT em `/` é o path prioritário.

## 8. Preparação para Google Ads (readiness only — não ativar agora)

Escopo desta spec é **deixar pronto para plugar depois**, não implementar tracking:
- Reservar uma env var (`NEXT_PUBLIC_GTAG_ID`, documentada em `.env.example`, sem valor real commitado) e um componente único de analytics (hoje no-op, ex.: `src/components/analytics.tsx`) incluído nos dois layouts — ativar tracking no futuro vira uma mudança de um arquivo só.
- Padronizar os dois destinos de conversão existentes (WhatsApp via `COMPANY.whatsappUrl` e âncora `#cta` de "iniciar projeto") com nomenclatura consistente, para facilitar instrumentar eventos de conversão depois.

**Explicitamente fora do escopo, anotado como próximo passo:**
- Formulário de lead qualificado (já previsto no roadmap original, Fase 2 Comercial)
- Banner de consentimento de cookies / atualização da política de privacidade para uso de Ads/Analytics — só entram quando o tracking for de fato ligado (exigência de precisão da LGPD: não declarar uso de cookies antes de existir)

## 9. Referências visuais

Fica para a fase de implementação visual (skill `frontend-design` + companion visual), não faz parte desta spec de conteúdo/arquitetura. Se houver shots/perfis específicos do Dribbble (não a home genérica), eles entram como referência direta nesse momento.

## 10. Fora do escopo desta spec

- Seções ainda não construídas do plano original (Technology, Selected Work, Why Us, Team, CTA, Footer) — continuam no roadmap de fases (§22 do plano original), mas passam a seguir este novo posicionamento quando forem implementadas.
- Redirects de `/pt` antigo: o site é recente e essas rotas provavelmente não têm indexação/backlinks relevantes ainda. Não criar redirect agora. Se o Search Console mostrar indexação de `/pt` após o deploy, avaliar um redirect pontual depois — isso tocaria `next.config.ts`, o que exige autorização separada por regra do `CLAUDE.md`.
- Implementação efetiva de Google Ads/Analytics (só a preparação, §8).
- Redesenho visual pixel-a-pixel (fica para a fase de implementação, com referências visuais).

## 11. Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Mensagem "atende qualquer porte" diluir o posicionamento premium | Segmentação explícita por porte (§4) com o mesmo padrão de execução, tom de engenharia em toda a copy |
| Perda de SEO ao mover `/` de EN para PT | Site novo, baixo risco real; monitorar Search Console pós-deploy |
| Duplicação visual entre Capabilities e Tiers | Extrair `CardGrid` compartilhado (§5.1) antes de criar a nova seção |
| Declarar uso de cookies/Ads antes de existir (LGPD) | Preparação apenas estrutural agora; política de privacidade só muda quando o tracking for ligado de fato |

## 12. Critérios de sucesso

Um visitante da região deve entender em poucos segundos:
1. Que a Adalberto Business atende empresas do Sul de Minas (não é uma consultoria distante/genérica).
2. Que atende qualquer porte de empresa, com entregas adequadas a cada estágio.
3. Que tem raiz técnica séria (Vale da Eletrônica, stack real, consultoria).
4. Como iniciar uma conversa (WhatsApp ou "iniciar projeto").

O site deve continuar parecendo uma empresa de engenharia de software premium — agora com raiz regional clara — não uma agência local genérica.
