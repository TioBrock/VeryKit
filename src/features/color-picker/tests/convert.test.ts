import { describe, it, expect } from "vitest";
import { hexToColorFormats, isValidHex, normalizeHex } from "../utils/convert";

describe("Color Converter", () => {
  describe("hexToColorFormats", () => {
    it("converts #FF0000 (red) correctly", () => {
      const result = hexToColorFormats("#FF0000");
      expect(result.rgb).toBe("rgb(255, 0, 0)");
      expect(result.hsl).toBe("hsl(0, 100%, 50%)");
      expect(result.cmyk).toBe("cmyk(0%, 100%, 100%, 0%)");
    });

    it("converts #00FF00 (green) correctly", () => {
      const result = hexToColorFormats("#00FF00");
      expect(result.rgb).toBe("rgb(0, 255, 0)");
      expect(result.hsl).toBe("hsl(120, 100%, 50%)");
      expect(result.cmyk).toBe("cmyk(100%, 0%, 100%, 0%)");
    });

    it("converts #0000FF (blue) correctly", () => {
      const result = hexToColorFormats("#0000FF");
      expect(result.rgb).toBe("rgb(0, 0, 255)");
      expect(result.hsl).toBe("hsl(240, 100%, 50%)");
      expect(result.cmyk).toBe("cmyk(100%, 100%, 0%, 0%)");
    });

    it("converts #3498db (peter river) correctly", () => {
      const result = hexToColorFormats("#3498db");
      expect(result.rgb).toBe("rgb(52, 152, 219)");
      expect(result.hsl).toBe("hsl(204, 70%, 53%)");
      expect(result.cmyk).toBe("cmyk(76%, 31%, 0%, 14%)");
    });
  });

  describe("isValidHex", () => {
    it("accepts valid 6-char hex with #", () => {
      expect(isValidHex("#FF0000")).toBe(true);
    });

    it("accepts valid 3-char hex without #", () => {
      expect(isValidHex("F0F")).toBe(true);
    });

    it("accepts valid 3-char hex with #", () => {
      expect(isValidHex("#F0F")).toBe(true);
    });

    it("rejects invalid hex", () => {
      expect(isValidHex("#GGG")).toBe(false);
      expect(isValidHex("12345")).toBe(false);
      expect(isValidHex("#12345")).toBe(false);
      expect(isValidHex("#1234567")).toBe(false);
    });
  });

  describe("normalizeHex", () => {
    it("expands 3-char hex to 6-char", () => {
      expect(normalizeHex("#F0F")).toBe("#FF00FF");
    });

    it("leaves 6-char hex unchanged", () => {
      expect(normalizeHex("#FF00FF")).toBe("#FF00FF");
    });

    it("adds # prefix if missing", () => {
      expect(normalizeHex("F0F")).toBe("#FF00FF");
    });
  });
});
