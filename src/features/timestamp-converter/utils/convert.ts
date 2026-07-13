export type TimestampUnit = "seconds" | "milliseconds";
export type TimezoneMode = "utc" | "local";

export function timestampToDate(
  timestamp: number,
  unit: TimestampUnit,
  mode: TimezoneMode,
): string {
  const ms = unit === "seconds" ? timestamp * 1000 : timestamp;
  const date = new Date(ms);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid timestamp");
  }

  if (mode === "utc") {
    return date.toISOString();
  }

  return date.toLocaleString();
}

export function dateToTimestamp(
  dateString: string,
  unit: TimestampUnit,
): number {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  const ms = date.getTime();
  return unit === "seconds" ? Math.floor(ms / 1000) : ms;
}

export function getCurrentTimestamp(unit: TimestampUnit): number {
  const now = Date.now();
  return unit === "seconds" ? Math.floor(now / 1000) : now;
}

export function autoDetectUnit(value: string): TimestampUnit {
  const num = Number(value);
  if (num > 9999999999) return "milliseconds";
  return "seconds";
}
