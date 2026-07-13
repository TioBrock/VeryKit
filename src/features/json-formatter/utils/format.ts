export function formatJson(json: string, indentSize: number = 2): string {
  const parsed = JSON.parse(json);
  return JSON.stringify(parsed, null, indentSize);
}

export function minifyJson(json: string): string {
  const parsed = JSON.parse(json);
  return JSON.stringify(parsed);
}

export function isValidJson(json: string): boolean {
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
}
