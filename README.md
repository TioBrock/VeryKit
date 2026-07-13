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

VeryKit is designed to replace the habit of opening many unrelated websites for quick tasks such as formatting JSON, generating test data, decoding tokens, converting timestamps, testing regular expressions, comparing text, and preparing testing artifacts.

## Product Principles

VeryKit is built around a few strict principles:

- Free to use.
- Open source.
- No ads.
- No forced login.
- No mandatory signup.
- No newsletter gates.
- No paywalls.
- No invasive tracking.
- Local-first processing whenever possible.
- Fast, calm, accessible user experience.

This project optimizes for usefulness, trust, speed, and maintainability.

## Current Status

VeryKit is currently in **Phase 1: Architecture and Documentation**.

At this stage, the repository contains product, architecture, design, quality, accessibility, SEO, i18n, security, and open source documentation.

Application source code has not been created yet. This is intentional. The first phase exists to define the project properly before implementation begins.

## Planned Tech Stack

When implementation begins, VeryKit will use:

- Next.js with App Router.
- React.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Lucide Icons.
- Zod.
- React Hook Form when needed.
- next-themes.
- next-intl.
- ESLint.
- Prettier.
- Vitest.

The project will be prepared for deployment on Vercel without manual infrastructure setup.

## Planned Tool Categories

### Data

- CPF Generator/Validator.
- CNPJ Generator.
- UUID Generator.
- Password Generator.
- Random Email Generator.
- Random Person Generator.
- Random Address Generator.
- Random Phone Generator.
- Credit Card Test Generator.
- Lorem Ipsum Generator.

### API

- JSON Formatter.
- JSON Minifier.
- JSON Validator.
- JSON Compare.
- XML to JSON.
- JSON to XML.
- JWT Decoder.
- JWT Inspector.
- Base64 Encode.
- Base64 Decode.
- URL Encode.
- URL Decode.
- Curl Parser.

### Testing

- BDD Generator.
- Test Case Generator.
- Acceptance Criteria Helper.
- Random Test Data.
- Exploratory Testing Checklist.

### Utilities

- Regex Tester.
- Regex Cheat Sheet.
- Timestamp Converter.
- Unix Time Converter.
- Hash Generator.
- UUID Batch Generator.
- Case Converter.
- Text Diff.
- Color Picker.

## Internationalization

VeryKit is an international project created in Brazil.

Internationalization is required from the first implementation phase:

- Default locale: English (`en`).
- Supported locales: Portuguese Brazil (`pt-BR`) and Spanish (`es`).
- Tool names remain untranslated.
- Descriptions, messages, examples, FAQ content, and SEO metadata are translated.
- No hardcoded user-facing strings should exist in application components once implementation begins.

## Accessibility

VeryKit aims to follow WCAG-oriented accessibility practices.

The product must support:

- Keyboard navigation.
- Visible focus states.
- Semantic HTML.
- ARIA labels where needed.
- Accessible forms.
- Clear error messages.
- Adequate contrast in light and dark mode.
- Mobile, tablet, and desktop usage.

## Performance Goals

VeryKit targets Lighthouse scores greater than 95 for:

- Performance.
- Accessibility.
- SEO.
- Best Practices.

Performance is part of the product experience. Tools should open quickly, process locally where possible, and avoid unnecessary dependencies.

## Documentation

Project planning and architecture live in `.ai/`.

Key documents:

- `.ai/master-prompt.md` - Executive project memory for future agents.
- `.ai/00-product.md` - Product requirements.
- `.ai/01-architecture.md` - Architecture guidelines.
- `.ai/02-design-system.md` - Design system direction.
- `.ai/05-i18n.md` - Internationalization rules.
- `.ai/07-testing.md` - Testing strategy.
- `.ai/11-agent-rules.md` - Rules for AI agents.
- `.ai/16-security.md` - Security guidelines.

## Local Development

Local development commands are not available yet because the project is still in Phase 1.

When implementation begins, this section will be updated with the exact package manager and commands for:

- Installing dependencies.
- Running the development server.
- Running tests.
- Running lint.
- Building the project.

## Contributing

Contributions are welcome, but the project is currently focused on architecture and documentation.

Before contributing, read:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md)

Future implementation contributions must preserve:

- Feature isolation.
- Internationalization.
- Accessibility.
- Performance.
- Local-first processing.
- The zero ads/login/paywall philosophy.

## Security

Please do not report security vulnerabilities through public issues.

See [SECURITY.md](SECURITY.md) for the reporting process.

## Changelog

Project changes are tracked in [CHANGELOG.md](CHANGELOG.md).

## License

VeryKit is released under the [MIT License](LICENSE).
