# Changelog

All notable changes to VeryKit will be documented in this file.

## [1.0.0] - 2025-07-12

### Added

- **17 developer tools** across 6 categories:
  - **Data**: UUID Generator, Password Generator, Lorem Ipsum Generator, Credit Card Test Generator
  - **API**: JSON Formatter, JSON Compare, Base64 Encode/Decode, URL Encode/Decode, JWT Decoder, JWT Generator
  - **Utilities**: Case Converter, Timestamp Converter, Regex Tester, Hash Generator, Color Picker
  - **Regional**: CPF Generator & Validator, CNPJ Generator & Validator
- Full internationalization (English, Portuguese Brazil, Spanish)
- Bilingual search — find tools by name in any language
- Category-based filtering on home page
- Dark/Light mode with automatic theme switching
- Responsive design (mobile, tablet, desktop)
- 134 unit tests with Vitest
- Regex Tester with cheat sheet and highlighted matches
- JWT Decoder with expiration detection
- JWT Generator & Signer with HMAC-SHA256 (via jose)
- Color Picker with HEX, RGB, RGBA, HSL, HSLA, CMYK conversion
- Hash Generator with MD5, SHA-1, SHA-256, SHA-512
- Credit Card Generator with Luhn algorithm validation
- CNPJ/CPF generators with mathematical check digit validation
- SEO metadata with JSON-LD structured data on every tool page
- About, Contributing, and Security pages

### Architecture

- Next.js 16 (App Router) with TypeScript
- Tailwind CSS 4
- next-intl for internationalization
- Isolated feature modules in `src/features/`
- Client-side only processing (no server-side data)
- Vitest for unit testing
