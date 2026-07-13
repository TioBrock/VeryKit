import { describe, it, expect } from "vitest";
import { encodeBase64, decodeBase64 } from "../utils/convert";

describe("encodeBase64", () => {
  it("encodes a simple string", () => {
    expect(encodeBase64("Hello")).toBe("SGVsbG8=");
  });

  it("encodes an empty string", () => {
    expect(encodeBase64("")).toBe("");
  });

  it("encodes special characters", () => {
    expect(encodeBase64("!@#$%")).toBe("IUAjJCU=");
  });

  it("encodes spaces", () => {
    expect(encodeBase64("Hello World")).toBe("SGVsbG8gV29ybGQ=");
  });

  it("encodes UTF-8 characters", () => {
    const encoded = encodeBase64("Olá");
    expect(encoded).toBeTruthy();
    expect(decodeBase64(encoded)).toBe("Olá");
  });

  it("encodes emojis", () => {
    const encoded = encodeBase64("😀");
    expect(encoded).toBeTruthy();
    expect(decodeBase64(encoded)).toBe("😀");
  });
});

describe("decodeBase64", () => {
  it("decodes a simple string", () => {
    expect(decodeBase64("SGVsbG8=")).toBe("Hello");
  });

  it("decodes an empty string", () => {
    expect(decodeBase64("")).toBe("");
  });

  it("decodes special characters", () => {
    expect(decodeBase64("IUAjJCU=")).toBe("!@#$%");
  });

  it("round-trips encode/decode", () => {
    const original = "Hello, World! 123";
    expect(decodeBase64(encodeBase64(original))).toBe(original);
  });

  it("round-trips UTF-8 text", () => {
    const original = "Café résumé naïve";
    expect(decodeBase64(encodeBase64(original))).toBe(original);
  });

  it("throws on invalid Base64", () => {
    expect(() => decodeBase64("!!!invalid!!!")).toThrow();
  });
});
