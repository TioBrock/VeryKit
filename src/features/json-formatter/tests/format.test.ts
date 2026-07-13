import { describe, it, expect } from "vitest";
import { formatJson, minifyJson, isValidJson } from "../utils/format";

describe("formatJson", () => {
  it("formats a simple JSON object with 2-space indent", () => {
    const input = '{"name":"John","age":30}';
    const result = formatJson(input, 2);
    expect(result).toContain('"name": "John"');
    expect(result).toContain('"age": 30');
    expect(result).toContain("\n");
  });

  it("formats with 4-space indent", () => {
    const input = '{"name":"John"}';
    const result = formatJson(input, 4);
    expect(result).toContain('    "name": "John"');
  });

  it("formats nested JSON", () => {
    const input = '{"a":{"b":{"c":1}}}';
    const result = formatJson(input, 2);
    expect(result).toContain('"a"');
    expect(result).toContain('"b"');
    expect(result).toContain('"c": 1');
  });

  it("formats JSON arrays", () => {
    const input = "[1,2,3]";
    const result = formatJson(input, 2);
    expect(result).toContain("1");
    expect(result).toContain("2");
    expect(result).toContain("3");
  });

  it("throws on invalid JSON", () => {
    expect(() => formatJson("not json")).toThrow();
  });
});

describe("minifyJson", () => {
  it("removes whitespace from formatted JSON", () => {
    const formatted = '{\n  "name": "John",\n  "age": 30\n}';
    const result = minifyJson(formatted);
    expect(result).toBe('{"name":"John","age":30}');
  });

  it("handles already minified JSON", () => {
    const input = '{"a":1}';
    const result = minifyJson(input);
    expect(result).toBe('{"a":1}');
  });

  it("throws on invalid JSON", () => {
    expect(() => minifyJson("invalid")).toThrow();
  });
});

describe("isValidJson", () => {
  it("returns true for valid JSON", () => {
    expect(isValidJson('{"key":"value"}')).toBe(true);
    expect(isValidJson("[1,2,3]")).toBe(true);
    expect(isValidJson('"string"')).toBe(true);
    expect(isValidJson("123")).toBe(true);
    expect(isValidJson("true")).toBe(true);
    expect(isValidJson("null")).toBe(true);
  });

  it("returns false for invalid JSON", () => {
    expect(isValidJson("{key: value}")).toBe(false);
    expect(isValidJson("undefined")).toBe(false);
    expect(isValidJson("")).toBe(false);
    expect(isValidJson("not json")).toBe(false);
  });
});
