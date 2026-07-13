import { describe, it, expect } from "vitest";
import { generateLoremIpsum } from "../utils/generate";

describe("generateLoremIpsum", () => {
  it("generates the correct number of paragraphs", () => {
    const result = generateLoremIpsum(3, "paragraphs");
    const paragraphs = result.split("\n\n");
    expect(paragraphs).toHaveLength(3);
  });

  it("generates the correct number of words", () => {
    const result = generateLoremIpsum(5, "words");
    const words = result.split("\n");
    expect(words).toHaveLength(5);
  });

  it("generates the correct number of list items", () => {
    const result = generateLoremIpsum(4, "lists");
    const items = result.split("\n");
    expect(items).toHaveLength(4);
    items.forEach((item) => {
      expect(item).toMatch(/^- /);
    });
  });

  it("generates a single item", () => {
    const result = generateLoremIpsum(1, "paragraphs");
    expect(result).not.toContain("\n\n");
    expect(result.length).toBeGreaterThan(0);
  });

  it("generates 100 items", () => {
    const result = generateLoremIpsum(100, "words");
    const words = result.split("\n");
    expect(words).toHaveLength(100);
  });

  it("paragraphs end with a period", () => {
    const result = generateLoremIpsum(3, "paragraphs");
    const paragraphs = result.split("\n\n");
    paragraphs.forEach((p) => {
      expect(p).toMatch(/\.$/);
    });
  });

  it("words are lowercase", () => {
    const result = generateLoremIpsum(10, "words");
    const words = result.split("\n");
    words.forEach((w) => {
      expect(w).toBe(w.toLowerCase());
    });
  });
});
