# Adalberto Business — Plano de Desenvolvimento do Site

## 1. Objetivo

Criar o novo site institucional da **Adalberto Business** como uma empresa boutique de engenharia de software, consultoria tecnológica e fornecimento de equipes experientes.

O site deve transmitir:

- Engenharia de software
- Senioridade técnica
- Confiabilidade
- Capacidade de execução
- Flexibilidade
- Posicionamento B2B premium

A referência visual principal é a abordagem enxuta e sofisticada da Pixelmatters, adaptada para uma identidade própria da Adalberto Business.

---

# 2. Posicionamento

## Conceito

**Adalberto Business — Software Engineering Partner**

A empresa não deve parecer uma agência de marketing, uma software house genérica ou uma plataforma de freelancers.

A mensagem central é:

> Empresas que precisam entregar software podem contar com uma equipe experiente de engenharia.

## Modelos comerciais

### Software Engineering
Projetos de software do discovery à produção.

### Dedicated Teams
Profissionais e squads experientes integrados à equipe do cliente.

### Technical Consulting
Arquitetura, modernização, performance, cloud, DevOps e revisão técnica.

### AI & Automation
Automação de processos, integrações e soluções com IA.

### Legacy Modernization
Evolução e modernização de sistemas existentes sem interromper a operação.

---

# 3. Stack DEFINIDA

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- GSAP
- Framer Motion
- shadcn/ui
- Lucide Icons

## Infraestrutura

- GitHub
- Vercel
- Hostinger para domínio/DNS
- Cloudflare opcional posteriormente

## Backend

Não criar backend inicialmente.

O site institucional deve ser o mais simples e rápido possível.

Backend futuro:

- FastAPI
- PostgreSQL
- Redis

---

# 4. Arquitetura inicial

```text
GitHub
   |
   v
Next.js + TypeScript
   |
   +-- Tailwind CSS
   +-- GSAP
   +-- Framer Motion
   +-- shadcn/ui
   |
   v
Vercel
   |
   v
adalbertobussiness.com
   |
   DNS Hostinger
```

Não contratar VPS neste momento.

A hospedagem atual da Hostinger continua sendo mantida para o domínio e serviços existentes.

---

# 5. Estrutura do projeto

```text
adalberto-business/
|
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── about/
│   ├── services/
│   ├── work/
│   ├── technology/
│   └── contact/
|
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── hero/
│   ├── sections/
│   ├── services/
│   ├── technology/
│   ├── work/
│   ├── team/
│   └── ui/
|
├── lib/
│   ├── constants.ts
│   └── utils.ts
|
├── public/
│   ├── brand/
│   ├── images/
│   └── projects/
|
├── data/
│   ├── services.ts
│   ├── technologies.ts
│   └── projects.ts
|
├── README.md
├── CLAUDE.md
├── package.json
└── tsconfig.json
```

---

# 6. Home Page

A Home deve ser propositalmente enxuta.

## Seção 01 — Hero

Objetivo: causar impacto nos primeiros segundos.

Mensagem sugerida:

> Software engineering teams for businesses that need to deliver.

Subheadline:

> Experienced engineers building, modernizing and scaling digital products.

CTAs:

- Start a project
- Talk to our team

Visual:

- fundo escuro
- tipografia muito grande
- animação sutil
- bastante espaço negativo
- entrada cinematográfica
- sem excesso de elementos

---

# 7. Seção 02 — Positioning

Título:

> Engineering capacity, when you need it.

Texto curto explicando que a Adalberto Business disponibiliza engenharia experiente para empresas que precisam construir, evoluir ou modernizar software.

Evitar blocos longos de texto.

---

# 8. Seção 03 — Capabilities

Quatro blocos:

1. Software Engineering
2. Dedicated Teams
3. Technical Consulting
4. AI & Automation

Cada bloco deve conter:

- título
- descrição de 1–2 frases
- microinteração
- link/CTA

---

# 9. Seção 04 — Technology

Não apresentar tecnologias como uma lista de "skills".

Mensagem:

> We choose the right technology for the problem.

Categorias:

### Backend
Python · Java · PHP · Node.js · .NET

### Frontend
TypeScript · React · Next.js · Vue · Angular

### Data
PostgreSQL · MySQL · Redis · MongoDB

### Cloud & DevOps
AWS · Docker · Kubernetes · CI/CD

### Automation & AI
Python · APIs · LLMs · Automation

