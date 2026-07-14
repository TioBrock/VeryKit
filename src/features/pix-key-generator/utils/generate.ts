export type PixKeyType = "random" | "cpf" | "email";

function generateRandomHex(): string {
  const chars = "0123456789abcdef";
  let result = "";
  for (let i = 0; i < 32; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

function generateCpf(): string {
  const digits: number[] = [];
  for (let i = 0; i < 9; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  const weights1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * weights1[i];
  }
  let remainder = sum % 11;
  digits.push(remainder < 2 ? 0 : 11 - remainder);

  const weights2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += digits[i] * weights2[i];
  }
  remainder = sum % 11;
  digits.push(remainder < 2 ? 0 : 11 - remainder);

  return `${digits.slice(0, 3).join("")}.${digits.slice(3, 6).join("")}.${digits.slice(6, 9).join("")}-${digits.slice(9).join("")}`;
}

export function generateFakeEmail(): string {
  const domains = ["example.com", "test.com", "demo.com", "sample.com", "mail.test"];
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let user = "";
  for (let i = 0; i < 10; i++) {
    user += chars[Math.floor(Math.random() * chars.length)];
  }
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${user}@${domain}`;
}

export function generatePixKey(type: PixKeyType): string {
  switch (type) {
    case "random":
      return generateRandomHex();
    case "cpf":
      return generateCpf();
    case "email":
      return generateFakeEmail();
  }
}
