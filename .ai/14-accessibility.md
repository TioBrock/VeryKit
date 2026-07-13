# Accessibility Guidelines

## Accessibility Principle

VeryKit must be usable by as many people as possible.

Accessibility is not an optional enhancement. It is part of the definition of product quality.

## Target Standard

VeryKit should follow WCAG-oriented practices with a goal of strong conformance for:

- Perceivable content.
- Operable interfaces.
- Understandable flows.
- Robust markup.

Lighthouse Accessibility target:

- Greater than 95.

## Semantic HTML

Use semantic elements where appropriate:

- `header`
- `nav`
- `main`
- `section`
- `article`
- `footer`
- `form`
- `label`
- `button`

Avoid using generic elements for interactive controls.

## Headings

Heading structure must be logical.

Rules:

- Use one clear primary heading per page.
- Do not skip heading levels for visual styling.
- Use headings to describe structure.
- Do not use headings only for decoration.

## Keyboard Navigation

Every interactive feature must be usable with keyboard alone.

Required:

- Logical tab order.
- Visible focus.
- Enter/Space activation where expected.
- Escape behavior for dismissible overlays.
- Arrow key behavior for menus/tabs when applicable.

Critical keyboard flows:

- Search for a tool.
- Open a tool.
- Enter input.
- Run primary action.
- Copy result.
- Clear input.
- Change language.
- Change theme.

## Focus Management

Focus should be predictable.

Guidelines:

- Do not remove focus outlines.
- Use focus-visible styling.
- Move focus intentionally after route changes or modal interactions.
- Return focus after closing overlays.
- Consider focusing useful fields after clear/reset actions.

## Forms

Form controls must have:

- Labels.
- Accessible descriptions where helpful.
- Error messages associated with fields.
- Required state indicated programmatically when applicable.

Placeholders must not be the only label.

## Error Messages

Errors should be:

- Clear.
- Specific.
- Localized.
- Programmatically associated with the relevant input.
- Announced when dynamically displayed if appropriate.

Do not rely on color alone.

## Success Messages

Success messages, such as copy confirmations, should be accessible.

Use appropriate live regions for transient feedback when needed.

## ARIA

Use ARIA only when native HTML is not enough.

Good ARIA use cases:

- Icon-only button labels.
- Live region feedback.
- Describing dynamic errors.
- Complex widgets when using accessible primitives.

Avoid ARIA that conflicts with native semantics.

## Color Contrast

Text and interface elements must meet accessible contrast expectations.

Check both:

- Light mode.
- Dark mode.

Do not use low-contrast placeholder text for essential information.

## Motion

Respect reduced motion preferences.

Avoid:

- Continuous motion.
- Large transitions.
- Animations required to understand state.
- Motion that delays interaction.

## Responsive Accessibility

Accessibility must hold across:

- Mobile.
- Tablet.
- Desktop.

Mobile requirements:

- Touch targets large enough.
- No horizontal scrolling.
- Labels remain visible.
- Buttons remain reachable.
- Result areas remain readable.

## Screen Reader Support

Screen reader users should understand:

- Page purpose.
- Tool purpose.
- Input labels.
- Button actions.
- Result state.
- Error state.
- Success state.

Dynamic changes should be announced when important.

## Icon-Only Controls

Icon-only controls must include:

- Accessible name.
- Tooltip when helpful.
- Visible focus state.
- Adequate hit area.

Examples:

- Copy.
- Clear.
- Search.
- Theme toggle.
- Language switcher.

## Clipboard Accessibility

Copy action must:

- Be reachable by keyboard.
- Have a clear accessible name.
- Announce success/failure.
- Avoid requiring pointer-only interaction.

## Internationalization and Accessibility

Localized content can be longer.

Layouts must support:

- Longer button labels.
- Longer error messages.
- Longer descriptions.
- Different sentence lengths.

Language attributes should match the active locale.

## Testing Accessibility

Accessibility should be checked through:

- Keyboard-only manual testing.
- Lighthouse.
- Automated accessibility tooling when added.
- Screen reader spot checks.
- Mobile viewport checks.

## Accessibility Review Checklist

Before approving UI:

- Page has semantic structure.
- Heading order is logical.
- All controls have accessible names.
- Form labels are present.
- Errors are associated and clear.
- Focus is visible.
- Keyboard flow works.
- Contrast is sufficient.
- Motion respects preferences.
- Mobile layout is usable.
