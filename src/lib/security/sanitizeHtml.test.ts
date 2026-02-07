import { describe, expect, it } from "vitest";
import { sanitizeCmsHtml } from "./sanitizeHtml";

describe("sanitizeCmsHtml", () => {
  it("removes script tags and inline handlers", () => {
    const dirty = `<p onclick="alert(1)">Hola</p><script>alert(1)</script>`;
    const clean = sanitizeCmsHtml(dirty);

    expect(clean).toContain("<p>Hola</p>");
    expect(clean).not.toContain("onclick");
    expect(clean).not.toContain("<script>");
  });

  it("preserves allowed tags and secures external links", () => {
    const dirty = `<a href="https://example.com" target="_blank">Link</a>`;
    const clean = sanitizeCmsHtml(dirty);

    expect(clean).toContain('target="_blank"');
    expect(clean).toContain('rel="noopener noreferrer"');
  });
});
