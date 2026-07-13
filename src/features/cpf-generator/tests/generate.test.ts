import { describe, it, expect } from "vitest";
import { generateCpf, validateCpf, formatCpf } from "../utils/generate";

describe("generateCpf", () => {
  it("generates a CPF with 11 digits", () => {
    const cpf = generateCpf();
    const cleaned = cpf.replace(/\D/g, "");
    expect(cleaned).toHaveLength(11);
  });

  it("generates a CPF in the correct format (XXX.XXX.XXX-XX)", () => {
    const cpf = generateCpf();
    expect(cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
  });

  it("generates a valid CPF", () => {
    const cpf = generateCpf();
    expect(validateCpf(cpf)).toBe(true);
  });

  it("generates unique CPFs", () => {
    const cpf1 = generateCpf();
    const cpf2 = generateCpf();
    expect(cpf1).not.toBe(cpf2);
  });
});

describe("validateCpf", () => {
  it("validates a correctly generated CPF", () => {
    const cpf = generateCpf();
    expect(validateCpf(cpf)).toBe(true);
  });

  it("rejects CPF with all same digits", () => {
    expect(validateCpf("111.111.111-11")).toBe(false);
    expect(validateCpf("000.000.000-00")).toBe(false);
    expect(validateCpf("999.999.999-99")).toBe(false);
  });

  it("rejects CPF with wrong check digits", () => {
    expect(validateCpf("123.456.789-00")).toBe(false);
    expect(validateCpf("123.456.789-10")).toBe(false);
  });

  it("rejects CPF with less than 11 digits", () => {
    expect(validateCpf("123.456.789-0")).toBe(false);
    expect(validateCpf("123.456.789")).toBe(false);
  });

  it("accepts formatted CPF", () => {
    const cpf = generateCpf();
    expect(validateCpf(cpf)).toBe(true);
  });

  it("accepts unformatted CPF", () => {
    const cpf = generateCpf().replace(/\D/g, "");
    expect(validateCpf(cpf)).toBe(true);
  });
});

describe("formatCpf", () => {
  it("formats an unformatted CPF", () => {
    const formatted = formatCpf("12345678909");
    expect(formatted).toBe("123.456.789-09");
  });

  it("returns original string if not 11 digits", () => {
    expect(formatCpf("123")).toBe("123");
  });

  it("handles formatted input", () => {
    const formatted = formatCpf("123.456.789-09");
    expect(formatted).toBe("123.456.789-09");
  });
});
