export interface RegexMatch {
  value: string;
  index: number;
  groups: string[];
}

export function testRegex(pattern: string, text: string, flags: string = "g"): RegexMatch[] {
  const regex = new RegExp(pattern, flags);
  const matches: RegexMatch[] = [];
  let match;

  if (flags.includes("g")) {
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        value: match[0],
        index: match.index,
        groups: match.slice(1).filter((g) => g !== undefined),
      });
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }
    }
  } else {
    match = regex.exec(text);
    if (match) {
      matches.push({
        value: match[0],
        index: match.index,
        groups: match.slice(1).filter((g) => g !== undefined),
      });
    }
  }

  return matches;
}

export function isValidRegex(pattern: string): boolean {
  try {
    new RegExp(pattern);
    return true;
  } catch {
    return false;
  }
}

export function highlightMatches(text: string, matches: RegexMatch[]): string {
  if (matches.length === 0) return escapeHtml(text);

  let result = "";
  let lastIndex = 0;

  const sorted = [...matches].sort((a, b) => a.index - b.index);

  for (const match of sorted) {
    if (match.index < lastIndex) continue;
    result += escapeHtml(text.slice(lastIndex, match.index));
    result += `<mark class="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5">${escapeHtml(match.value)}</mark>`;
    lastIndex = match.index + match.value.length;
  }

  result += escapeHtml(text.slice(lastIndex));
  return result;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
