# UI Guidelines

## UI Goal

VeryKit's interface should make technical work feel quick and orderly.

The UI should never compete with the user's task.

## Visual Tone

Use a calm, productivity-oriented visual style:

- Neutral surfaces.
- Clear typography.
- Subtle borders.
- Restrained accents.
- Plenty of whitespace.
- Predictable controls.
- Small, purposeful motion.

## Layout Requirements

### Home

The home page must include:

- Logo.
- Product name.
- Slogan.
- Search field.
- Categories.
- Popular tools.
- Recent tools.
- About section.
- Footer.

Search should be visually central and immediately usable.

### Tool Pages

Every tool page must include:

- Tool title.
- Short description.
- Main input area.
- Primary action.
- Clear action.
- Copy action.
- Result area.
- Error/success messages.
- Examples.
- FAQ.
- "When to use this" section.

The primary tool workflow should appear before supporting content.

## Tool Page Layout Pattern

Recommended hierarchy:

1. Header with title and description.
2. Work area.
3. Action row.
4. Result panel.
5. Examples.
6. When to use.
7. FAQ.
8. Related tools where useful.

## Action Placement

Primary actions should be visible and consistent.

Common action order:

- Primary action.
- Copy.
- Clear.

The exact order may vary by tool, but it should remain predictable across similar tools.

## Input Layout

Inputs must be comfortable on mobile and desktop.

Rules:

- Labels must be visible or programmatically available.
- Large text inputs should not cause horizontal scrolling.
- Placeholders must not replace labels.
- Error states must be visually and semantically connected.

## Result Layout

Result areas should:

- Preserve formatting.
- Use monospace for code/data.
- Provide copy action.
- Make empty state clear.
- Avoid sudden layout shifts.

## Search UI

Search should:

- Filter instantly.
- Match tool names, descriptions, categories, and keywords.
- Support keyboard navigation.
- Show empty states.
- Make result selection easy on mobile.

## Categories UI

Categories should help users browse without becoming heavy navigation.

Each category should show:

- Name.
- Short description.
- Tool count.
- Tool list or preview.

## Popular and Recent Tools

Popular and recent sections should help discovery.

Do not pretend usage data exists if it does not. Initially, "popular" can be curated based on expected demand and documented as such internally.

## Empty States

Empty states should be short and helpful.

Examples:

- No search results.
- No generated result yet.
- Invalid input.

Empty states should not become marketing copy.

## Error States

Errors should:

- Identify the issue.
- Suggest correction when possible.
- Avoid blame.
- Avoid raw technical noise.
- Be announced accessibly when relevant.

## Success States

Success states should be subtle.

Examples:

- Copy confirmation.
- Generation confirmation.
- Validation pass.

Avoid celebratory or distracting feedback.

## Animation Guidelines

Use animation only when it helps orientation.

Requirements:

- Keep motion subtle.
- Respect `prefers-reduced-motion`.
- Avoid blocking interactions.
- Avoid decorative motion on utility pages.

## Responsive Requirements

Mobile:

- Inputs full width.
- Actions easy to tap.
- No horizontal scrolling.
- Tool result remains readable.

Tablet:

- Use available width without stretching line length too far.
- Keep actions close to the work area.

Desktop:

- Use balanced layout.
- Avoid excessive empty side space.
- Keep support content readable.

## Touch Targets

Interactive controls should be large enough for touch.

Icon-only controls must have:

- Accessible label.
- Tooltip where helpful.
- Visible focus state.

## Visual Accessibility

Requirements:

- Strong contrast.
- Visible focus outlines.
- Text must not overlap.
- Text must not rely on color alone.
- Disabled states must remain understandable.
- Long translated text must fit.

## shadcn/ui Usage

Use shadcn/ui components as the base system.

Rules:

- Keep variants consistent.
- Avoid one-off component styling unless necessary.
- Prefer composition over modifying primitives deeply.
- Do not create tool-specific behavior inside generic UI primitives.

## Lucide Icon Usage

Use Lucide Icons for:

- Copy.
- Clear.
- Search.
- Theme.
- Language.
- External links.
- Tool categories.

Do not mix icon sets unless a specific future requirement justifies it.

## UI Review Checklist

Before approving UI:

- The primary workflow is obvious.
- The layout works on mobile.
- Text fits in all supported locales.
- Actions are keyboard accessible.
- Focus is visible.
- Error/success states are clear.
- Dark mode works.
- The page feels consistent with VeryKit.
- There is no unnecessary visual decoration.
