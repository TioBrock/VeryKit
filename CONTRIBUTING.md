# Contributing to VeryKit

Thank you for your interest in contributing to VeryKit.

VeryKit is an open source project focused on free, fast, accessible tools for QA Engineers and Developers. Contributions are welcome, but they must respect the project's product philosophy and quality standards.

## Current Project Phase

VeryKit is currently in **Phase 1: Architecture and Documentation**.

During this phase, contributions should be limited to:

- Documentation.
- Product clarification.
- Architecture notes.
- Design guidelines.
- Accessibility guidelines.
- i18n strategy.
- SEO strategy.
- Testing strategy.
- Open source governance files.

Please do not submit application source code yet.

Not accepted during Phase 1:

- Next.js app files.
- React components.
- TypeScript implementation files.
- CSS files.
- Test files.
- Package manifests.
- Dependency installation.
- Build configuration.

## Project Principles

Every contribution should preserve these principles:

- Free forever for core tools.
- No ads.
- No forced login.
- No paywall.
- No invasive tracking.
- Local-first processing whenever possible.
- Fast workflows.
- Accessible UX.
- International support from day one.
- Clear architecture.

## Before You Start

Read the project documentation:

- `.ai/master-prompt.md`
- `.ai/00-product.md`
- `.ai/01-architecture.md`
- `.ai/03-code-standards.md`
- `.ai/04-features.md`
- `.ai/05-i18n.md`
- `.ai/13-ui-guidelines.md`
- `.ai/14-accessibility.md`
- `.ai/16-security.md`

For small documentation fixes, you do not need to read every file, but you should still make sure your change does not conflict with the product philosophy.

## How to Contribute During Phase 1

1. Open or choose an issue when available.
2. Fork the repository.
3. Create a focused branch.
4. Edit only the relevant documentation files.
5. Keep language clear and consistent.
6. Open a pull request with a concise explanation.

Suggested branch names:

- `docs/product-clarity`
- `docs/accessibility-guidelines`
- `docs/i18n-rules`
- `docs/contributing-update`

## Future Local Development

Application setup does not exist yet.

When implementation begins, this guide will be updated with the exact commands for:

- Installing dependencies.
- Running the development server.
- Running tests.
- Running lint.
- Running type checks.
- Building the application.

Until then, do not add placeholder setup commands that have not been verified.

## Pull Request Guidelines

Every pull request should include:

- What changed.
- Why it changed.
- Which files were affected.
- Whether the change affects product scope.
- Whether the change affects future architecture.

For future implementation PRs, include:

- Testing notes.
- Screenshots or recordings for UI changes.
- Accessibility notes.
- i18n notes.
- SEO notes.
- Dependency notes.

## Pull Request Scope

Keep PRs focused.

Good PRs:

- Update one documentation topic.
- Add missing guidance.
- Clarify a rule.
- Fix inconsistency.
- Improve contributor onboarding.

Avoid PRs that:

- Mix unrelated documentation changes.
- Rewrite large files without a clear reason.
- Introduce implementation work during Phase 1.
- Add unverified claims.
- Add commercial mechanics or tracking ideas.

## Documentation Style

Documentation should be:

- Clear.
- Specific.
- Organized.
- Honest about project status.
- Friendly to contributors.
- Technical enough to guide implementation.

Avoid:

- Empty buzzwords.
- Overpromising.
- Claims that are not true yet.
- Duplicating large sections unnecessarily.
- Ambiguous rules.

## Future Tool Contribution Requirements

When tool implementation is allowed in a later phase, each new tool will need:

- Isolated feature folder.
- Stable route.
- Tool metadata.
- Localized messages.
- Accessible UI.
- Client-side processing where possible.
- Unit tests for utility logic.
- Examples.
- FAQ.
- "When to use this" section.
- SEO metadata.

## Internationalization Requirements

VeryKit supports:

- English (`en`).
- Portuguese Brazil (`pt-BR`).
- Spanish (`es`).

Future implementation must not hardcode user-facing strings in components.

Tool names remain untranslated, but descriptions, messages, examples, FAQ content, and metadata must be translated.

## Accessibility Requirements

Future UI contributions must support:

- Keyboard navigation.
- Visible focus states.
- Semantic HTML.
- Accessible labels.
- Clear error messages.
- Adequate contrast.
- Mobile and desktop usage.

Accessibility improvements are always welcome.

## Dependency Policy

Future dependency additions must be justified.

A dependency PR must explain:

- Why native APIs are insufficient.
- Bundle impact.
- Security considerations.
- Maintenance status.
- Alternatives considered.

Do not add dependencies during Phase 1.

## Security

Do not report security vulnerabilities in public issues.

Follow [SECURITY.md](SECURITY.md).

## Code of Conduct

All contributors must follow [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Review Process

Maintainers will review contributions for:

- Alignment with project phase.
- Product fit.
- Clarity.
- Technical quality.
- Accessibility impact.
- i18n impact.
- Security impact.
- Maintainability.

Review feedback should be direct, respectful, and specific.

## License

By contributing to VeryKit, you agree that your contributions will be licensed under the MIT License.
