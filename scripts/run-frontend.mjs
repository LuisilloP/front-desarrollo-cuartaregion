import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const parseBool = (value, defaultValue = false) => {
  if (value === undefined) return defaultValue;
  return ["1", "true", "yes", "on"].includes(String(value).toLowerCase());
};

const toGraphqlUrl = (base) => {
  if (!base) return undefined;
  return base.endsWith("/") ? `${base}graphql` : `${base}/graphql`;
};

const graphqlUrl =
  process.env.STRAPI_INTERNAL_GRAPHQL_URL ??
  toGraphqlUrl(process.env.STRAPI_INTERNAL_URL) ??
  process.env.PUBLIC_STRAPI_GRAPHQL_URL ??
  toGraphqlUrl(process.env.PUBLIC_STRAPI_URL);

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with code ${code ?? "unknown"}`));
    });
  });

const waitForStrapi = async () => {
  await run("node", ["./scripts/wait-for-strapi.mjs"]);
};

const fetchFingerprint = async () => {
  if (!graphqlUrl) return null;

  const headers = { "Content-Type": "application/json" };
  if (process.env.STRAPI_TOKEN) headers.Authorization = `Bearer ${process.env.STRAPI_TOKEN}`;

  const query = `
    query BuildFingerprint($pageSize: Int!) {
      siteSetting { updatedAt }
      services_connection(pagination: { page: 1, pageSize: $pageSize }, sort: ["updatedAt:desc"]) {
        nodes { updatedAt }
        pageInfo { total }
      }
      cases_connection(pagination: { page: 1, pageSize: $pageSize }, sort: ["updatedAt:desc"]) {
        nodes { updatedAt }
        pageInfo { total }
      }
      posts_connection(pagination: { page: 1, pageSize: $pageSize }, sort: ["updatedAt:desc"]) {
        nodes { updatedAt }
        pageInfo { total }
      }
      testimonials_connection(pagination: { page: 1, pageSize: $pageSize }, sort: ["updatedAt:desc"]) {
        nodes { updatedAt }
        pageInfo { total }
      }
      faqs_connection(pagination: { page: 1, pageSize: $pageSize }, sort: ["updatedAt:desc"]) {
        nodes { updatedAt }
        pageInfo { total }
      }
    }
  `;

  const response = await fetch(graphqlUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables: { pageSize: 1 } })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GraphQL failed (${response.status}): ${detail}`);
  }

  const payload = await response.json();
  if (payload?.errors?.length) {
    const message = payload.errors[0]?.message ?? "GraphQL error";
    throw new Error(message);
  }

  const data = payload?.data ?? {};
  const pickConnection = (conn) => {
    const updatedAt = conn?.nodes?.[0]?.updatedAt ?? "";
    const total = conn?.pageInfo?.total ?? "";
    return `${updatedAt}:${total}`;
  };

  return [
    data.siteSetting?.updatedAt ?? "",
    pickConnection(data.services_connection),
    pickConnection(data.cases_connection),
    pickConnection(data.posts_connection),
    pickConnection(data.testimonials_connection),
    pickConnection(data.faqs_connection)
  ].join("|");
};

const startPreview = (port) => {
  const child = spawn("npm", ["run", "preview", "--", "--host", "0.0.0.0", "--port", port], { stdio: "inherit" });
  const shutdown = () => child.kill("SIGTERM");
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
  child.on("exit", (code) => process.exit(code ?? 0));
  return child;
};

const main = async () => {
  const autoRebuild = parseBool(process.env.STRAPI_AUTO_REBUILD, true);
  const intervalMs = Number(process.env.STRAPI_WATCH_INTERVAL_MS ?? "30000");
  const debounceMs = Number(process.env.STRAPI_REBUILD_DEBOUNCE_MS ?? "5000");
  const port = process.env.FRONT_PORT ?? "4321";

  await waitForStrapi();
  await run("npm", ["run", "build"]);
  startPreview(port);

  if (!autoRebuild) return;

  let lastFingerprint = null;
  let building = false;
  let pending = false;

  const rebuild = async () => {
    pending = true;
    if (building) return false;

    while (pending) {
      pending = false;
      building = true;
      if (debounceMs > 0) await sleep(debounceMs);
      try {
        await run("npm", ["run", "build"]);
        building = false;
      } catch (error) {
        console.error("[front] build failed:", error);
        building = false;
        return false;
      }
    }
    return true;
  };

  for (;;) {
    try {
      const fingerprint = await fetchFingerprint();
      if (!fingerprint) {
        await sleep(intervalMs);
        continue;
      }

      if (!lastFingerprint) {
        lastFingerprint = fingerprint;
        await sleep(intervalMs);
        continue;
      }

      if (fingerprint !== lastFingerprint) {
        console.log("[front] Strapi change detected. Rebuilding...");
        const ok = await rebuild();
        if (ok) lastFingerprint = fingerprint;
      }
    } catch (error) {
      console.error("[front] watch error:", error);
    }

    await sleep(intervalMs);
  }
};

main().catch((error) => {
  console.error("[front] startup failed:", error);
  process.exit(1);
});
