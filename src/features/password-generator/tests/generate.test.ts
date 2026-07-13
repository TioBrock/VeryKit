import { describe, it, expect } from "vitest";
import { generatePassword } from "../utils/generate";

describe("generatePassword", () => {
  it("returns a password with the specified length", () => {
    const password = generatePassword({ length: 20, uppercase: true, lowercase: true, numbers: true, symbols: false });
    expect(password).toHaveLength(20);
  });

  it("returns a password with minimum length", () => {
    const password = generatePassword({ length: 4, uppercase: true, lowercase: false, numbers: false, symbols: false });
    expect(password).toHaveLength(4);
  });

  it("returns a password with maximum length", () => {
    const password = generatePassword({ length: 128, uppercase: true, lowercase: false, numbers: false, symbols: false });
    expect(password).toHaveLength(128);
  });

  it("only contains uppercase letters when only uppercase is selected", () => {
    const password = generatePassword({ length: 50, uppercase: true, lowercase: false, numbers: false, symbols: false });
    expect(password).toMatch(/^[A-Z]+$/);
  });

  it("only contains lowercase letters when only lowercase is selected", () => {
    const password = generatePassword({ length: 50, uppercase: false, lowercase: true, numbers: false, symbols: false });
    expect(password).toMatch(/^[a-z]+$/);
  });

  it("only contains numbers when only numbers is selected", () => {
    const password = generatePassword({ length: 50, uppercase: false, lowercase: false, numbers: true, symbols: false });
    expect(password).toMatch(/^[0-9]+$/);
  });

  it("only contains symbols when only symbols is selected", () => {
    const password = generatePassword({ length: 50, uppercase: false, lowercase: false, numbers: false, symbols: true });
    expect(password).toMatch(/^[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/);
  });

  it("throws when no character type is selected", () => {
    expect(() =>
      generatePassword({ length: 16, uppercase: false, lowercase: false, numbers: false, symbols: false }),
    ).toThrow("At least one character type must be selected");
  });

  it("returns unique values on successive calls", () => {
    const p1 = generatePassword({ length: 32, uppercase: true, lowercase: true, numbers: true, symbols: true });
    const p2 = generatePassword({ length: 32, uppercase: true, lowercase: true, numbers: true, symbols: true });
    expect(p1).not.toBe(p2);
  });
});
