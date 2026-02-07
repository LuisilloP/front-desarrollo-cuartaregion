import { describe, expect, it } from "vitest";
import { getMediaAlt, getMediaUrl } from "./media";

describe("media helpers", () => {
  it("resolves url from entity attributes", () => {
    const url = getMediaUrl({ data: { attributes: { url: "/uploads/image.webp" } } });
    expect(url).toContain("/uploads/image.webp");
  });

  it("resolves alt from plain media item", () => {
    const alt = getMediaAlt({ url: "/uploads/image.webp", alternativeText: "Hero image" });
    expect(alt).toBe("Hero image");
  });

  it("returns undefined for missing media", () => {
    expect(getMediaUrl(undefined)).toBeUndefined();
    expect(getMediaAlt(null)).toBeUndefined();
  });
});
