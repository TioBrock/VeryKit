import { describe, it, expect } from "vitest";
import { generateUuid } from "../utils/generate";

describe("generateUuid", () => {
  it("returns a valid UUID v4 format", () => {
    const uuid = generateUuid();
    expect(uuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it("returns unique values on successive calls", () => {
    const uuid1 = generateUuid();
    const uuid2 = generateUuid();
    expect(uuid1).not.toBe(uuid2);
  });
});
