import { describe, it, expect } from "vitest";
import { generateHash } from "../utils/hash";

describe("Hash Generator", () => {
  it("returns correct MD5 for 'hello'", async () => {
    const hash = await generateHash("hello", "MD5");
    expect(hash).toBe("5d41402abc4b2a76b9719d911017c592");
  });

  it("returns correct SHA-256 for 'hello'", async () => {
    const hash = await generateHash("hello", "SHA-256");
    expect(hash).toBe("2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824");
  });

  it("returns different hashes for different inputs", async () => {
    const hash1 = await generateHash("hello", "MD5");
    const hash2 = await generateHash("world", "MD5");
    expect(hash1).not.toBe(hash2);
  });

  it("handles empty string", async () => {
    const hash = await generateHash("", "MD5");
    expect(hash).toBe("d41d8cd98f00b204e9800998ecf8427e");
  });
});
