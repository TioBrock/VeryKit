export function generateRenavam(): string {
  const digits: number[] = [];
  for (let i = 0; i < 10; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += digits[i] * weights[i];
  }

  const remainder = sum % 11;
  const checkDigit = remainder < 2 ? 0 : 11 - remainder;
  digits.push(checkDigit);

  return formatRenavam(digits.join(""));
}

export function validateRenavam(renavam: string): boolean {
  const cleaned = renavam.replace(/\D/g, "");

  if (cleaned.length !== 11) return false;

  const digits = cleaned.split("").map(Number);
  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += digits[i] * weights[i];
  }

  const remainder = sum % 11;
  const expectedCheckDigit = remainder < 2 ? 0 : 11 - remainder;

  return digits[10] === expectedCheckDigit;
}

export function formatRenavam(renavam: string): string {
  const cleaned = renavam.replace(/\D/g, "");
  if (cleaned.length !== 11) return renavam;
  return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
}
