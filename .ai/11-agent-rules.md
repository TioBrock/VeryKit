# Agent Rules

## Purpose

This document defines behavior rules for AI agents working on VeryKit.

Agents must treat these rules as project constraints, not suggestions.

## Current Phase Rule

VeryKit is currently in:

**Phase 1: Architecture and Documentation**

Agents must not create application source code during Phase 1.

Allowed:

- Markdown documentation.
- License files.
- Governance files.
- Planning documents.

Forbidden:

- `.ts` files.
- `.tsx` files.
- `.css` files.
- Next.js configuration.
- package manifests.
- test files.
- generated source assets.
- application scaffolding.

## Required Reading

Before making project changes, agents should read relevant `.ai/` documentation.

Minimum reading for future implementation:

- `.ai/master-prompt.md`
- `.ai/00-product.md`
- `.ai/01-architecture.md`
- `.ai/05-i18n.md`
- `.ai/13-ui-guidelines.md`
- `.ai/14-accessibility.md`

## Product Philosophy Rule

Every change must support the core workflow:

1. Open VeryKit.
2. Choose or search a tool.
3. Solve the task quickly.
4. Copy the result.
5. Leave.

Do not optimize for engagement, retention tricks, or monetization.

## Commercial Boundary

Agents must not introduce:

- Ads.
- Paywalls.
- Signup walls.
- Forced login.
- Newsletter gates.
- Affiliate blocks.
- Sponsored rankings.
- Invasive analytics.

## Privacy Rule

Agents must prefer local processing.

Do not send user input to external APIs unless:

- The product requirement explicitly demands it.
- The privacy implications are documented.
- The behavior is visible to users.
- Maintainers approve the architecture.

## Architecture Rule

Future implementation must be feature-first.

Agents should:

- Keep tools isolated.
- Avoid cross-feature imports.
- Use shared modules only for proven shared needs.
- Keep functions small.
- Keep types strong.
- Avoid broad abstractions too early.

## Internationalization Rule

Agents must not hardcode user-facing strings once implementation begins.

All visible text must go through the i18n system.

Supported locales:

- `en`
- `pt-BR`
- `es`

Tool names remain untranslated.

## Accessibility Rule

Agents must preserve accessibility.

Interactive UI must include:

- Keyboard support.
- Visible focus.
- Accessible names.
- Proper labels.
- Error associations.
- Adequate contrast.

## Performance Rule

Agents must consider bundle size and runtime performance.

Avoid:

- Heavy dependencies for small utilities.
- Unnecessary client components.
- Blocking scripts.
- Remote calls for local transformations.
- Large shared bundles for rare tools.

## SEO Rule

Every public page and tool page must support:

- Localized metadata.
- Stable route.
- Canonical URL.
- International alternates.
- Useful content.

## Testing Rule

Future utility logic must include Vitest tests.

Agents should add tests for:

- Validators.
- Generators.
- Formatters.
- Parsers.
- Converters.
- Edge cases.

## Dependency Rule

Before adding a dependency, agents must justify:

- Why it is necessary.
- Bundle impact.
- Maintenance status.
- Security posture.
- Alternatives considered.

## Design Rule

Agents must follow the VeryKit design direction:

- Calm.
- Minimal.
- Useful.
- Consistent.
- Accessible.
- Minimalista Moderno Proprietário (original VeryKit identity).

Do not create decorative-heavy interfaces or marketing-style tool pages.

## Documentation Rule

Documentation should stay close to the truth.

Do not claim:

- A tool exists when it is only planned.
- CI exists when it does not.
- Deployment is configured when it is not.
- Tests are passing when they have not been run.

## Change Scope Rule

Agents should keep changes focused.

Avoid:

- Unrelated refactors.
- Formatting churn.
- Renaming without need.
- Moving files without architectural reason.

## Review Rule

Before finishing, agents should verify:

- They respected the phase.
- They touched only relevant files.
- They did not introduce forbidden files.
- Documentation is internally consistent.
- Public docs match internal docs.

## Escalation Rule

If requirements conflict, agents should prioritize:

1. User's latest explicit instruction.
2. Phase constraints.
3. Product philosophy.
4. Architecture rules.
5. Local codebase patterns.

If still ambiguous, ask a concise question instead of inventing risky behavior.
