# VeryKit

**Um lugar. Todas as ferramentas.**

Ferramentas gratuitas para QA Engineers e Developers.

## Visão Geral

VeryKit é um toolkit open source que reúne pequenas utilidades do dia a dia usadas por QA Engineers, Test Automation Engineers, Software Developers e estudantes.

O objetivo é simples:

1. Abra o VeryKit.
2. Busque ou escolha uma ferramenta.
3. Resolva a tarefa em segundos.
4. Copie o resultado.
5. Feche o site.

Sem anúncios, sem rastreamento, sem paywalls. Apenas ferramentas que funcionam, rodam localmente e desaparecem quando você termina.

## Funcionalidades

- **37 ferramentas** em 6 categorias (Data, API, Testing, Utilities, Regional, Others)
- **i18n completo**: Inglês, Português (Brasil), Espanhol
- **Busca bilíngue**: Encontre ferramentas por nome em qualquer idioma suportado
- **Processamento client-side**: Todos os cálculos acontecem no seu navegador
- **Modo Dark/Light**: Alternância automática de tema
- **Design responsivo**: Funciona em mobile, tablet e desktop
- **Testes unitários** com Vitest

## Ferramentas

### Data

| Ferramenta | Descrição |
|------------|-----------|
| UUID Generator | Gere UUIDs aleatórios (v4) |
| Password Generator | Senhas seguras aleatórias com opções personalizáveis |
| Lorem Ipsum Generator | Texto placeholder em parágrafos, palavras ou listas |
| Credit Card Test Generator | Números de teste válidos (Visa, Mastercard, Amex, Discover) |
| CSV ⇄ JSON Converter | Converta entre formatos CSV e JSON |
| Number Base Converter | Converta entre decimal, hex, binário e octal |
| Byte Converter | Converta entre bytes, KB, MB, GB e TB |

### API

| Ferramenta | Descrição |
|------------|-----------|
| JSON Formatter & Minifier | Formate, valide e minifique JSON |
| JSON Compare | Compare dois objetos JSON lado a lado |
| Base64 Encode / Decode | Codifique e decodifique strings Base64 |
| URL Encode / Decode | Codifique e decodifique parâmetros de URL |
| JWT Decoder | Decodifique tokens JWT e inspecione claims |
| JWT Generator & Signer | Gere e assine tokens JWT com HMAC-SHA256 |
| cURL to Code Converter | Converta comandos cURL para fetch, axios, Python e mais |
| User-Agent Parser | Analise strings User-Agent para identificar navegador, SO e dispositivo |
| MIME Type Checker | Consulte tipos MIME por extensão ou vice-versa |

### Testing

| Ferramenta | Descrição |
|------------|-----------|
| Boundary Value Calculator | Calcule valores de limite para casos de teste |
| Test Data Table Generator | Gere tabelas de dados mock em CSV, JSON ou SQL |
| BDD / Gherkin Snippet Builder | Construa cenários BDD com sintaxe Given/When/Then |
| HTTP Status Code Reference | Referência rápida de códigos de status HTTP |
| XPath & CSS Selector Builder | Construa seletores XPath e CSS para automação de testes |

### Utilities

| Ferramenta | Descrição |
|------------|-----------|
| Case Converter | Converta entre camelCase, snake_case, kebab-case, etc. |
| Timestamp / Unix Time Converter | Converta entre timestamps Unix e datas |
| Regex Tester | Teste expressões regulares com matches destacados |
| Hash Generator | Gere hashes MD5, SHA-1, SHA-256, SHA-512 |
| Color Picker & Converter | Escolha cores e converta entre HEX, RGB, HSL, CMYK |
| Markdown ⇄ HTML Converter | Converta entre Markdown e HTML |
| Markdown → PDF | Exporte documentos Markdown como PDF |
| Text ⇄ Binary Converter | Converta entre texto e representação binária |

### Regional (Brasil)

| Ferramenta | Descrição |
|------------|-----------|
| CPF Generator & Validator | Gere e valide números de CPF brasileiros |
| CNPJ Generator & Validator | Gere e valide números de CNPJ brasileiros |
| CEP Generator & Validator | Gere e valide CEPs brasileiros |
| Renavam Generator & Validator | Gere e valide números de renavam de veículos |
| PIX Key Generator | Gere chaves PIX aleatórias para pagamentos |

### Others

| Ferramenta | Descrição |
|------------|-----------|
| Chmod Calculator | Calcule permissões de arquivos Linux |
| QR Code Generator | Gere QR codes a partir de texto ou URLs |
| Aspect Ratio Calculator | Calcule proporções de imagens |

## Stack Tecnológica

- **Framework**: Next.js 16 (App Router)
- **Linguagem**: TypeScript
- **Estilo**: Tailwind CSS 4
- **Ícones**: Lucide React
- **i18n**: next-intl
- **Testes**: Vitest
- **Deploy**: Vercel

## Primeiros Passos

### Pré-requisitos

- Node.js 18+
- npm, yarn ou pnpm

### Instalação

```bash
git clone https://github.com/TioBrock/VeryKit.git
cd VeryKit
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Testes

```bash
npm test
```

### Build

```bash
npm run build
```

## Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js App Router
│   └── [locale]/          # Rotas de locale i18n
│       ├── tools/          # Páginas de ferramentas
│       └── about/          # Páginas informativas
├── components/             # Componentes UI compartilhados
├── features/               # Módulos isolados de ferramentas
│   └── [tool-name]/
│       ├── components/     # Componentes React
│       ├── utils/          # Funções utilitárias puras
│       ├── tests/          # Testes unitários
│       └── index.ts        # Barrel export
├── lib/                    # Utilitários compartilhados
└── i18n.ts                 # Configuração i18n
messages/                   # Arquivos de tradução (en, pt-BR, es)
```

## Princípios de Arquitetura

- **Isolamento de features**: Cada ferramenta vive em seu próprio diretório `src/features/`
- **Processamento client-side**: Toda lógica roda no navegador
- **i18n em primeiro lugar**: Toda string visível ao usuário é traduzida
- **Acessibilidade**: Práticas orientadas a WCAG
- **Performance**: Notas Lighthouse > 95

## Estratégia de Branches

Usamos um modelo de branches para manter o código estável:

- **`master`** — Código pronto para produção. Sempre estável.
- **`develop`** — Branch de integração para novas features. PRs vão aqui.
- **`feature/*`** — Branches temporárias para cada contribuição.

### Fluxo de Trabalho

1. Crie uma branch de feature a partir de `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/seu-nome-da-feature
   ```

2. Faça suas alterações e commit:
   ```bash
   git add .
   git commit -m "feat: adicione a descrição da sua feature"
   ```

3. Push e crie um Pull Request contra `develop`:
   ```bash
   git push origin feature/seu-nome-da-feature
   ```

4. Após revisão e aprovação, seu PR será mergeado em `develop`.

5. Quando pronto para produção, `develop` é mergeado em `master`.

## Contribuindo

Veja [CONTRIBUTING.md](CONTRIBUTING.md) para diretrizes.

## Segurança

Veja [SECURITY.md](SECURITY.md) para o processo de reporte.

## Licença

VeryKit é distribuído sob a [Licença MIT](LICENSE).
