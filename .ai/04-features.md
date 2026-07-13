# Feature and Tool Implementation Standard

## Phase 1 Notice

No features or tool source code should be implemented during Phase 1.

This document defines how tools must be implemented in future phases.

## Definition of a Tool

A tool is a focused utility that helps users complete one common QA or development task.

Examples:

- JSON Compare.
- CPF Generator/Validator.
- UUID Generator.
- Regex Tester.
- JWT Decoder.
- Timestamp Converter.

Each tool must be:

- Fast.
- Local-first.
- Accessible.
- Internationalized.
- Independently testable.
- Consistent with the shared UI pattern.

## Tool Folder Structure

Each tool should live under `src/features/{tool-slug}/`.

Target structure:

```text
src/features/{tool-slug}/
  components/
  utils/
  types/
  schemas/
  tests/
  metadata.ts
  index.ts
```

This is a target for future implementation, not a Phase 1 task.

## Tool Metadata

Every tool should define metadata used by navigation, search, SEO, and routing.

Metadata should include:

- Stable id.
- Slug.
- Display name.
- Category.
- Optional subcategory.
- Regional scope.
- Keywords.
- Popular flag.
- Recent flag.
- Status.
- i18n keys.
- Related tools.

Tool names remain untranslated. Descriptions and supporting content are translated.

## Categories

Initial categories:

- Data.
- API.
- Testing.
- Utilities.

Future category:

- Regional Tools.

Regional tools should identify their country or region explicitly.

## Tool Page Contract

Every tool page must provide:

- Title.
- Description.
- Main input or configuration controls.
- Primary action.
- Clear action.
- Copy action.
- Result area.
- Success message.
- Error message.
- Examples.
- FAQ.
- "When to use this" section.

## User Interaction Rules

### Primary Action

Each tool must have one obvious primary action:

- Generate.
- Validate.
- Format.
- Compare.
- Convert.
- Decode.
- Encode.

### Copy

Copy must be available whenever there is a result worth copying.

Copy behavior must:

- Copy the current visible result.
- Provide success feedback.
- Provide error feedback when clipboard access fails.
- Be accessible by keyboard.

### Clear

Clear must:

- Reset inputs.
- Reset result state.
- Reset validation messages.
- Return focus to a useful location when appropriate.

## Validation

Validation should be immediate when it improves UX and action-based when live validation would be distracting.

Validation errors should:

- Be specific.
- Be localized.
- Explain how to fix the input when possible.
- Be associated with the related field.

## Result Handling

Results should be typed.

Recommended result categories:

- Empty.
- Success.
- Validation error.
- Processing error.

Expected UI behavior:

- Empty result shows a calm empty state.
- Success result shows output and copy action.
- Validation error explains the issue.
- Processing error avoids raw technical details.

## Examples

Each tool should include examples that demonstrate common use.

Examples should be:

- Short.
- Useful.
- Localized.
- Safe to copy.
- Representative of real workflows.

## FAQ

Each tool should include a small FAQ when helpful.

FAQ content should answer:

- What the tool does.
- Whether data leaves the browser.
- Common validation details.
- Limitations.
- Related tools.

## "When To Use This" Section

This section should explain practical use cases.

Examples:

- Use JSON Compare when reviewing API response differences.
- Use CPF Generator when testing Brazilian form validation.
- Use JWT Decoder when inspecting token payloads during debugging.

## Local-First Processing

Tool logic should run in the browser whenever possible.

Do not send user input to a remote API for:

- JSON formatting.
- Token decoding.
- CPF/CNPJ validation.
- Base64 encoding.
- URL encoding.
- Hashing where browser APIs are sufficient.
- Text diffing.

If a future feature requires remote processing, it must have a documented privacy review.

## Utility Function Rules

Tool utility functions should:

- Be pure when possible.
- Avoid React dependencies.
- Avoid DOM dependencies.
- Accept explicit inputs.
- Return explicit outputs.
- Be tested with Vitest.

## Shared Abstractions

Do not create shared abstractions too early.

Move code to shared modules only when:

- At least two tools need the same behavior.
- The abstraction has a clear name.
- The abstraction does not hide important domain differences.
- Tests can cover it independently.

## Search Integration

Every tool must define search keywords.

Examples:

- CPF Generator/Validator: `cpf`, `brazil`, `document`, `validator`, `generator`, `qa`, `test data`.
- JSON Compare: `json`, `diff`, `compare`, `api`, `payload`.
- JWT Decoder: `jwt`, `token`, `decode`, `claims`, `auth`.

Search should match:

- Tool name.
- Category.
- Keywords.
- Description.
- Regional hints.

## SEO Integration

Every tool page must have:

- Localized title.
- Localized description.
- Canonical URL.
- `hreflang` alternates.
- Open Graph metadata.
- Optional structured data where useful.

## Accessibility Requirements

Tool implementation must support:

- Keyboard-only usage.
- Screen readers.
- Focus-visible states.
- Labels for inputs.
- Accessible error messages.
- Accessible copy feedback.
- Reduced-motion preferences.

## Tool Acceptance Checklist

A tool is ready when:

- It follows the shared page structure.
- It has localized messages.
- It has metadata in the registry.
- It has a stable route.
- It runs locally where possible.
- It has unit tests for utility logic.
- It works in light and dark mode.
- It works on mobile.
- It is keyboard accessible.
- It has SEO metadata.
- It does not introduce unnecessary dependencies.
