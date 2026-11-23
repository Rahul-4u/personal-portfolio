import { describe, expect, it } from "vitest";
import { resolveTheme } from "@/lib/theme";

describe("resolveTheme", () => {
  it("defaults to dark mode for first-time visitors", () => {
    expect(resolveTheme(null)).toBe("dark");
  });

  it("keeps a saved light mode choice", () => {
    expect(resolveTheme("light")).toBe("light");
  });

  it("falls back to dark mode for unknown saved values", () => {
    expect(resolveTheme("purple")).toBe("dark");
  });
});
