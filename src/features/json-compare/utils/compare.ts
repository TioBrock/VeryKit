export type DiffType = "added" | "removed" | "changed" | "unchanged";

export interface DiffEntry {
  path: string;
  type: DiffType;
  oldValue?: unknown;
  newValue?: unknown;
}

function isObject(item: unknown): item is Record<string, unknown> {
  return typeof item === "object" && item !== null && !Array.isArray(item);
}

function compareValues(a: unknown, b: unknown, path: string): DiffEntry[] {
  if (isObject(a) && isObject(b)) {
    return compareObjects(a, b, path);
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return compareArrays(a, b, path);
  }

  if (a === b) {
    return [{ path, type: "unchanged", oldValue: a, newValue: b }];
  }

  return [{ path, type: "changed", oldValue: a, newValue: b }];
}

function compareObjects(
  a: Record<string, unknown>,
  b: Record<string, unknown>,
  basePath: string,
): DiffEntry[] {
  const diffs: DiffEntry[] = [];
  const allKeys = new Set([...Object.keys(a), ...Object.keys(b)]);

  for (const key of allKeys) {
    const path = basePath ? `${basePath}.${key}` : key;
    const aHas = key in a;
    const bHas = key in b;

    if (aHas && !bHas) {
      diffs.push({ path, type: "removed", oldValue: a[key] });
    } else if (!aHas && bHas) {
      diffs.push({ path, type: "added", newValue: b[key] });
    } else {
      diffs.push(...compareValues(a[key], b[key], path));
    }
  }

  return diffs;
}

function compareArrays(
  a: unknown[],
  b: unknown[],
  basePath: string,
): DiffEntry[] {
  const diffs: DiffEntry[] = [];
  const maxLen = Math.max(a.length, b.length);

  for (let i = 0; i < maxLen; i++) {
    const path = `${basePath}[${i}]`;
    if (i >= a.length) {
      diffs.push({ path, type: "added", newValue: b[i] });
    } else if (i >= b.length) {
      diffs.push({ path, type: "removed", oldValue: a[i] });
    } else {
      diffs.push(...compareValues(a[i], b[i], path));
    }
  }

  return diffs;
}

export function compareJson(a: string, b: string): DiffEntry[] {
  const objA = JSON.parse(a);
  const objB = JSON.parse(b);
  return compareValues(objA, objB, "").filter((d) => d.type !== "unchanged");
}

export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}
