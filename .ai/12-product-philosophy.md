# Product Philosophy

## Core Idea

VeryKit exists to make small technical tasks fast, pleasant, and trustworthy.

The product should feel like opening a sharp tool drawer: everything is where expected, nothing asks for attention unnecessarily, and the user can finish quickly.

## Primary Workflow

The core workflow is:

1. Open the site.
2. Choose or search for a tool.
3. Complete the task in seconds.
4. Copy the result.
5. Close the site.

Any feature that makes this workflow slower needs strong justification.

## Speed Rule

Speed is a product requirement.

VeryKit should optimize:

- Time to find a tool.
- Time to first interaction.
- Time to valid result.
- Time to copy result.

Avoid:

- Mandatory onboarding.
- Splash screens.
- Promotional modals.
- Unnecessary animations.
- Complex navigation.
- Multi-step flows when one step is enough.

## Simplicity Rule

VeryKit should be simple without being underpowered.

Simplicity means:

- Clear structure.
- Obvious actions.
- Predictable behavior.
- Minimal visual noise.
- No unnecessary configuration.

It does not mean:

- Weak validation.
- Missing accessibility.
- Missing translations.
- Poor error handling.

## Zero Login Rule

VeryKit must not require login for core functionality.

No account should be needed to:

- Use tools.
- Copy results.
- Change theme.
- Change language.
- Read documentation.

## Zero Ads Rule

VeryKit must not include ads.

Ads are incompatible with the product's trust, speed, and calm interface.

## Zero Paywall Rule

VeryKit must not hide tools behind payment.

The default product promise is free access to the toolkit.

## Zero Dark Patterns Rule

VeryKit must not manipulate users.

Forbidden:

- Fake scarcity.
- Forced engagement.
- Hidden opt-ins.
- Confusing privacy controls.
- Misleading buttons.
- Sponsored results disguised as utility.

## Privacy Rule

VeryKit should avoid collecting user data.

Tool input should stay in the browser whenever possible.

The user should be able to trust VeryKit with day-to-day technical data because the product avoids unnecessary network behavior.

## Local-First Rule

Prefer local computation.

Local-first processing is expected for:

- Formatters.
- Validators.
- Generators.
- Encoders.
- Decoders.
- Converters.
- Text utilities.

## Consistency Rule

Consistency is part of speed.

When every tool follows the same structure, users can move quickly.

Shared tool structure:

- Title.
- Description.
- Input.
- Primary action.
- Clear.
- Copy.
- Result.
- Messages.
- Examples.
- FAQ.
- When to use.

## International Rule

VeryKit is international.

Regional tools are welcome, but they should be labeled clearly and organized separately when the catalog grows.

## Accessibility Rule

Fast tools must still be accessible tools.

Keyboard and screen reader users should be able to complete the same workflows.

## Content Rule

Content should be useful, not bloated.

Support sections should answer:

- What this tool is for.
- When to use it.
- What limitations exist.
- Whether data leaves the browser.

Avoid content that exists only for keyword volume.

## Product Decision Checklist

Before adding a feature, ask:

- Does this help users finish faster?
- Does this preserve trust?
- Does this work without login?
- Does this avoid ads and paywalls?
- Can it run locally?
- Is it accessible?
- Is it internationalized?
- Is it consistent with existing tools?
- Is the added complexity worth it?

If the answer is unclear, the feature should wait.
