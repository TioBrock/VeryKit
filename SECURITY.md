# Security Policy

## Supported Versions

VeryKit is currently in **Phase 1: Architecture and Documentation**.

There is no application runtime yet, so there are no released application versions to support.

When implementation and releases begin, this section will be updated with supported version information.

## Reporting a Vulnerability

Please do not report security vulnerabilities through public issues.

If you believe you have found a security issue, report it privately to the maintainers.

Until a dedicated security contact is published, use the repository owner's preferred private contact channel.

Your report should include:

- A clear description of the issue.
- Steps to reproduce.
- Potential impact.
- Affected files, routes, or features if known.
- Any proof of concept details that help maintainers verify the issue safely.

## What To Avoid

Please do not:

- Open a public issue for an exploitable vulnerability.
- Access data that does not belong to you.
- Disrupt service availability.
- Use automated scanning in a way that causes harm.
- Exfiltrate secrets or private data.
- Share exploit details publicly before maintainers respond.

## Security Philosophy

VeryKit reduces security risk by keeping the product simple:

- No authentication by default.
- No user database.
- No backend processing for normal tools.
- No ads.
- No invasive tracking.
- Local-first processing whenever possible.

Future features that process user input should avoid sending that input to remote services unless explicitly documented and approved.

## Expected Response

Maintainers should aim to:

1. Acknowledge the report.
2. Reproduce and assess the issue.
3. Prioritize based on severity.
4. Prepare a fix when needed.
5. Credit the reporter if they want credit.
6. Disclose responsibly after mitigation.

Response timing will depend on maintainer availability and project maturity.

## Dependency Security

Future implementation should keep dependencies minimal and reviewed.

Security-sensitive dependency changes should consider:

- Known vulnerabilities.
- Maintainer activity.
- Transitive dependencies.
- Bundle impact.
- Whether native APIs can solve the problem.

## Client-Side Tool Warning

VeryKit tools are intended for convenience and local productivity.

Even when processing happens in the browser, users should be careful with highly sensitive secrets, production credentials, private keys, and regulated data.

Tools such as JWT decoders or hash generators must clearly explain what they do and do not guarantee.
