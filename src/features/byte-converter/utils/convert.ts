const UNITS = ["B", "bit", "KB", "MB", "GB", "TB"] as const;
type Unit = (typeof UNITS)[number];

const LABELS: Record<Unit, string> = {
  B: "Bytes",
  bit: "bits",
  KB: "kilobytes",
  MB: "megabytes",
  GB: "gigabytes",
  TB: "terabytes",
};

const UNIT_MAP: Record<Unit, Unit[]> = {
  B: ["bit", "KB", "MB", "GB", "TB"],
  bit: ["B", "KB", "MB", "GB", "TB"],
  KB: ["B", "bit", "MB", "GB", "TB"],
  MB: ["B", "bit", "KB", "GB", "TB"],
  GB: ["B", "bit", "KB", "MB", "TB"],
  TB: ["B", "bit", "KB", "MB", "GB"],
};

function toBytes(value: number, fromUnit: Unit): number {
  if (fromUnit === "bit") return value / 8;
  const powers: Record<Unit, number> = { B: 0, bit: 0, KB: 1, MB: 2, GB: 3, TB: 4 };
  return value * Math.pow(1024, powers[fromUnit]);
}

function fromBytes(bytes: number, toUnit: Unit): number {
  if (toUnit === "bit") return bytes * 8;
  const powers: Record<Unit, number> = { B: 0, bit: 0, KB: 1, MB: 2, GB: 3, TB: 4 };
  return bytes / Math.pow(1024, powers[toUnit]);
}

function formatNumber(num: number): string {
  if (num === 0) return "0";
  if (Number.isInteger(num)) return num.toString();
  if (num < 0.001) return num.toFixed(4);
  return parseFloat(num.toPrecision(10)).toString();
}

export function convertBytes(value: number, fromUnit: string): Record<string, string> {
  const unit = fromUnit.toLowerCase() as Unit;
  if (!UNIT_MAP[unit]) return {};

  const bytes = toBytes(value, unit);
  const result: Record<string, string> = {};

  for (const targetUnit of UNIT_MAP[unit]) {
    const converted = fromBytes(bytes, targetUnit);
    result[LABELS[targetUnit]] = formatNumber(converted);
  }

  return result;
}
