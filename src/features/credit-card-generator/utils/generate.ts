export type CardBrand = "visa" | "mastercard" | "amex" | "discover";

const CARD_PATTERNS: Record<CardBrand, { prefix: string[]; length: number }> = {
  visa: { prefix: ["4"], length: 16 },
  mastercard: { prefix: ["51", "52", "53", "54", "55"], length: 16 },
  amex: { prefix: ["34", "37"], length: 15 },
  discover: { prefix: ["6011", "65"], length: 16 },
};

function luhnCheck(num: string): string {
  const digits = num.split("").map(Number);
  let sum = 0;
  let alternate = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];
    if (alternate) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    alternate = !alternate;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  return num + checkDigit;
}

function generateRandomDigits(length: number): string {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

export function generateCardNumber(brand: CardBrand): string {
  const { prefix, length } = CARD_PATTERNS[brand];
  const prefixStr = prefix[Math.floor(Math.random() * prefix.length)];
  const remaining = length - prefixStr.length - 1;
  const middle = generateRandomDigits(remaining);
  return luhnCheck(prefixStr + middle);
}

export function formatCardNumber(num: string): string {
  const cleaned = num.replace(/\D/g, "");
  return cleaned.replace(/(.{4})/g, "$1 ").trim();
}

export function isValidLuhn(num: string): boolean {
  const cleaned = num.replace(/\D/g, "");
  if (cleaned.length < 2) return false;

  const digits = cleaned.split("").map(Number);
  let sum = 0;
  let alternate = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];
    if (alternate) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    alternate = !alternate;
  }

  return sum % 10 === 0;
}

export const CARD_BRANDS: { id: CardBrand; name: string }[] = [
  { id: "visa", name: "Visa" },
  { id: "mastercard", name: "Mastercard" },
  { id: "amex", name: "American Express" },
  { id: "discover", name: "Discover" },
];

export interface CardData {
  number: string;
  name: string;
  cvv: string;
  expiry: string;
  brand: CardBrand;
}

const FIRST_NAMES = [
  "John", "Maria", "James", "Sarah", "Robert", "Linda", "Michael", "Jennifer",
  "David", "Patricia", "William", "Elizabeth", "Richard", "Barbara", "Joseph",
  "Susan", "Thomas", "Jessica", "Charles", "Karen", "Daniel", "Nancy",
];

const LAST_NAMES = [
  "Smith", "Garcia", "Johnson", "Williams", "Brown", "Jones", "Miller",
  "Davis", "Rodriguez", "Martinez", "Anderson", "Taylor", "Thomas",
  "Jackson", "White", "Harris", "Martin", "Thompson", "Moore", "Allen",
];

export function generateFakeName(): string {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${first} ${last}`;
}

export function generateCVV(brand: CardBrand): string {
  const length = brand === "amex" ? 4 : 3;
  return generateRandomDigits(length);
}

export function generateExpiryDate(): string {
  const now = new Date();
  const year = now.getFullYear() + 1 + Math.floor(Math.random() * 5);
  const month = Math.floor(Math.random() * 12) + 1;
  return `${String(month).padStart(2, "0")}/${String(year % 100).padStart(2, "0")}`;
}

export function generateCardData(brand: CardBrand): CardData {
  return {
    number: formatCardNumber(generateCardNumber(brand)),
    name: generateFakeName(),
    cvv: generateCVV(brand),
    expiry: generateExpiryDate(),
    brand,
  };
}
