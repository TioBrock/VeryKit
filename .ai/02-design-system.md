# Design System Guidelines

## Design Philosophy

VeryKit should feel calm, fast, precise, and trustworthy.

The visual standard is **Minimalista Moderno Proprietário** — an original design identity for VeryKit.

Technical inspiration comes from best practices in minimalism, typography, and performance found across the open source ecosystem, but the product must never replicate the logos, trademarks, or visual identity of any third-party company.

## Product Personality

VeryKit should feel:

- Minimal.
- Professional.
- Lightweight.
- Useful.
- Clear.
- Friendly without being cute.
- Technical without being intimidating.
- Polished without feeling decorative.

## Visual Principles

### Clarity

The user should immediately understand:

- What tool they are using.
- Where to paste or enter data.
- Which action to click.
- Where the result appears.
- How to copy the result.

### Consistency

All tools should share a familiar structure. The user should not need to relearn the interface from tool to tool.

### Restraint

Avoid visual noise:

- No loud gradients.
- No decorative blobs.
- No unnecessary illustrations.
- No marketing-heavy sections.
- No oversized hero treatments for utility pages.

### Focus

Tool pages should prioritize the task area. Supporting content such as examples and FAQ should help without competing with the primary workflow.

## Layout System

### Page Width

Use constrained content widths for readability.

Recommended layout approach:

- Home page: wider layout for search and tool discovery.
- Tool pages: focused work area with readable supporting content.
- Documentation-like pages: narrower measure for long text.

### Spacing

Use generous whitespace but keep workflows compact.

Spacing should make interfaces scannable without pushing primary actions below the fold unnecessarily.

### Responsive Layout

Every page must work well on:

- Mobile.
- Tablet.
- Desktop.
- Wide desktop.

The main tool action area should remain usable on small screens without horizontal scrolling.

## Typography

Typography should be clean, modern, and readable.

Guidelines:

- Use a high-quality sans-serif font stack.
- Keep body text comfortable and legible.
- Avoid tiny placeholder text.
- Use headings to create hierarchy, not decoration.
- Avoid negative letter spacing.
- Do not scale text purely with viewport width.

Recommended hierarchy:

- Product/home title: prominent but not theatrical.
- Tool title: clear and compact.
- Section headings: functional.
- Labels: concise and visible.
- Helper text: short and muted.

## Color System

The color palette should be restrained and accessible.

Recommended color roles:

- Background.
- Foreground.
- Muted background.
- Muted foreground.
- Border.
- Input.
- Primary.
- Primary foreground.
- Secondary.
- Accent.
- Destructive.
- Success.
- Warning.

Avoid building the whole UI around one saturated hue. The product should feel neutral, with color used for meaning and emphasis.

## Light and Dark Mode

Dark mode is mandatory.

Theme requirements:

- Use `next-themes`.
- Persist user preference automatically.
- Respect system preference by default.
- Avoid flashes during hydration where possible.
- Maintain accessible contrast in both themes.

Dark mode should not be pure black unless the design system proves it works well. Use thoughtful neutral surfaces and borders.

## Components

Use shadcn/ui as the base component system.

Expected primitives:

- Button.
- Input.
- Textarea.
- Select.
- Tabs.
- Dialog when truly necessary.
- Tooltip.
- Card for repeated items only.
- Badge.
- Separator.
- Dropdown menu.
- Toast or inline feedback.

## Card Usage

Cards should be used for:

- Tool list items.
- Repeated content units.
- Focused result panels when framing is helpful.
- Modals or contained controls.

Avoid:

- Cards inside cards.
- Page sections styled as floating cards.
- Decorative card-heavy layouts.
- Marketing-style card grids when a denser list would be more useful.

## Buttons

Buttons should map to clear actions.

Common actions:

- Generate.
- Validate.
- Format.
- Compare.
- Convert.
- Copy.
- Clear.

Guidelines:

- Primary action should be obvious.
- Copy and Clear should be consistently placed.
- Icon buttons should use Lucide Icons.
- Destructive actions should not look like primary actions.
- Disabled states must be clear and accessible.

## Icons

Use Lucide Icons for interface actions and category/tool decoration.

Guidelines:

- Icons must support comprehension, not replace essential labels in unfamiliar contexts.
- Icon-only buttons require accessible labels and tooltips.
- Keep icon sizes consistent.
- Avoid mixing icon libraries.

## Inputs

Inputs should be:

- Large enough to use comfortably.
- Clearly labeled.
- Keyboard accessible.
- Error-aware.
- Helpful without excessive explanation.

Textareas for formatters and parsers should support large content without making the page unstable.

## Result Areas

Results should:

- Be visually distinct from input.
- Preserve formatting when needed.
- Support copying.
- Support clearing.
- Show empty states when no result exists.
- Avoid layout jumps where practical.

For code-like output, use monospace typography.

## Feedback

Feedback should be:

- Immediate.
- Clear.
- Friendly.
- Localized.
- Accessible.

Examples:

- `Copied to clipboard.`
- `Invalid JSON. Check line 4, column 12.`
- `Generated 10 UUIDs.`

Avoid vague feedback.

## Animation

Animations should be subtle and functional.

Acceptable uses:

- Focus transitions.
- Small hover transitions.
- Loading state transitions.
- Expand/collapse transitions.
- Toast entrance/exit.

Avoid:

- Large decorative animations.
- Motion that delays work.
- Motion that distracts from the tool.
- Animations without reduced-motion support.

## Home Page Design

The home page should prioritize search and tool discovery.

Required sections:

- Logo.
- Name.
- Slogan.
- Search.
- Categories.
- Popular tools.
- Recent tools.
- About.
- Footer.

The home page should not feel like a marketing landing page. It is a functional entry point.

## Tool Page Design

Every tool page should follow the shared tool structure:

- Header.
- Main work area.
- Action row.
- Result.
- Examples.
- FAQ.
- When to use.

The most common action should be visible without hunting.

## Accessibility Design Rules

Design must account for:

- Focus-visible states.
- Sufficient color contrast.
- Touch target size.
- Screen reader labels.
- Keyboard order.
- Reduced motion.
- Error states that are not color-only.

## Design Review Checklist

Before approving UI work, verify:

- It feels like VeryKit, not a separate product.
- It is visually calm.
- It works in light and dark mode.
- It is usable on mobile.
- Primary actions are visible.
- Copy/Clear behavior is consistent.
- Text does not overflow.
- Focus states are visible.
- Icons are from Lucide.
- No in-app instructional clutter was added unnecessarily.
