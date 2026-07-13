import { describe, it, expect } from "vitest";
import { generateCardNumber, formatCardNumber, isValidLuhn } from "../utils/generate";
import type { CardBrand } from "../utils/generate";

describe("Credit Card Generator", () => {
  describe("generateCardNumber", () => {
    it("returns 16 digits for Visa", () => {
      const num = generateCardNumber("visa");
      expect(num).toHaveLength(16);
    });

    it("returns 16 digits for Mastercard", () => {
      const num = generateCardNumber("mastercard");
      expect(num).toHaveLength(16);
    });

    it("returns 15 digits for Amex", () => {
      const num = generateCardNumber("amex");
      expect(num).toHaveLength(15);
    });

    it("returns 16 digits for Discover", () => {
      const num = generateCardNumber("discover");
      expect(num).toHaveLength(16);
    });
  });

  describe("formatCardNumber", () => {
    it("formats with spaces every 4 digits", () => {
      expect(formatCardNumber("4111111111111111")).toBe("4111 1111 1111 1111");
    });

    it("strips existing spaces before reformatting", () => {
      expect(formatCardNumber("4111 1111 1111 1111")).toBe("4111 1111 1111 1111");
    });
  });

  describe("isValidLuhn", () => {
    it("validates a correct Luhn number", () => {
      expect(isValidLuhn("4111111111111111")).toBe(true);
    });

    it("rejects an invalid Luhn number", () => {
      expect(isValidLuhn("4111111111111112")).toBe(false);
    });

    it("returns false for strings shorter than 2 digits", () => {
      expect(isValidLuhn("4")).toBe(false);
    });
  });

  describe("brands generate different prefixes", () => {
    const brands: CardBrand[] = ["visa", "mastercard", "amex", "discover"];

    for (const brand of brands) {
      it(`${brand} starts with expected prefix pattern`, () => {
        const num = generateCardNumber(brand);
        switch (brand) {
          case "visa":
            expect(num).toMatch(/^4/);
            break;
          case "mastercard":
            expect(num).toMatch(/^5[1-5]/);
            break;
          case "amex":
            expect(num).toMatch(/^3[47]/);
            break;
          case "discover":
            expect(num).toMatch(/^(6011|65)/);
            break;
        }
      });
    }
  });
});
