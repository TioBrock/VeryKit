export function generateCep(): string {
  const digits = Math.floor(10000000 + Math.random() * 90000000).toString();
  return formatCep(digits);
}

export function formatCep(cep: string): string {
  const cleaned = cep.replace(/\D/g, "");
  if (cleaned.length !== 8) return cep;
  return `${cleaned.slice(0, 5)}-${cleaned.slice(5)}`;
}

export function validateCep(cep: string): boolean {
  const cleaned = cep.replace(/\D/g, "");
  return cleaned.length === 8;
}
