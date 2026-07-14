# Changelog

Todas as mudanças notáveis no VeryKit serão documentadas neste arquivo.

## [1.0.0] - 2025-07-12

### Adicionado

- **17 ferramentas de desenvolvedor** em 6 categorias:
  - **Data**: UUID Generator, Password Generator, Lorem Ipsum Generator, Credit Card Test Generator
  - **API**: JSON Formatter, JSON Compare, Base64 Encode/Decode, URL Encode/Decode, JWT Decoder, JWT Generator
  - **Utilities**: Case Converter, Timestamp Converter, Regex Tester, Hash Generator, Color Picker
  - **Regional**: CPF Generator & Validator, CNPJ Generator & Validator
- Internacionalização completa (Inglês, Português Brasil, Espanhol)
- Busca bilíngue — encontre ferramentas por nome em qualquer idioma
- Filtragem por categoria na página inicial
- Modo Dark/Light com alternância automática de tema
- Design responsivo (mobile, tablet, desktop)
- 134 testes unitários com Vitest
- Regex Tester com cheat sheet e matches destacados
- JWT Decoder com detecção de expiração
- JWT Generator & Signer com HMAC-SHA256 (via jose)
- Color Picker com conversão HEX, RGB, RGBA, HSL, HSLA, CMYK
- Hash Generator com MD5, SHA-1, SHA-256, SHA-512
- Credit Card Generator com validação algoritmo Luhn
- Geradores CNPJ/CPF com validação matemática de dígitos verificadores
- Metadados SEO com dados estruturados JSON-LD em cada página de ferramenta
- Páginas About, Contributing e Security

### Arquitetura

- Next.js 16 (App Router) com TypeScript
- Tailwind CSS 4
- next-intl para internacionalização
- Módulos de features isolados em `src/features/`
- Processamento apenas client-side (sem dados server-side)
- Vitest para testes unitários
