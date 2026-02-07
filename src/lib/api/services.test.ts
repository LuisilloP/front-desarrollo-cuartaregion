import { describe, expect, it } from "vitest";
import { getServicesList } from "./services";

describe("services fallback filters", () => {
  it("filters featured services in mock fallback", async () => {
    const result = await getServicesList({ featured: true, pageSize: 100 });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((service) => Boolean(service.featured))).toBe(true);
    expect(result.pagination.total).toBe(result.data.length);
  });

  it("supports software service category", async () => {
    const result = await getServicesList({ type: "software", pageSize: 100 });
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data.every((service) => service.type === "software")).toBe(true);
  });
});
