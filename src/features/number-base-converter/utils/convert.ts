interface ConversionResult {
  decimal: string;
  hex: string;
  binary: string;
  octal: string;
}

function isValidForBase(value: string, base: number): boolean {
  if (value === "") return true;

  let sanitized = value;
  if (base === 16) {
    sanitized = sanitized.replace(/^(0x|0X)/, "");
    sanitized = sanitized.replace(/^-/, "");
    return /^[0-9a-fA-F]*$/.test(sanitized);
  }
  if (base === 10) {
    return /^-?\d*$/.test(sanitized);
  }
  if (base === 2) {
    sanitized = sanitized.replace(/^-/, "");
    return /^[01]*$/.test(sanitized);
  }
  if (base === 8) {
    sanitized = sanitized.replace(/^-/, "");
    return /^[0-7]*$/.test(sanitized);
  }
  return false;
}

function parseInput(value: string, fromBase: number): number | null {
  if (value === "") return null;

  let sanitized = value.trim();
  if (fromBase === 16) {
    sanitized = sanitized.replace(/^(0x|0X)/, "");
  }

  const num = parseInt(sanitized, fromBase);
  return isNaN(num) ? null : num;
}

export function convertBases(value: string, fromBase: number): ConversionResult {
  const num = parseInput(value, fromBase);

  if (num === null) {
    return { decimal: "", hex: "", binary: "", octal: "" };
  }

  const absNum = Math.abs(num);
  const prefix = num < 0 ? "-" : "";

  if (fromBase === 10) {
    return {
      decimal: value,
      hex: prefix + absNum.toString(16).toUpperCase(),
      binary: prefix + absNum.toString(2),
      octal: prefix + absNum.toString(8),
    };
  }

  if (fromBase === 16) {
    return {
      decimal: prefix + absNum.toString(10),
      hex: prefix + absNum.toString(16).toUpperCase(),
      binary: prefix + absNum.toString(2),
      octal: prefix + absNum.toString(8),
    };
  }

  if (fromBase === 2) {
    return {
      decimal: prefix + absNum.toString(10),
      hex: prefix + absNum.toString(16).toUpperCase(),
      binary: prefix + absNum.toString(2),
      octal: prefix + absNum.toString(8),
    };
  }

  if (fromBase === 8) {
    return {
      decimal: prefix + absNum.toString(10),
      hex: prefix + absNum.toString(16).toUpperCase(),
      binary: prefix + absNum.toString(2),
      octal: prefix + absNum.toString(8),
    };
  }

  return { decimal: "", hex: "", binary: "", octal: "" };
}
