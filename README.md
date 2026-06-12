# adalbertobussiness.com

Landing page institucional para validação empresarial no Meta Business Manager.

## Como editar os dados oficiais

Atualize o arquivo:

```txt
src/lib/company.ts
```

Preencha razão social, nome fantasia, CNPJ, telefone, e-mail e cidade/UF exatamente como aparecem no CNPJ/MEI e no Meta Business Manager.

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Gerar arquivos para Hostinger

```bash
npm run build
```

O site estático será gerado na pasta `out/`. Envie o conteúdo dessa pasta para o `public_html` da Hostinger.
