# SEO Guidelines

## SEO Principle

VeryKit should be discoverable because each tool solves a specific, searchable problem.

SEO must support real utility, not content spam. Pages should be useful, accurate, fast, accessible, and internationalized.

## SEO Goals

Target Lighthouse SEO score:

- Greater than 95.

SEO work must not harm:

- Performance.
- Accessibility.
- Privacy.
- UX simplicity.

## URL Strategy

Every tool must have a stable, readable URL.

Examples:

```text
/en/tools/json-compare
/en/tools/cpf-generator
/en/tools/jwt-decoder
/en/tools/regex-tester
```

URL rules:

- Lowercase.
- Kebab-case.
- Human-readable.
- Stable.
- No unnecessary ids.
- No translated slugs for initial implementation unless a future SEO strategy requires it.

## Metadata Requirements

Every page should define:

- Title.
- Description.
- Canonical URL.
- Open Graph title.
- Open Graph description.
- Open Graph image where appropriate.
- Twitter Card metadata.
- Locale metadata.
- Alternate language links.

## Title Pattern

Recommended title patterns:

Home:

```text
VeryKit - Free tools for QA Engineers and Developers
```

Tool page:

```text
JSON Compare - VeryKit
```

About:

```text
About VeryKit - VeryKit
```

Titles should be localized when they include descriptive words. Tool names remain unchanged.

## Description Pattern

Descriptions should be:

- Clear.
- Localized.
- Human-written.
- Under typical search snippet limits where possible.
- Specific to the page.

Example:

```text
Compare JSON payloads quickly, inspect differences, and copy clean results in a fast, privacy-friendly tool.
```

## Canonical URLs

Each page must define a canonical URL.

Rules:

- Canonical should match the stable public URL.
- Query parameters should not create canonical variants.
- Locale-specific pages should canonicalize to themselves unless a different strategy is explicitly chosen.

## hreflang

International pages must define alternate links:

- `en`
- `pt-BR`
- `es`
- `x-default` where appropriate.

Each localized page should point to equivalent localized versions.

## Sitemap

The project should generate a sitemap that includes:

- Home pages per locale.
- Tool pages per locale.
- About pages per locale.
- Other stable public pages.

Sitemap entries should include alternates when supported by the implementation.

## robots.txt

The project must expose a robots.txt.

Default strategy:

- Allow public pages.
- Point to sitemap.
- Block no core content unless future routes require it.

## Schema.org

Use structured data when it provides meaningful clarity.

Potential schemas:

- `WebSite` for home.
- `SoftwareApplication` for the product.
- `WebApplication` for individual tools where appropriate.
- `FAQPage` for tool FAQ sections when implemented correctly.

Do not add misleading structured data.

## Open Graph

Open Graph metadata should support clean sharing.

Required:

- Title.
- Description.
- URL.
- Site name.
- Locale.
- Type.

Images can be added in a future design phase. They should be lightweight and consistent.

## Twitter Cards

Use summary cards unless a future asset strategy justifies larger cards.

Required:

- Card type.
- Title.
- Description.
- Image when available.

## Tool Page Content Requirements

Every tool page should include useful content beyond the control itself:

- Short description.
- Examples.
- FAQ.
- "When to use this" section.

This content improves both UX and search quality.

## Avoid SEO Spam

Do not:

- Generate keyword-stuffed pages.
- Duplicate low-value pages.
- Hide text.
- Create doorway pages.
- Add unrelated FAQs.
- Write content only for bots.

## Performance and SEO

Search performance depends on technical performance.

SEO work must preserve:

- Fast rendering.
- Small bundles.
- Lazy loading where appropriate.
- Optimized assets.
- No blocking third-party scripts.

## Accessibility and SEO

Good semantics help both users and search engines.

Requirements:

- One clear primary heading per page.
- Proper heading hierarchy.
- Semantic sections.
- Descriptive links.
- Accessible forms.
- Valid HTML.

## International SEO Checklist

Before approving SEO work:

- Metadata exists for every locale.
- Canonical URLs are correct.
- Alternate language links are correct.
- Sitemap includes localized pages.
- Tool descriptions are translated.
- FAQ content is localized.
- Tool names remain stable.
- No page has duplicate boilerplate-only content.

## Tool SEO Checklist

Before publishing a tool:

- Route is stable.
- Title is specific.
- Description is useful.
- Examples are present.
- FAQ is present when relevant.
- "When to use this" is present.
- Canonical is correct.
- `hreflang` alternates are correct.
- Structured data is valid if used.
- Page meets Lighthouse SEO target.
