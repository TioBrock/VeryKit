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

- **17 tools** across 6 categories (Data, API, Testing, Utilities, Regional, Others)
- **Full i18n**: English, Portuguese (Brazil), Spanish
- **Bilingual search**: Find tools by name in any supported language
- **Client-side processing**: All computations happen in your browser
- **Dark/Light mode**: Automatic theme switching
- **Responsive design**: Works on mobile, tablet, and desktop
- **134 unit tests** with Vitest

## Tools

### Data

| Tool | Description |
|------|-------------|
| UUID Generator | Generate random UUIDs (v4) |
| Password Generator | Secure random passwords with customizable options |
| Lorem Ipsum Generator | Placeholder text in paragraphs, words, or lists |
| Credit Card Test Generator | Valid test card numbers (Visa, Mastercard, Amex, Discover) |

### API

| Tool | Description |
|------|-------------|
| JSON Formatter & Minifier | Format, validate, and minify JSON |
| JSON Compare | Compare two JSON objects side by side |
| Base64 Encode / Decode | Encode and decode Base64 strings |
| URL Encode / Decode | Encode and decode URL parameters |
| JWT Decoder | Decode JWT tokens and inspect claims |
| JWT Generator & Signer | Generate and sign JWT tokens with HMAC-SHA256 |

### Utilities

| Tool | Description |
|------|-------------|
| Case Converter | Convert between camelCase, snake_case, kebab-case, etc. |
| Timestamp / Unix Time Converter | Convert between Unix timestamps and dates |
| Regex Tester | Test regular expressions with highlighted matches |
| Hash Generator | Generate MD5, SHA-1, SHA-256, SHA-512 hashes |
| Color Picker & Converter | Pick colors and convert between HEX, RGB, HSL, CMYK |

### Regional (Brazil)

| Tool | Description |
|------|-------------|
| CPF Generator & Validator | Generate and validate Brazilian CPF numbers |
| CNPJ Generator & Validator | Generate and validate Brazilian CNPJ numbers |

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

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Security

See [SECURITY.md](SECURITY.md) for the reporting process.

## License

VeryKit is released under the [MIT License](LICENSE).
