export type CaseType =
  | "uppercase"
  | "lowercase"
  | "titleCase"
  | "sentenceCase"
  | "camelCase"
  | "pascalCase"
  | "snakeCase"
  | "kebabCase"
  | "dotCase"
  | "constantCase";

function splitWords(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-./]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function convertCase(text: string, caseType: CaseType): string {
  if (!text) return text;

  switch (caseType) {
    case "uppercase":
      return text.toUpperCase();
    case "lowercase":
      return text.toLowerCase();
    case "titleCase":
      return splitWords(text).map(capitalize).join(" ");
    case "sentenceCase": {
      const lower = text.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    case "camelCase":
      return splitWords(text)
        .map((word, i) =>
          i === 0 ? word.toLowerCase() : capitalize(word),
        )
        .join("");
    case "pascalCase":
      return splitWords(text).map(capitalize).join("");
    case "snakeCase":
      return splitWords(text)
        .map((word) => word.toLowerCase())
        .join("_");
    case "kebabCase":
      return splitWords(text)
        .map((word) => word.toLowerCase())
        .join("-");
    case "dotCase":
      return splitWords(text)
        .map((word) => word.toLowerCase())
        .join(".");
    case "constantCase":
      return splitWords(text)
        .map((word) => word.toUpperCase())
        .join("_");
  }
}
