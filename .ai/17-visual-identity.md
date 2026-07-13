# Visual Identity

## Brand Overview

VeryKit is an independent, open source toolkit for QA Engineers and Developers. The product has its own original visual identity and must never replicate the logos, trademarks, or visual identity of any third-party company.

## Logo

### Symbol

The VeryKit symbol consists of two chevron shapes meeting at a central point to form an "X":

- **Left chevron (black/dark):** Points right (">"), representing output, generation, and forward movement
- **Right chevron (blue):** Points left ("<"), representing input, discovery, and precision

The two chevrons meet at a shared vertex, creating a balanced, geometric mark that suggests convergence and intersection — the meeting point of different tools and workflows.

### Wordmark

The wordmark "VeryKit" uses a bold sans-serif typeface with tight letter-spacing. The dot on the letter "i" is rendered in brand blue, creating a subtle visual connection between the symbol and the text.

### Logo Variants

| Variant | Usage |
|---------|-------|
| Full logo (symbol + wordmark) | Header, home page hero, marketing materials |
| Symbol only | Favicon, app icons, small spaces |
| Wordmark only | Not recommended — always pair with symbol when possible |

### Clear Space

Maintain a minimum clear space around the logo equal to the height of the symbol. No other elements should intrude into this space.

### Minimum Size

- Full logo: minimum height of 24px
- Symbol only: minimum height of 16px

## Colors

### Brand Blue

The primary accent color used in the logo symbol and interactive elements.

| Context | Hex | Usage |
|---------|-----|-------|
| Light mode | `#2563eb` | Symbol blue chevron, focus rings, primary actions |
| Dark mode | `#3b82f6` | Symbol blue chevron, focus rings, primary actions |

### Neutral Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--background` | `#ffffff` | `#09090b` | Page background |
| `--foreground` | `#09090b` | `#fafafa` | Primary text, symbol black |
| `--card` | `#ffffff` | `#18181b` | Card backgrounds |
| `--muted` | `#f4f4f5` | `#27272a` | Subtle backgrounds |
| `--muted-foreground` | `#71717a` | `#a1a1aa` | Secondary text |
| `--border` | `#e4e4e7` | `#27272a` | Borders |

### Color Rules

- The brand blue is used exclusively for: the logo symbol, focus rings, and primary action buttons
- Primary action buttons use `bg-brand-blue` with white text
- Focus rings use `ring-brand-blue` for keyboard navigation visibility
- Tool card hover states use `border-brand-blue/30` for subtle accent

## Typography

### Font Stack

```css
--font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
```

### Type Scale

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| Hero title | 48-60px | 700 | Home page main heading |
| Section title | 24px | 600 | Page sections |
| Body | 16px | 400 | Default text |
| Small | 14px | 400 | Labels, helper text |
| Code/data | 14px | 400 | Monospace for tool results |

### Typography Rules

- Use tight letter-spacing for headings (`tracking-tight`)
- Avoid negative letter-spacing
- Maintain comfortable line height for body text (1.5-1.75)
- Use semibold (600) for section headings, bold (700) for hero text

## Spacing

Use generous whitespace to create visual hierarchy and scannability:

- **Page sections:** `py-12` to `py-16` (48-64px vertical padding)
- **Component gaps:** `gap-4` to `gap-6` (16-24px)
- **Card padding:** `p-5` to `p-6` (20-24px)
- **Hero top padding:** `pt-20` (80px)

## Border Radius

| Element | Radius | Token |
|---------|--------|-------|
| Cards | 8px | `rounded-lg` |
| Buttons | 6px | `rounded-md` |
| Inputs | 6px | `rounded-md` |
| Search bar | 12px | `rounded-xl` |
| Logo symbol | 0px | Square corners |

## Interactive States

### Focus Rings

All interactive elements must have visible focus rings for keyboard navigation:

```css
focus-visible:ring-2 focus-visible:ring-brand-blue
```

### Hover States

- Cards: `hover:border-brand-blue/30 hover:bg-accent/50`
- Buttons: `hover:bg-brand-blue/90` (primary), `hover:bg-accent` (secondary)
- Links: `hover:text-foreground`

### Disabled States

```css
disabled:pointer-events-none disabled:opacity-50
```

## Component Patterns

### Tool Card

- Border: `border border-border`
- Background: `bg-card`
- Hover: subtle border accent + background shift
- Icon container: `bg-muted` with `group-hover:bg-foreground group-hover:text-background`

### Primary Action Button

- Background: `bg-brand-blue`
- Text: `text-white`
- Hover: `bg-brand-blue/90`
- Focus: `ring-brand-blue`

### Search Input

- Height: `h-14` (56px)
- Border radius: `rounded-xl` (12px)
- Focus: `ring-brand-blue`
- Icon: Lucide `Search` in muted foreground

## Dark Mode

- Dark mode is mandatory
- Respect system preference by default
- Persist user preference via `next-themes`
- Use `suppressHydrationWarning` on `<html>` to prevent flash
- Brand blue shifts slightly brighter in dark mode (`#3b82f6` vs `#2563eb`)
- Foreground/background swap appropriately
- Borders use darker values in dark mode

## Accessibility

- All color combinations must meet WCAG AA contrast requirements
- Focus rings must be visible in both light and dark modes
- Interactive elements must have minimum 44x44px touch targets
- Icons must have `aria-hidden="true"` when decorative
- Screen reader text (`sr-only`) must be provided for icon-only elements

## What VeryKit Is NOT

- VeryKit is not affiliated with Vercel, Linear, Raycast, or any other company
- The visual identity is original and proprietary to the VeryKit project
- Technical inspiration from minimalism best practices is acceptable; visual copying is not
- The logo, colors, and typography are unique to VeryKit
