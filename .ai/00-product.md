# Product Requirements Document

## Product Name

**VeryKit**

## Slogan

**One place. Every tool.**

## Short Description

**Free tools for QA Engineers and Developers.**

## Product Summary

VeryKit is a free, open source toolkit that brings together everyday utilities used by QA Engineers, Test Automation Engineers, Software Developers, and students.

The product is designed for small but frequent tasks: formatting JSON, generating test data, decoding tokens, converting timestamps, creating CPF/CNPJ values for testing, comparing text, validating regular expressions, and many other actions that currently force users to jump across many different websites.

The intended user flow is intentionally short:

1. Open the site.
2. Find a tool.
3. Use it immediately.
4. Copy the result.
5. Leave.

VeryKit should never try to trap the user. It should help quickly and disappear.

## Problem Statement

QA and development professionals repeatedly need small utilities throughout their day. These tools are often scattered across many unrelated websites with inconsistent interfaces, ads, tracking scripts, paywalls, slow loading, weak accessibility, unclear privacy posture, or poor mobile support.

This creates friction:

- Time is lost searching for reliable tools.
- Context switching increases.
- Users have to trust unknown websites with potentially sensitive data.
- Inconsistent UX slows down repetitive workflows.
- Some tools are region-specific and hard to find in international products.
- Many tools are overloaded with ads or unnecessary features.

VeryKit solves this by offering a single, clean, fast, privacy-conscious toolkit.

## Target Users

### Primary Users

- QA Engineers.
- Test Automation Engineers.
- Software Developers.
- Frontend Engineers.
- Backend Engineers.
- Full-stack Engineers.
- Students learning software development or testing.

### Secondary Users

- Product Engineers.
- Technical Support Engineers.
- DevOps Engineers.
- Security learners.
- Technical writers.
- Instructors creating examples or training materials.

## Core Jobs To Be Done

Users come to VeryKit to:

- Generate test data quickly.
- Validate identifiers and structured values.
- Format, compare, decode, encode, or transform data.
- Prepare test scenarios.
- Convert values between formats.
- Inspect payloads and tokens.
- Copy clean results without extra friction.

## Product Principles

### Speed First

Every flow should be optimized for seconds, not minutes. The product should avoid unnecessary screens, confirmations, modals, or onboarding.

### Utility Over Engagement

VeryKit should not optimize for time-on-site. It should optimize for time-to-result.

### Trust Through Simplicity

The absence of ads, login, paywalls, and invasive tracking is a product feature. Users should feel safe pasting everyday work data into tools that run locally where possible.

### Consistency Over Novelty

Tool pages should look and behave consistently. A user who learns one tool should understand the rest.

### International By Default

VeryKit is not a Brazilian-only project. It is an international open source product created in Brazil. Regional tools must be clearly separated from universal tools.

### Accessibility Is Product Quality

Accessibility is not an extra task. It is part of the product definition.

## Non-Goals

VeryKit must not become:

- A SaaS platform with paid plans.
- A lead generation product.
- A login-first experience.
- A content farm.
- A tool that sends user input to third-party APIs unnecessarily.
- A dashboard requiring user accounts.
- A bloated marketplace.
- A product filled with ads, popups, or intrusive banners.

## Commercial Policy

VeryKit has no commercial objective in its current vision.

The following are not allowed:

- Advertisements.
- Affiliate blocks.
- Forced newsletter signup.
- Paywalls.
- Trial plans.
- User accounts for basic functionality.
- Tracking pixels.
- Dark patterns.
- Sponsored interruptions.

Future donations or sponsorship acknowledgements may be considered only if they do not affect UX, ranking, tool access, privacy, or performance.

## Initial Information Architecture

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

The search experience must be instant and direct. For example, typing `cpf` should immediately surface CPF Generator/Validator and allow direct navigation.

## Initial Categories

### Data

- CPF Generator/Validator.
- CNPJ Generator.
- UUID Generator.
- Password Generator.
- Random Email Generator.
- Random Person Generator.
- Random Address Generator.
- Random Phone Generator.
- Credit Card Test Generator.
- Lorem Ipsum Generator.

### API

- JSON Formatter.
- JSON Minifier.
- JSON Validator.
- JSON Compare.
- XML to JSON.
- JSON to XML.
- JWT Decoder.
- JWT Inspector.
- Base64 Encode.
- Base64 Decode.
- URL Encode.
- URL Decode.
- Curl Parser.

### Testing

- BDD Generator.
- Test Case Generator.
- Acceptance Criteria Helper.
- Random Test Data.
- Exploratory Testing Checklist.

### Utilities

- Regex Tester.
- Regex Cheat Sheet.
- Timestamp Converter.
- Unix Time Converter.
- Hash Generator.
- UUID Batch Generator.
- Case Converter.
- Text Diff.
- Color Picker.

### Future Regional Tools

Regional tools must be separated from universal tools.

Example:

- Regional Tools > Brazil > CPF Generator/Validator.
- Regional Tools > Brazil > CNPJ Generator.

This avoids making the product feel local-only while still supporting valuable regional needs.

## Tool Page Requirements

Every tool should follow a shared structure:

- Title.
- Description.
- Main input or generator controls.
- Primary action button.
- Clear button.
- Copy button.
- Result area.
- Success messages.
- Error messages.
- Examples.
- FAQ.
- "When to use this" section.

Tool pages must support:

- Desktop.
- Tablet.
- Mobile.
- Light mode.
- Dark mode.
- Keyboard interaction.
- Screen reader usage.
- Translated metadata.

## Routing Requirements

Every tool must have its own stable route:

- `/tools/cpf-generator`
- `/tools/json-compare`
- `/tools/jwt-decoder`
- `/tools/regex-tester`

Routes must be:

- Human-readable.
- Lowercase.
- Kebab-case.
- Stable over time.
- SEO friendly.

## Quality Targets

VeryKit should target:

- Lighthouse Performance greater than 95.
- Lighthouse Accessibility greater than 95.
- Lighthouse SEO greater than 95.
- Lighthouse Best Practices greater than 95.
- Strong TypeScript typing.
- Utility unit tests with Vitest.
- Predictable contribution flow.

## Privacy Requirements

VeryKit must process data client-side whenever possible.

The product should avoid:

- Sending user input to a server.
- Storing user input remotely.
- Using analytics that identify users.
- Loading third-party scripts without strong justification.

If a future feature needs network behavior, it must be documented clearly and reviewed as a privacy-sensitive change.

## Success Metrics

Success should be evaluated through product quality, not monetization:

- Users can complete tasks quickly.
- Tools are reliable.
- Contributors can add tools without architectural confusion.
- Lighthouse scores remain high.
- Accessibility issues are actively fixed.
- Tool pages are discoverable by search engines.
- The product retains a calm, consistent visual identity.

## Phase 1 Scope

Phase 1 is limited to architecture and documentation.

The goals are:

- Define the product clearly.
- Document architecture.
- Document UX and design principles.
- Document i18n rules.
- Document SEO strategy.
- Document testing strategy.
- Document open source contribution process.
- Establish behavior rules for future AI agents.

Phase 1 does not include:

- Application code.
- Package setup.
- Next.js scaffolding.
- UI implementation.
- Tool logic.
- Tests.
- Deployment configuration.

## Future Phase Direction

Future phases may include:

1. Repository scaffolding.
2. Design system foundation.
3. Internationalization setup.
4. Home page implementation.
5. Tool registry.
6. First tools.
7. Testing foundation.
8. SEO automation.
9. Accessibility audits.
10. Open source launch preparation.