O conteúdo deve ser facilmente editável através de arquivos de dados.

---

# 10. Seção 05 — Selected Work

Apresentar projetos reais e relevantes.

Importante:

Não afirmar que um projeto foi realizado para um cliente da Adalberto Business se isso não for verdade.

Usar categorias como:

- Engineering Project
- Internal Product
- Technology Case
- Selected Work

Primeiros projetos que podem ser avaliados:

- Radar Odds
- plataformas de dados
- automações
- integrações CRM
- APIs
- projetos Python
- sistemas de monitoramento

Cada case deverá ter:

- problema
- solução
- tecnologias
- resultado
- imagem

---

# 11. Seção 06 — Why Adalberto Business

Mensagem curta:

> Senior engineers. Flexible teams. Real delivery.

Pontos:

- Experienced professionals
- Multi-stack engineering
- Flexible engagement models
- Fast onboarding
- Technical ownership
- Long-term partnership

---

# 12. Seção 07 — Team

Mostrar a empresa como uma rede de profissionais experientes.

Tecnologias disponíveis:

- Python
- PHP
- Java
- JavaScript / TypeScript
- React
- Node.js
- .NET
- DevOps
- Cloud
- Databases

Não expor dados pessoais dos profissionais sem autorização.

---

# 13. Seção 08 — CTA

Grande seção final.

Mensagem:

> Let's build something that matters.

CTA principal:

> Start a conversation

CTA secundário:

> View our capabilities

---

# 14. Footer

Minimalista.

```text
ADALBERTO BUSINESS

Software Engineering Partner

Services
Work
Technology
About
Contact

LinkedIn
GitHub

© 2026 Adalberto Business
```

---

# 15. Identidade visual

## Direção

- Premium
- Minimalista
- Tecnológica
- Editorial
- B2B
- Internacional

## Cores

Base:

- Near Black
- Deep Navy
- White
- Off-white

Acento:

- Electric Purple
- Cobalt Blue

Não exagerar no uso do gradiente.

## Tipografia

Usar uma família sans-serif moderna e sofisticada.

Preferência:

- Geist
- Inter
- Manrope

Avaliar visualmente durante implementação.

---

# 16. Logo

Conceito inicial:

**AB Monogram**

O símbolo deve representar de forma abstrata:

- A
- B
- Architecture
- Building blocks
- Engineering
- Precision

Evitar:

- </> 
- computadores
- robôs
- circuitos
- foguetes
- lâmpadas
- ícones genéricos de IA

Arquivos do logo devem ficar em:

```text
public/brand/
```

Criar versões:

- logo horizontal
- símbolo
- branco
- preto
- favicon

---

# 17. Animações

Usar animações com propósito.

## GSAP

Utilizar para:

- Hero entrance
- Scroll reveal
- Parallax
- Text animation
- Section transitions
- Image reveal

## Framer Motion

Utilizar para:

- Hover
- Cards
- Buttons
- Microinteractions
- Page transitions simples

## Regra

Não transformar a página em uma demonstração de efeitos.

A animação deve reforçar a percepção de qualidade.

---

# 18. Performance

Objetivo:

- excelente Core Web Vitals
- imagens otimizadas
- lazy loading
- evitar JavaScript desnecessário
- componentes Server quando possível
- Client Components somente quando necessários
- fontes otimizadas
- SEO correto

Não utilizar bibliotecas pesadas sem necessidade.

---

# 19. Responsividade

Prioridade:

1. Desktop
2. Tablet
3. Mobile

O layout mobile não deve ser apenas uma versão reduzida do desktop.

Criar uma experiência própria para telas pequenas.

Testar:

- 320px
- 375px
- 390px
- 768px
- 1024px
- 1440px
- 1920px

---

# 20. SEO

Configurar:

- title
- description
- Open Graph
- Twitter/X cards
- favicon
- sitemap
- robots.txt
- canonical URL
- structured data quando apropriado

Palavras-chave naturais:

- software engineering
- software development
- dedicated development teams
- technical consulting
- software engineers
- Python development
- Java development
- PHP development
- AI automation
- legacy modernization

Não fazer keyword stuffing.

---

# 21. Acessibilidade

Implementar:

- semantic HTML
- keyboard navigation
- visible focus
- aria labels quando necessário
- contraste adequado
- reduced motion
- alt text
- navegação acessível

GSAP e Framer Motion devem respeitar `prefers-reduced-motion`.

---

# 22. Estratégia de desenvolvimento com Claude no VS Code

