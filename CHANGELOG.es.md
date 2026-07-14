# Changelog

Todos los cambios notables en VeryKit serán documentados en este archivo.

## [1.0.0] - 2025-07-12

### Añadido

- **17 herramientas de desarrollador** en 6 categorías:
  - **Data**: UUID Generator, Password Generator, Lorem Ipsum Generator, Credit Card Test Generator
  - **API**: JSON Formatter, JSON Compare, Base64 Encode/Decode, URL Encode/Decode, JWT Decoder, JWT Generator
  - **Utilities**: Case Converter, Timestamp Converter, Regex Tester, Hash Generator, Color Picker
  - **Regional**: CPF Generator & Validator, CNPJ Generator & Validator
- Internacionalización completa (Inglés, Portugués Brasil, Español)
- Búsqueda bilingüe — encuentra herramientas por nombre en cualquier idioma
- Filtrado por categoría en la página principal
- Modo Dark/Light con cambio automático de tema
- Diseño responsivo (móvil, tablet, escritorio)
- 134 tests unitarios con Vitest
- Regex Tester con cheat sheet y matches destacados
- JWT Decoder con detección de expiración
- JWT Generator & Signer con HMAC-SHA256 (via jose)
- Color Picker con conversión HEX, RGB, RGBA, HSL, HSLA, CMYK
- Hash Generator con MD5, SHA-1, SHA-256, SHA-512
- Credit Card Generator con validación algoritmo Luhn
- Generadores CNPJ/CPF con validación matemática de dígitos verificadores
- Metadatos SEO con datos estructurados JSON-LD en cada página de herramienta
- Páginas About, Contributing y Security

### Arquitectura

- Next.js 16 (App Router) con TypeScript
- Tailwind CSS 4
- next-intl para internacionalización
- Módulos de features aislados en `src/features/`
- Procesamiento solo client-side (sin datos server-side)
- Vitest para tests unitarios
