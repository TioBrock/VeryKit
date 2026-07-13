# Security Guidelines

## Security Principle

VeryKit should be safe by being simple, transparent, and local-first.

The product should avoid unnecessary systems that create security risk:

- No authentication by default.
- No user database.
- No backend processing for local tools.
- No hidden data collection.
- No unnecessary external APIs.

## Client-Side Limitations

VeryKit tools usually run in the browser.

This is appropriate for:

- Formatting.
- Validation.
- Encoding.
- Decoding.
- Test data generation.
- Text transformation.
- Local inspection.

Users should not treat client-side tools as a secure vault. Sensitive secrets should still be handled carefully.

## User Input Handling

User input should:

- Stay local whenever possible.
- Not be logged.
- Not be sent to analytics.
- Not be sent to external APIs.
- Not be stored remotely.

If local persistence is used for preferences, it should be limited to:

- Theme.
- Language.
- Non-sensitive UI preferences.

Do not store tool input unless a future feature explicitly requires it and receives privacy review.

## No Exposed APIs By Default

VeryKit should not expose server APIs for normal tool usage.

If future APIs are introduced, they must define:

- Purpose.
- Authentication model if any.
- Rate limiting strategy.
- Input validation.
- Abuse prevention.
- Privacy behavior.
- Logging policy.

## External API Policy

Avoid external APIs.

External APIs may only be considered when:

- Local implementation is not practical.
- The user clearly understands data may leave the browser.
- The feature has strong value.
- Security and privacy impact is documented.

## Package Security

Dependencies are a security surface.

Before adding a package:

- Check maintenance status.
- Check known vulnerabilities.
- Check transitive dependency count.
- Check package reputation.
- Check release activity.
- Check whether native APIs can solve the problem.

Remove unused dependencies quickly.

## Supply Chain Security

Future project maintenance should include:

- Lockfile review.
- Dependency update review.
- Automated vulnerability checks if CI is configured.
- Minimal dependency policy.
- Avoiding abandoned packages.

## XSS Prevention

VeryKit may handle user-provided text such as JSON, XML, HTML entities, URLs, or Markdown in future tools.

Rules:

- Never render untrusted input as raw HTML.
- Avoid dangerous HTML APIs.
- Escape output by default.
- Use safe rendering libraries if previews are introduced.
- Treat parser output as untrusted unless proven safe.

## Clipboard Security

Clipboard actions should:

- Only copy visible or clearly selected output.
- Not modify clipboard without user action.
- Provide feedback.
- Avoid hidden appended text.

## Token Tools

JWT and token inspection tools must be careful.

Rules:

- Decode locally.
- Do not send tokens to a server.
- Warn that decoding is not signature verification unless verification is implemented.
- Avoid storing token input.

## Hashing and Crypto Tools

Hash tools must be clear about limitations.

Rules:

- Do not claim hashes encrypt data.
- Prefer browser-native crypto APIs where appropriate.
- Explain legacy algorithms such as MD5 when included for compatibility.
- Avoid implementing cryptography manually when native APIs or trusted libraries are required.

## Regional Document Generators

CPF/CNPJ and similar tools must generate fake test values only.

Rules:

- Do not imply generated data belongs to real people.
- Do not store generated data.
- Use clear testing context in descriptions and FAQ.

## Security Reporting

Security issues should be reported according to `SECURITY.md`.

Public issues should not be used for exploitable vulnerabilities.

## Security Review Checklist

Before approving a change:

- Does user input stay local?
- Are external calls avoided?
- Is untrusted input escaped?
- Are dependencies justified?
- Is clipboard behavior explicit?
- Are secrets avoided?
- Is local storage limited to safe preferences?
- Are security claims accurate?
- Is sensitive behavior documented?
