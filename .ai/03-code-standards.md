# Code Standards

## Phase 1 Notice

During Phase 1, no application source code should be created.

This document defines standards for future implementation phases.

## Engineering Values

VeryKit code should be:

- Clear.
- Small.
- Strongly typed.
- Easy to review.
- Easy to test.
- Feature-isolated.
- Internationalized.
- Accessible.
- Performance-aware.

## TypeScript Standards

Use TypeScript strictly.

Expected rules:

- Avoid `any`.
- Prefer explicit domain types.
- Prefer inferred local types when obvious.
- Use discriminated unions for state variants.
- Use `unknown` for untrusted input before validation.
- Prefer `readonly` where useful for constants and metadata.
- Keep public utility function signatures clear.

Avoid:

- Broad object types.
- Stringly typed domain logic.
- Unsafe casts.
- Deeply nested conditional types without strong reason.

## React Standards

Use React with a simple mental model.

Guidelines:

- Prefer Server Components when interactivity is not needed.
- Use Client Components only when browser state or APIs are required.
- Keep components small and purposeful.
- Separate pure transformation logic from UI components.
- Avoid large components that mix parsing, validation, rendering, and clipboard behavior.

## Component Naming

Use descriptive names:

- `ToolHeader`
- `ToolResult`
- `JsonCompareInput`
- `CpfGeneratorControls`
- `CopyButton`

Avoid unclear names:

- `Wrapper`
- `Box`
- `Thing`
- `MainComponent`

## File Naming

Recommended naming:

- React components: `kebab-case.tsx` or local convention selected during scaffolding.
- Utilities: `kebab-case.ts`.
- Types: `types.ts`.
- Schemas: `schema.ts` or `schemas.ts`.
- Metadata: `metadata.ts`.
- Tests: `*.test.ts`.

Whatever convention is chosen during implementation must be applied consistently.

## Function Design

Functions should:

- Do one thing.
- Be easy to name.
- Be easy to test.
- Prefer pure behavior.
- Return typed results.
- Avoid hidden side effects.

Prefer:

- `formatJson(input: string): FormatJsonResult`
- `isValidCpf(value: string): boolean`
- `generateUuidBatch(count: number): string[]`

Avoid:

- Functions that mutate external state.
- Functions that read directly from the DOM.
- Functions that both validate and render UI.

## Error Modeling

Prefer typed results for expected validation failures.

Example result model direction:

```text
success result:
  ok: true
  value: ...

failure result:
  ok: false
  errorKey: ...
  details: ...
```

Actual implementation may vary, but predictable error modeling is required.

## Comments

Comments should be surgical.

Use comments to explain:

- Non-obvious domain rules.
- Edge cases.
- Standards references.
- Intent behind a tricky implementation.

Do not comment obvious assignments or repeat function names in prose.

## Internationalization Rule

No user-facing string may be hardcoded in React components once implementation begins.

User-facing strings include:

- Labels.
- Button text.
- Placeholder text.
- Error messages.
- Success messages.
- Empty states.
- Tool descriptions.
- FAQ content.
- SEO metadata.

Allowed hardcoded strings:

- Internal ids.
- Stable slugs.
- Tool names that intentionally remain untranslated.
- Test fixtures when appropriate.

## Accessibility Rule

Every interactive element must have:

- A clear accessible name.
- Keyboard support.
- Visible focus state.
- Appropriate disabled state.

Forms must have:

- Labels.
- Error associations.
- Helpful messages where necessary.

## Linting

The project should use ESLint with rules appropriate for:

- Next.js.
- React.
- TypeScript.
- Accessibility.
- Import consistency.

Linting should catch:

- Unused variables.
- Invalid hooks usage.
- Missing React dependency issues where relevant.
- Common accessibility mistakes.
- Unsafe TypeScript usage where practical.

## Formatting

Use Prettier for consistent formatting.

Rules:

- Do not manually fight formatter output.
- Keep formatting deterministic.
- Avoid unrelated formatting churn in pull requests.

## Imports

Import rules:

- Prefer clear local imports.
- Keep shared imports intentional.
- Avoid circular dependencies.
- Avoid importing from another feature folder unless explicitly approved.
- Use path aliases if configured during implementation.

Recommended import layering:

1. External libraries.
2. Shared project modules.
3. Feature-local modules.
4. Types.
5. Styles if applicable.

## Dependency Rules

Before adding a package:

- Confirm it solves a real problem.
- Check maintenance health.
- Check bundle impact.
- Check TypeScript support.
- Check security posture.
- Confirm it works in Next.js App Router.

Do not add packages for trivial utilities.

## Testing Rule

All non-trivial utility functions must have Vitest coverage.

Examples requiring tests:

- CPF validation.
- JSON formatting error mapping.
- UUID batch generation.
- Hash generation.
- Case conversion.
- Timestamp conversion.
- Regex helper behavior.

## Pull Request Standards

Every PR should explain:

- What changed.
- Why it changed.
- How it was tested.
- Whether it affects i18n.
- Whether it affects accessibility.
- Whether it affects SEO.
- Whether it adds dependencies.

## Review Priorities

Reviewers should prioritize:

- Correctness.
- User experience.
- Accessibility.
- i18n completeness.
- Bundle size.
- Security.
- Test coverage.
- Architectural fit.

## Anti-Patterns

Avoid:

- Large shared utility files with unrelated functions.
- Tool implementations spread across many global folders.
- Hidden network calls.
- Hardcoded English text.
- UI components with business logic from multiple tools.
- Over-abstracting before duplication is real.
- Adding a global state library too early.
- Introducing authentication or persistence without product approval.
- Making the product feel commercial.
