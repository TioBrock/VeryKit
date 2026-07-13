# Contributing to VeryKit

Thank you for your interest in contributing to VeryKit.

VeryKit is an open source project focused on free, fast, accessible tools for QA Engineers and Developers. Contributions are welcome, but they must respect the project's product philosophy and quality standards.

## Project Principles

Every contribution should preserve these principles:

- Free forever for core tools.
- No ads, no forced login, no paywall, no invasive tracking.
- Local-first processing whenever possible.
- Fast workflows and accessible UX.
- International support from day one.

## Getting Started

```bash
git clone https://github.com/TioBrock/VeryKit.git
cd VeryKit
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Commands

```bash
npm run dev        # Start development server
npm test           # Run unit tests
npm run build      # Build for production
npm run lint       # Run ESLint
```

## Adding a New Tool

Each new tool must follow the isolated feature architecture:

1. Create `src/features/[tool-name]/` with:
   - `components/[ToolName]Form.tsx` — Client component with `"use client"`
   - `utils/[function].ts` — Pure utility functions (no React dependencies)
   - `tests/[function].test.ts` — Unit tests for utility logic
   - `index.ts` — Barrel export

2. Create route `src/app/[locale]/tools/[tool-name]/page.tsx` with:
   - `generateMetadata` using `getTranslations` for SEO
   - JSON-LD structured data

3. Add i18n namespaces in `messages/en.json`, `messages/pt-BR.json`, `messages/es.json`:
   - Tool name in `toolNames` section
   - Full namespace with: title, description, examples, FAQ, whenToUse

4. Register in `src/lib/tools-catalog.ts` with correct category and keywords.

5. Add unit tests for all utility functions.

## Code Standards

- TypeScript strict mode.
- No hardcoded user-facing strings — use `next-intl`.
- Pure utility functions for business logic.
- Client components for UI (`"use client"`).
- Server components for route pages.
- Tailwind CSS for styling (no inline styles).
- Follow existing patterns in `src/features/uuid-generator/` as reference.

## Pull Request Guidelines

Every PR should include:

- What changed and why.
- Which files were affected.
- Screenshots for UI changes.
- Test results if applicable.

Keep PRs focused on a single change.

## Internationalization

VeryKit supports English (`en`), Portuguese Brazil (`pt-BR`), and Spanish (`es`).

All user-facing strings must use `useTranslations()` or `getTranslations()`. Never hardcode text in components.

## Security

Do not report security vulnerabilities in public issues. See [SECURITY.md](SECURITY.md).

## License

By contributing to VeryKit, you agree that your contributions will be licensed under the MIT License.
