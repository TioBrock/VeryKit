import { describe, it, expect } from "vitest";
import {
  timestampToDate,
  dateToTimestamp,
  getCurrentTimestamp,
  autoDetectUnit,
} from "../utils/convert";

describe("timestampToDate", () => {
  it("converts seconds timestamp to UTC ISO string", () => {
    const result = timestampToDate(1700000000, "seconds", "utc");
    expect(result).toBe("2023-11-14T22:13:20.000Z");
  });

  it("converts milliseconds timestamp to UTC ISO string", () => {
    const result = timestampToDate(1700000000000, "milliseconds", "utc");
    expect(result).toBe("2023-11-14T22:13:20.000Z");
  });

  it("converts seconds timestamp to local time", () => {
    const result = timestampToDate(1700000000, "seconds", "local");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("throws on invalid timestamp", () => {
    expect(() => timestampToDate(NaN, "seconds", "utc")).toThrow("Invalid timestamp");
  });

  it("converts epoch zero to 1970-01-01", () => {
    const result = timestampToDate(0, "seconds", "utc");
    expect(result).toBe("1970-01-01T00:00:00.000Z");
  });
});

describe("dateToTimestamp", () => {
  it("converts ISO date to seconds timestamp", () => {
    const result = dateToTimestamp("2023-11-14T22:13:20.000Z", "seconds");
    expect(result).toBe(1700000000);
  });

  it("converts ISO date to milliseconds timestamp", () => {
    const result = dateToTimestamp("2023-11-14T22:13:20.000Z", "milliseconds");
    expect(result).toBe(1700000000000);
  });

  it("throws on invalid date", () => {
    expect(() => dateToTimestamp("not-a-date", "seconds")).toThrow("Invalid date format");
  });

  it("round-trips timestamp -> date -> timestamp", () => {
    const original = 1700000000;
    const dateStr = timestampToDate(original, "seconds", "utc");
    const result = dateToTimestamp(dateStr, "seconds");
    expect(result).toBe(original);
  });
});

describe("getCurrentTimestamp", () => {
  it("returns a number in seconds", () => {
    const ts = getCurrentTimestamp("seconds");
    expect(typeof ts).toBe("number");
    expect(ts).toBeGreaterThan(0);
    expect(ts).toBeLessThan(10000000000);
  });

  it("returns a number in milliseconds", () => {
    const ts = getCurrentTimestamp("milliseconds");
    expect(typeof ts).toBe("number");
    expect(ts).toBeGreaterThan(1000000000000);
  });

  it("seconds is roughly 10 digits", () => {
    const ts = getCurrentTimestamp("seconds");
    expect(String(ts)).toHaveLength(10);
  });

  it("milliseconds is roughly 13 digits", () => {
    const ts = getCurrentTimestamp("milliseconds");
    expect(String(ts)).toHaveLength(13);
  });
});

describe("autoDetectUnit", () => {
  it("detects seconds for 10-digit numbers", () => {
    expect(autoDetectUnit("1700000000")).toBe("seconds");
  });

  it("detects milliseconds for 13-digit numbers", () => {
    expect(autoDetectUnit("1700000000000")).toBe("milliseconds");
  });

  it("defaults to seconds for small numbers", () => {
    expect(autoDetectUnit("123")).toBe("seconds");
  });
});
