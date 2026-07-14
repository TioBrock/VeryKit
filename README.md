# VeryKit

**One place. Every tool.**

Free tools for QA Engineers and Developers.

## Overview

VeryKit is an open source toolkit that brings together small, everyday utilities used by QA Engineers, Test Automation Engineers, Software Developers, and students.

The goal is simple:

1. Open VeryKit.
2. Search or choose a tool.
3. Solve the task in seconds.
4. Copy the result.
5. Close the site.

No ads, no tracking, no paywalls. Just tools that work, run locally, and disappear when you're done.

## Features

- **37 tools** across 6 categories (Data, API, Testing, Utilities, Regional, Others)
- **Full i18n**: English, Portuguese (Brazil), Spanish
- **Bilingual search**: Find tools by name in any supported language
- **Client-side processing**: All computations happen in your browser
- **Dark/Light mode**: Automatic theme switching
- **Responsive design**: Works on mobile, tablet, and desktop
- **Unit tests** with Vitest

## Tools

### Data

| Tool | Description |
|------|-------------|
| UUID Generator | Generate random UUIDs (v4) |
| Password Generator | Secure random passwords with customizable options |
| Lorem Ipsum Generator | Placeholder text in paragraphs, words, or lists |
| Credit Card Test Generator | Valid test card numbers (Visa, Mastercard, Amex, Discover) |
| CSV ⇄ JSON Converter | Convert between CSV and JSON formats |
| Number Base Converter | Convert between decimal, hex, binary, and octal |
| Byte Converter | Convert between bytes, KB, MB, GB, and TB |

### API

| Tool | Description |
|------|-------------|
| JSON Formatter & Minifier | Format, validate, and minify JSON |
| JSON Compare | Compare two JSON objects side by side |
| Base64 Encode / Decode | Encode and decode Base64 strings |
| URL Encode / Decode | Encode and decode URL parameters |
| JWT Decoder | Decode JWT tokens and inspect claims |
| JWT Generator & Signer | Generate and sign JWT tokens with HMAC-SHA256 |
| cURL to Code Converter | Convert cURL commands to fetch, axios, Python, and more |
| User-Agent Parser | Parse User-Agent strings to identify browser, OS, and device |
| MIME Type Checker | Look up MIME types by extension or vice versa |

### Testing

| Tool | Description |
|------|-------------|
| Boundary Value Calculator | Calculate boundary values for test cases |
| Test Data Table Generator | Generate mock data tables in CSV, JSON, or SQL |
| BDD / Gherkin Snippet Builder | Build BDD scenarios with Given/When/Then syntax |
| HTTP Status Code Reference | Quick reference for HTTP status codes |
| XPath & CSS Selector Builder | Build XPath and CSS selectors for test automation |

### Utilities

| Tool | Description |
|------|-------------|
| Case Converter | Convert between camelCase, snake_case, kebab-case, etc. |
| Timestamp / Unix Time Converter | Convert between Unix timestamps and dates |
| Regex Tester | Test regular expressions with highlighted matches |
| Hash Generator | Generate MD5, SHA-1, SHA-256, SHA-512 hashes |
| Color Picker & Converter | Pick colors and convert between HEX, RGB, HSL, CMYK |
| Markdown ⇄ HTML Converter | Convert between Markdown and HTML |
| Markdown → PDF | Export Markdown documents as PDF |
| Text ⇄ Binary Converter | Convert between text and binary representation |

### Regional (Brazil)

| Tool | Description |
|------|-------------|
| CPF Generator & Validator | Generate and validate Brazilian CPF numbers |
| CNPJ Generator & Validator | Generate and validate Brazilian CNPJ numbers |
| CEP Generator & Validator | Generate and validate Brazilian postal codes |
| Renavam Generator & Validator | Generate and validate vehicle registration numbers |
| PIX Key Generator | Generate random PIX payment keys |

### Others

| Tool | Description |
|------|-------------|
| Chmod Calculator | Calculate Linux file permissions |
| QR Code Generator | Generate QR codes from text or URLs |
| Aspect Ratio Calculator | Calculate image aspect ratios |

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **i18n**: next-intl
- **Testing**: Vitest
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/TioBrock/VeryKit.git
cd VeryKit
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

```bash
npm test
```

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   └── [locale]/          # i18n locale routes
│       ├── tools/          # Tool pages
│       └── about/          # Info pages
├── components/             # Shared UI components
├── features/               # Isolated tool modules
│   └── [tool-name]/
│       ├── components/     # React components
│       ├── utils/          # Pure utility functions
│       ├── tests/          # Unit tests
│       └── index.ts        # Barrel export
├── lib/                    # Shared utilities
└── i18n.ts                 # i18n configuration
messages/                   # Translation files (en, pt-BR, es)
```

## Architecture Principles

- **Feature isolation**: Each tool lives in its own `src/features/` directory
- **Client-side processing**: All logic runs in the browser
- **i18n first**: Every user-facing string is translated
- **Accessibility**: WCAG-oriented practices
- **Performance**: Lighthouse scores > 95

## Branch Strategy

We use a branching model to keep the codebase stable:

- **`master`** — Production-ready code. Always stable.
- **`develop`** — Integration branch for new features. PRs go here.
- **`feature/*`** — Temporary branches for each contribution.

### Workflow

1. Create a feature branch from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

3. Push and create a Pull Request against `develop`:
   ```bash
   git push origin feature/your-feature-name
   ```

4. After review and approval, your PR will be merged into `develop`.

5. When ready for production, `develop` is merged into `master`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Security

See [SECURITY.md](SECURITY.md) for the reporting process.

## License

VeryKit is released under the [MIT License](LICENSE).
