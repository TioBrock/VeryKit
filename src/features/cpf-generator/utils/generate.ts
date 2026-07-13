function generateCheckDigit(digits: number[]): number {
  let sum = 0;
  const weight = digits.length + 1;
  for (let i = 0; i < digits.length; i++) {
    sum += digits[i] * (weight - i);
  }
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export function generateCpf(): string {
  const digits: number[] = [];
  for (let i = 0; i < 9; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  const firstCheck = generateCheckDigit(digits);
  digits.push(firstCheck);

  const secondCheck = generateCheckDigit(digits);
  digits.push(secondCheck);

  return formatCpf(digits.join(""));
}

export function validateCpf(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, "");

  if (cleaned.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(cleaned)) return false;

  const digits = cleaned.split("").map(Number);

  const firstCheck = generateCheckDigit(digits.slice(0, 9));
  if (firstCheck !== digits[9]) return false;

  const secondCheck = generateCheckDigit(digits.slice(0, 10));
  if (secondCheck !== digits[10]) return false;

  return true;
}

export function formatCpf(cpf: string): string {
  const cleaned = cpf.replace(/\D/g, "");
  if (cleaned.length !== 11) return cpf;
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
}
