import { describe, it, expect } from "vitest";
import { encodeUrl, decodeUrl, encodeUrlFull, decodeUrlFull } from "../utils/encode";

describe("encodeUrl (component)", () => {
  it("encodes spaces as %20", () => {
    expect(encodeUrl("hello world")).toBe("hello%20world");
  });

  it("encodes special characters", () => {
    expect(encodeUrl("a&b=c")).toBe("a%26b%3Dc");
  });

  it("encodes forward slashes", () => {
    expect(encodeUrl("path/to/file")).toBe("path%2Fto%2Ffile");
  });

  it("encodes non-ASCII characters", () => {
    expect(encodeUrl("café")).toBe("caf%C3%A9");
  });

  it("does not encode letters, digits, and safe chars", () => {
    expect(encodeUrl("abc123_-~")).toBe("abc123_-~");
  });
});

describe("decodeUrl (component)", () => {
  it("decodes %20 to space", () => {
    expect(decodeUrl("hello%20world")).toBe("hello world");
  });

  it("decodes special characters", () => {
    expect(decodeUrl("a%26b%3Dc")).toBe("a&b=c");
  });

  it("round-trips encode/decode", () => {
    const original = "Hello World! @#$%";
    expect(decodeUrl(encodeUrl(original))).toBe(original);
  });

  it("throws on invalid percent encoding", () => {
    expect(() => decodeUrl("%ZZ")).toThrow();
  });
});

describe("encodeUrlFull (URI)", () => {
  it("does not encode forward slashes", () => {
    expect(encodeUrlFull("path/to/file")).toBe("path/to/file");
  });

  it("encodes spaces", () => {
    expect(encodeUrlFull("hello world")).toBe("hello%20world");
  });

  it("does not encode query parameter separators", () => {
    expect(encodeUrlFull("key=value&foo=bar")).toBe("key=value&foo=bar");
  });
});

describe("decodeUrlFull (URI)", () => {
  it("decodes encoded URI", () => {
    expect(decodeUrlFull("hello%20world")).toBe("hello world");
  });

  it("round-trips encode/decode", () => {
    const original = "https://example.com/path?q=test";
    expect(decodeUrlFull(encodeUrlFull(original))).toBe(original);
  });
});
