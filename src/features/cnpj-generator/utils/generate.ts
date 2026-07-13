function generateCheckDigit(digits: number[], weights: number[]): number {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    sum += digits[i] * weights[i];
  }
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function generateCnpj(): string {
  const digits: number[] = [];
  for (let i = 0; i < 12; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const firstCheck = generateCheckDigit(digits, weights1);
  digits.push(firstCheck);

  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondCheck = generateCheckDigit(digits, weights2);
  digits.push(secondCheck);

  return formatCnpj(digits.join(""));
}

export function validateCnpj(cnpj: string): boolean {
  const cleaned = cnpj.replace(/\D/g, "");

  if (cleaned.length !== 14) return false;

  if (/^(\d)\1{13}$/.test(cleaned)) return false;

  const digits = cleaned.split("").map(Number);

  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const firstCheck = generateCheckDigit(digits.slice(0, 12), weights1);
  if (firstCheck !== digits[12]) return false;

  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondCheck = generateCheckDigit(digits.slice(0, 13), weights2);
  if (secondCheck !== digits[13]) return false;

  return true;
}

export function formatCnpj(cnpj: string): string {
  const cleaned = cnpj.replace(/\D/g, "");
  if (cleaned.length !== 14) return cnpj;
  return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12)}`;
}
