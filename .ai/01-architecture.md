# Architecture Guidelines

## Architectural Intent

VeryKit must be simple to navigate, simple to extend, and simple to review.

The architecture should support dozens of tools without turning the repository into a tangled set of shared components and hidden dependencies. Each tool should be as independent as practical while still sharing a consistent design system, routing convention, metadata model, and utility foundation.

## Required Framework Direction

When implementation begins, the project must use:

- Next.js App Router.
- React.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- next-intl.
- next-themes.
- Vitest.

## Rendering Strategy

Use Server Components by default when the UI is static, content-driven, or metadata-driven.

Use Client Components when a tool requires:

- Local state.
- Form input.
- Clipboard access.
- Browser APIs.
- Dynamic validation while typing.
- Theme interaction.
- Local storage or cookies.
- Complex client-side transformation.

The default assumption is that tool processing should happen client-side unless there is a strong documented reason not to.

## No Backend By Default

VeryKit should not introduce a backend, database, authentication system, or server API for normal tool operation.

Allowed server-side behavior:

- Static metadata generation.
- Static route generation.
- Sitemap generation.
- robots.txt generation.
- Internationalized routing support.
- Serving static assets.

Avoid server-side behavior for:

- Tool calculations that can run locally.
- User input processing.
- Persistence.
- User-specific state.
- Analytics pipelines.

## Recommended Folder Structure

The implementation phase should use a structure similar to:

```text
src/
  app/
    [locale]/
      page.tsx
      layout.tsx
      tools/
        [slug]/
          page.tsx
    robots.ts
    sitemap.ts
  components/
    ui/
    layout/
    navigation/
    tool/
  features/
    json-compare/
      components/
      utils/
      types/
      schemas/
      tests/
      metadata.ts
      index.ts
    cpf-generator/
      components/
      utils/
      types/
      schemas/
      tests/
      metadata.ts
      index.ts
  hooks/
  lib/
    i18n/
    seo/
    tools/
    validation/
  styles/
  types/
  utils/
public/
messages/
  en.json
  pt-BR.json
  es.json
```

This is a target architecture, not Phase 1 implementation work.

## Feature-First Tool Isolation

Each tool must live in its own feature folder.

A feature folder may contain:

- Tool-specific components.
- Tool-specific utilities.
- Tool-specific validation schemas.
- Tool-specific types.
- Tool-specific tests.
- Tool-specific examples.
- Tool-specific metadata.

Feature folders should not casually import from each other. Shared behavior belongs in `src/lib/`, `src/utils/`, or `src/components/tool/` only after at least two tools clearly need it.

## Shared Layers

### `components/ui`

Contains shadcn/ui primitives and small design-system-level wrappers.

Rules:

- Keep primitives generic.
- Do not place business logic here.
- Do not place tool-specific copy here.

### `components/tool`

Contains shared layouts and interaction components for tool pages.

Examples:

- Tool shell.
- Tool header.
- Result panel.
- Copy button.
- Clear button.
- Example list.
- FAQ block.

### `lib/tools`

Contains registry and shared metadata helpers.

Responsibilities:

- Tool discovery.
- Category mapping.
- Search metadata.
- Popular/recent grouping.
- Route generation.

### `lib/seo`

Contains SEO helpers.

Responsibilities:

- Metadata construction.
- Open Graph defaults.
- Canonical URL generation.
- International alternate links.
- Schema.org helpers.

### `lib/i18n`

Contains internationalization configuration and helpers.

Responsibilities:

- Locale definitions.
- Locale fallback.
- Message loading.
- Route helpers.
- Cookie/localStorage integration strategy.

### `utils`

Contains generic pure functions.

Rules:

- Must not depend on React.
- Must not depend on Next.js.
- Should be easy to test with Vitest.

## Tool Registry

VeryKit should use a central registry for tool metadata.

The registry should describe:

- Tool id.
- Stable slug.
- Display name.
- Category.
- Regional scope.
- Popular/recent flags.
- Search keywords.
- i18n message keys.
- Route.
- Tool status.

The registry should not contain large translated descriptions directly. It should reference translation keys.

## Tool Statuses

Recommended statuses:

- `planned`
- `designing`
- `in-progress`
- `beta`
- `stable`
- `deprecated`

Only stable or beta tools should appear as fully usable tools in production navigation.

## Routing Model

Recommended public routes:

```text
/{locale}
/{locale}/tools
/{locale}/tools/{tool-slug}
/{locale}/about
```

Default locale handling should redirect or rewrite based on the configured i18n strategy.

Tool slugs must be stable. Renaming a slug should be treated as a breaking SEO decision and require redirects.

## Data Flow

Typical tool data flow:

1. User enters or generates data in the tool interface.
2. Client-side validation runs with local logic and optional Zod schema.
3. Client-side utility transforms or validates the input.
4. Result is shown locally.
5. User can copy the result.
6. No input is sent to a server unless explicitly documented in a future feature.

## State Management

Prefer local component state for tool interactions.

Avoid introducing global state management libraries unless repeated real use cases appear.

Acceptable global state:

- Theme.
- Locale.
- Possibly UI preferences.

Avoid global state for:

- Tool input.
- Tool output.
- Temporary validation errors.
- One-off control state.

## Validation Strategy

Use Zod when:

- Form validation has multiple fields.
- Validation rules need to be reusable.
- Type inference improves correctness.
- Error messages need consistent mapping to i18n keys.

Do not use Zod for trivial transformations where a small pure function is clearer.

## Forms

Use React Hook Form when:

- A tool has multiple fields.
- Validation is non-trivial.
- Field-level errors matter.
- Reset behavior needs to be predictable.

For very simple inputs, controlled React state may be enough.

## Clipboard Strategy

Clipboard behavior must:

- Use browser Clipboard API when available.
- Provide clear success and error messages.
- Be keyboard accessible.
- Never silently fail.
- Avoid copying hidden or stale results.

## Error Handling

Errors should be:

- Human-readable.
- Localized.
- Specific enough to fix the input.
- Visually clear.
- Announced to assistive technologies when relevant.

Avoid:

- Raw stack traces.
- Technical jargon in user-facing messages.
- Generic `Something went wrong` messages when the cause is known.

## Dependency Policy

Dependencies are architectural decisions.

Before adding a dependency, evaluate:

- Can this be implemented safely with native APIs?
- Is the package maintained?
- Is the package tree-shakeable?
- Does it affect bundle size?
- Does it run client-side safely?
- Does it introduce security concerns?
- Is it compatible with Next.js App Router?

## Build and Deployment Direction

The project must be deployable to Vercel without manual configuration.

Expected deployment properties:

- Static-first where possible.
- No required environment variables for core functionality.
- No database provisioning.
- No external service setup.
- No custom server.

## Architectural Review Checklist

Before approving an implementation change, verify:

- It follows the current project phase.
- It keeps tool logic isolated.
- It uses shared abstractions only when justified.
- It avoids backend/database/auth unless approved.
- It preserves i18n.
- It preserves accessibility.
- It avoids hardcoded user-facing strings.
- It keeps bundle impact low.
- It includes relevant tests for utility logic.
- It does not introduce commercial or tracking behavior.