Claude deve trabalhar por etapas.

NÃO pedir para Claude criar o site inteiro de uma vez.

Fluxo:

```text
FASE 1
Setup

↓

FASE 2
Design System

↓

FASE 3
Navigation + Hero

↓

FASE 4
Capabilities

↓

FASE 5
Technology

↓

FASE 6
Selected Work

↓

FASE 7
Team + About

↓

FASE 8
CTA + Footer

↓

FASE 9
Responsive

↓

FASE 10
SEO + Accessibility

↓

FASE 11
Performance

↓

FASE 12
Production
```

Após cada fase:

1. executar
2. visualizar
3. testar
4. revisar
5. commit

---

# 23. Git workflow

Branches:

```text
main
develop
feature/*
```

Exemplo:

```text
feature/hero
feature/services
feature/work
feature/technology
feature/animations
```

Commits:

```text
feat: create initial Next.js structure
feat: add premium hero section
feat: add services section
feat: add technology section
feat: add selected work
feat: add animations
fix: improve mobile navigation
perf: optimize images
seo: add metadata and sitemap
```

---

# 24. CLAUDE.md

Criar um arquivo `CLAUDE.md` na raiz.

Ele deve orientar Claude a:

- não alterar arquitetura sem autorização
- não instalar dependências desnecessárias
- priorizar Server Components
- usar TypeScript strict
- reutilizar componentes
- manter acessibilidade
- manter performance
- não criar conteúdo fictício de clientes
- não inventar resultados
- seguir o design system
- testar responsividade
- explicar mudanças importantes
- evitar overengineering

---

# 25. Regra principal para Claude

Claude deve sempre pensar:

> "Estou construindo uma experiência premium para uma empresa de engenharia de software, não um template genérico de software house."

Evitar:

- dashboards
- excesso de cards
- excesso de gradientes
- excesso de ícones
- imagens stock
- texto corporativo genérico
- animações exageradas
- aparência de agência de marketing

Priorizar:

- tipografia
- espaço negativo
- composição
- movimento sutil
- cases
- clareza
- engenharia
- confiança

---

# 26. Primeira entrega

A primeira versão deve conter somente:

```text
Header
Hero
Positioning
Capabilities
Technology
Selected Work
Why Us
CTA
Footer
```

Não criar inicialmente:

- login
- painel administrativo
- CMS
- banco
- API
- blog complexo
- área do cliente

Esses recursos poderão ser adicionados posteriormente.

---

# 27. Critério de sucesso

O visitante deve entender em poucos segundos:

1. O que é a Adalberto Business.
2. Que existem profissionais experientes disponíveis.
3. Que a empresa trabalha com múltiplas stacks.
4. Que pode contratar projeto, equipe ou consultoria.
5. Que a empresa possui capacidade técnica real.
6. Como iniciar uma conversa.

O site deve parecer uma empresa de engenharia de software **premium e confiável**, não um portfólio pessoal.

---

# 28. Roadmap futuro

## Fase 1 — Website

Next.js + Vercel.

## Fase 2 — Comercial

- formulário qualificado
- CRM
- lead tracking
- analytics

## Fase 3 — Conteúdo

- cases
- blog
- estudos técnicos
- SEO

## Fase 4 — Operação

- portal de clientes
- propostas
- contratos
- gestão de projetos

## Fase 5 — Infraestrutura

Quando houver necessidade:

- VPS
- Docker
- FastAPI
- PostgreSQL
- Redis
- workers
- monitoramento

---

# 29. Decisão atual

### STACK

**Next.js + TypeScript + Tailwind + GSAP + Framer Motion + shadcn/ui**

### DEPLOY

**Vercel**

### DOMÍNIO

**Hostinger**

### VPS

**Não contratar agora**

### DESIGN

**Minimalista + premium + engenharia + inspiração Pixelmatters**

### POSICIONAMENTO

**Software Engineering Partner**

### PRINCIPAL DIFERENCIAL

**Profissionais experientes disponíveis para projetos, squads e consultoria.**

---

# 30. Próximo passo

Antes de escrever código:

1. Criar repositório GitHub.
2. Criar projeto Next.js.
3. Criar `CLAUDE.md`.
4. Instalar dependências mínimas.
5. Criar design tokens.
6. Implementar Header.
7. Implementar Hero.
8. Rodar localmente.
9. Fazer primeira revisão visual.
10. Só então continuar as demais seções.
