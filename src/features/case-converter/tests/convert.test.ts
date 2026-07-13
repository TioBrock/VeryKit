import { describe, it, expect } from "vitest";
import { convertCase } from "../utils/convert";

describe("convertCase", () => {
  it("converts to UPPERCASE", () => {
    expect(convertCase("hello world", "uppercase")).toBe("HELLO WORLD");
  });

  it("converts to lowercase", () => {
    expect(convertCase("HELLO WORLD", "lowercase")).toBe("hello world");
  });

  it("converts to Title Case", () => {
    expect(convertCase("hello world", "titleCase")).toBe("Hello World");
  });

  it("converts to Sentence case", () => {
    expect(convertCase("hello world", "sentenceCase")).toBe("Hello world");
  });

  it("converts to camelCase", () => {
    expect(convertCase("hello world", "camelCase")).toBe("helloWorld");
  });

  it("converts to PascalCase", () => {
    expect(convertCase("hello world", "pascalCase")).toBe("HelloWorld");
  });

  it("converts to snake_case", () => {
    expect(convertCase("helloWorld", "snakeCase")).toBe("hello_world");
  });

  it("converts to kebab-case", () => {
    expect(convertCase("helloWorld", "kebabCase")).toBe("hello-world");
  });

  it("converts to dot.case", () => {
    expect(convertCase("helloWorld", "dotCase")).toBe("hello.world");
  });

  it("converts to CONSTANT_CASE", () => {
    expect(convertCase("hello world", "constantCase")).toBe("HELLO_WORLD");
  });

  it("handles empty string", () => {
    expect(convertCase("", "camelCase")).toBe("");
  });

  it("handles single word", () => {
    expect(convertCase("hello", "camelCase")).toBe("hello");
    expect(convertCase("hello", "pascalCase")).toBe("Hello");
    expect(convertCase("Hello", "snakeCase")).toBe("hello");
  });

  it("handles snake_case input", () => {
    expect(convertCase("hello_world", "camelCase")).toBe("helloWorld");
    expect(convertCase("hello_world", "pascalCase")).toBe("HelloWorld");
    expect(convertCase("hello_world", "kebabCase")).toBe("hello-world");
  });

  it("handles kebab-case input", () => {
    expect(convertCase("hello-world", "camelCase")).toBe("helloWorld");
    expect(convertCase("hello-world", "snakeCase")).toBe("hello_world");
  });

  it("handles camelCase input", () => {
    expect(convertCase("helloWorld", "snakeCase")).toBe("hello_world");
    expect(convertCase("helloWorld", "kebabCase")).toBe("hello-world");
    expect(convertCase("helloWorld", "uppercase")).toBe("HELLOWORLD");
  });
});
