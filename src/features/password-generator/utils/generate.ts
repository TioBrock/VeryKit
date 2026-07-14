export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous?: boolean;
}

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const AMBIGUOUS = "1lI0O";

export type StrengthLevel = "veryWeak" | "weak" | "fair" | "strong" | "veryStrong";

export function calculateStrength(length: number, charsetSize: number): {
  entropy: number;
  level: StrengthLevel;
} {
  const entropy = length * Math.log2(charsetSize);

  let level: StrengthLevel;
  if (entropy < 28) level = "veryWeak";
  else if (entropy < 36) level = "weak";
  else if (entropy < 60) level = "fair";
  else if (entropy < 128) level = "strong";
  else level = "veryStrong";

  return { entropy, level };
}

export function getCharsetSize(options: PasswordOptions): number {
  let size = 0;
  if (options.uppercase) size += 26;
  if (options.lowercase) size += 26;
  if (options.numbers) size += 10;
  if (options.symbols) size += 26;
  if (options.excludeAmbiguous) {
    const ambiguousInCharset: string[] = [];
    if (options.numbers) ambiguousInCharset.push(...AMBIGUOUS.split("").filter((c) => "0123456789".includes(c)));
    if (options.uppercase) ambiguousInCharset.push(...AMBIGUOUS.split("").filter((c) => "ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(c)));
    if (options.lowercase) ambiguousInCharset.push(...AMBIGUOUS.split("").filter((c) => "abcdefghijklmnopqrstuvwxyz".includes(c)));
    size -= ambiguousInCharset.length;
  }
  return Math.max(size, 1);
}

export function generatePassword(options: PasswordOptions): string {
  const { length, uppercase, lowercase, numbers, symbols, excludeAmbiguous } = options;

  let charset = "";
  if (uppercase) charset += UPPERCASE;
  if (lowercase) charset += LOWERCASE;
  if (numbers) charset += NUMBERS;
  if (symbols) charset += SYMBOLS;

  if (excludeAmbiguous) {
    charset = charset
      .split("")
      .filter((c) => !AMBIGUOUS.includes(c))
      .join("");
  }

  if (charset.length === 0) {
    throw new Error("At least one character type must be selected");
  }

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }

  return password;
}
