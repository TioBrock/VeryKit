# Testing Strategy

## Phase 1 Notice

No tests should be implemented during Phase 1.

This document defines the testing strategy for future implementation phases.

## Testing Philosophy

VeryKit tools must be reliable because users depend on them for quick work.

The testing strategy should focus on:

- Pure utility correctness.
- Edge cases.
- Validation behavior.
- Regression prevention.
- Accessibility-sensitive flows.
- Confidence without excessive test complexity.

## Required Test Runner

Use Vitest for unit tests.

Vitest should cover:

- Tool utilities.
- Validators.
- Formatters.
- Generators.
- Converters.
- Search helpers.
- Metadata helpers where useful.

## What Must Be Unit Tested

Unit tests are required for non-trivial utility logic, including:

- CPF validation and generation.
- CNPJ validation and generation.
- UUID generation helpers.
- Password generation constraints.
- JSON formatting and validation helpers.
- JSON comparison helpers.
- XML/JSON conversion helpers where implemented locally.
- JWT decoding helpers.
- Base64 encode/decode helpers.
- URL encode/decode helpers.
- Timestamp conversion helpers.
- Hash generation helpers.
- Case conversion helpers.
- Text diff helpers.
- Random test data generators.

## What Does Not Need Heavy Unit Testing

Avoid over-testing:

- Static layout-only components.
- shadcn/ui primitives.
- Simple pass-through wrappers.
- Framework behavior.
- Styling implementation details.

## Test Location

Tool-specific tests should live near the feature:

```text
src/features/json-compare/tests/
src/features/cpf-generator/tests/
```

Shared utilities should have tests near their shared module.

## Test Naming

Test files should use:

```text
*.test.ts
```

Use descriptive test names that explain expected behavior.

## Test Style

Tests should be:

- Small.
- Deterministic.
- Easy to read.
- Focused on behavior.
- Free from implementation detail coupling.

Prefer table-driven tests for validators and converters with many edge cases.

## Validation Test Cases

Validators should include tests for:

- Valid input.
- Invalid input.
- Empty input.
- Whitespace.
- Formatting characters.
- Boundary length.
- Known invalid repeated values.
- Non-numeric or malformed content where relevant.

## Generator Test Cases

Generators should include tests for:

- Correct output shape.
- Valid generated values.
- Requested count.
- Boundary counts.
- Invalid options.
- Deterministic behavior when a seeded strategy is introduced.

## Formatter Test Cases

Formatters should include tests for:

- Valid input.
- Invalid input.
- Empty input.
- Already formatted input.
- Minified input.
- Large but reasonable input.
- Error metadata where available.

## i18n Testing

i18n tests should verify:

- Required message keys exist for supported locales.
- Tool metadata references valid translation keys.
- No obvious missing locale entries for published tools.

Avoid testing translated wording too rigidly unless copy is part of a specific requirement.

## Accessibility Testing

Future implementation should include accessibility verification through:

- Manual keyboard testing.
- Screen reader spot checks.
- Automated checks when tooling is added.
- Lighthouse accessibility audits.

Critical flows:

- Search.
- Language switcher.
- Theme switcher.
- Tool input.
- Primary action.
- Copy action.
- Clear action.
- Error messages.

## Performance Testing

Performance should be checked with:

- Lighthouse.
- Bundle analysis when dependencies are added.
- Manual checks on slower network/device profiles where possible.

## Coverage Expectations

Coverage should support confidence, not vanity.

Recommended expectations:

- High coverage for utility modules.
- Meaningful edge case coverage for validators.
- Regression tests for reported bugs.
- Lower coverage acceptable for simple UI composition.

Avoid chasing 100% coverage if it creates brittle tests.

## Test Data

Test data should:

- Be safe.
- Be fake.
- Be clearly for testing.
- Avoid real personal data.

For regional document generators, use algorithmically valid but fake values only.

## Continuous Integration Direction

Future CI should run:

- Type check.
- Lint.
- Format check.
- Unit tests.
- Build.

Optional later:

- Accessibility checks.
- Lighthouse CI.
- Bundle size check.

## Bug Regression Policy

When a bug is fixed in utility logic, add a regression test when practical.

The test should fail before the fix and pass after the fix.

## Testing Checklist

Before approving a tool:

- Utility logic has Vitest tests.
- Edge cases are covered.
- Invalid input is covered.
- Error results are covered.
- i18n keys are present.
- Manual keyboard flow was checked.
- Copy/Clear behavior was checked.
- Mobile behavior was checked.
