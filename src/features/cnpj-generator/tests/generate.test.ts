import { describe, it, expect } from "vitest";
import { generateCnpj, validateCnpj, formatCnpj } from "../utils/generate";

describe("CNPJ Generator", () => {
  describe("generateCnpj", () => {
    it("returns a formatted string with 14 digits", () => {
      const cnpj = generateCnpj();
      const digits = cnpj.replace(/\D/g, "");
      expect(digits).toHaveLength(14);
    });

    it("formats with mask XX.XXX.XXX/XXXX-XX", () => {
      const cnpj = generateCnpj();
      expect(cnpj).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/);
    });
  });

  describe("validateCnpj", () => {
    it("accepts a valid CNPJ", () => {
      const validCnpj = "11222333000181";
      expect(validateCnpj(validCnpj)).toBe(true);
    });

    it("rejects all same digits", () => {
      expect(validateCnpj("11111111111111")).toBe(false);
      expect(validateCnpj("00000000000000")).toBe(false);
    });

    it("rejects wrong check digits", () => {
      expect(validateCnpj("11222333000180")).toBe(false);
      expect(validateCnpj("11222333000182")).toBe(false);
    });
  });

  describe("formatCnpj", () => {
    it("formats 14 raw digits correctly", () => {
      expect(formatCnpj("11222333000181")).toBe("11.222.333/0001-81");
    });

    it("returns original string if not 14 digits", () => {
      expect(formatCnpj("12345")).toBe("12345");
    });

    it("strips existing formatting before applying mask", () => {
      expect(formatCnpj("11.222.333/0001-81")).toBe("11.222.333/0001-81");
    });
  });
});
