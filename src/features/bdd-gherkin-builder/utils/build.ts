export interface GherkinStep {
  type: string;
  text: string;
}

export interface GherkinScenario {
  feature: string;
  scenario: string;
  steps: GherkinStep[];
}

export function buildGherkin(scenario: GherkinScenario): string {
  const lines: string[] = [];
  lines.push(`Feature: ${scenario.feature}`);
  lines.push("");
  lines.push(`  Scenario: ${scenario.scenario}`);

  for (const step of scenario.steps) {
    const prefix = step.type === "And" ? "    And " : `    ${step.type} `;
    lines.push(`${prefix}${step.text}`);
  }

  return lines.join("\n");
}
