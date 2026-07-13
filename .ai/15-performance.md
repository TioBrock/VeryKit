# Performance Guidelines

## Performance Principle

VeryKit should feel instant.

Users visit VeryKit to complete small tasks quickly. Performance is therefore a core product feature, not a technical afterthought.

## Lighthouse Targets

VeryKit should target:

- Performance greater than 95.
- Accessibility greater than 95.
- SEO greater than 95.
- Best Practices greater than 95.

## User Experience Targets

Expected experience:

- Home page loads quickly.
- Search responds instantly.
- Tool pages open in less than 5 seconds.
- Inputs remain responsive.
- Copy actions feel immediate.
- No unnecessary loading screens for local tools.

## Framework Strategy

Use Next.js App Router capabilities carefully:

- Server Components for static and content-driven UI.
- Client Components only where interactivity is required.
- Route-level code splitting.
- Static generation where possible.
- Metadata generation through framework APIs.

## Client-Side Processing

Most tool logic should run client-side.

Benefits:

- Faster interaction.
- Better privacy.
- No backend dependency.
- Simpler deployment.

Client-side processing should still be efficient and avoid blocking the main thread for large inputs where practical.

## Bundle Size

Bundle size must be monitored.

Avoid:

- Large dependencies for simple parsing.
- Utility libraries when native APIs are enough.
- Importing entire libraries for one function.
- Putting every tool into a shared client bundle.

Prefer:

- Tool-level code splitting.
- Dynamic imports for heavy tools.
- Native browser APIs.
- Small focused utilities.

## Dependency Budget

Before adding a dependency:

- Check package size.
- Check transitive dependencies.
- Check tree shaking.
- Check maintenance.
- Check security.
- Check if it runs in browser safely.

If a package is only needed by one tool, it should not inflate the initial home page bundle.

## Rendering Performance

Tool UI should avoid:

- Unnecessary rerenders.
- Expensive transformations on every keystroke.
- Huge state objects.
- Recomputing derived data without need.
- Rendering massive output without consideration.

For expensive operations, consider:

- Debouncing.
- Memoization.
- Explicit action buttons.
- Web Workers in future advanced cases.

## Search Performance

Home search should remain instant.

For the expected initial catalog, local in-memory search is enough.

Search should match:

- Name.
- Category.
- Keywords.
- Description.

Avoid remote search services.

## Images and Assets

VeryKit should avoid unnecessary heavy images.

If images are introduced:

- Optimize size.
- Use appropriate formats.
- Use lazy loading below the fold.
- Provide alt text where meaningful.
- Avoid layout shift.

## Fonts

Font loading should be optimized.

Guidelines:

- Use efficient font strategy.
- Avoid too many font weights.
- Prevent layout shift.
- Keep typography consistent.

## CSS Strategy

Use Tailwind CSS responsibly:

- Prefer design tokens.
- Avoid excessive arbitrary values.
- Keep styles consistent.
- Avoid large custom CSS files.

## Third-Party Scripts

Avoid third-party scripts.

Do not add:

- Ad scripts.
- Tracking pixels.
- Chat widgets.
- Heavy embeds.
- Unnecessary analytics.

If analytics are ever considered, they must be privacy-preserving, lightweight, transparent, and explicitly approved.

## Vercel Deployment

The project should deploy cleanly to Vercel.

Performance-related expectations:

- No custom server.
- No required runtime service for local tools.
- Static-first pages where possible.
- Framework-native optimization.

## Performance Testing

Future performance checks should include:

- Lighthouse.
- Bundle analysis.
- Manual mobile viewport checks.
- Slow network simulation for initial load.
- Testing large inputs for relevant tools.

## Performance Review Checklist

Before approving changes:

- Initial bundle is not unnecessarily inflated.
- Heavy logic is scoped to relevant tools.
- No unnecessary dependency was added.
- Search remains instant.
- Tool interactions remain responsive.
- No blocking third-party script was added.
- Lighthouse goals remain realistic.
- Mobile performance is considered.
