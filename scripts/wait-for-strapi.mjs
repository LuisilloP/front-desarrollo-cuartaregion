const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const toGraphqlUrl = (base) => {
  if (!base) return undefined;
  return base.endsWith("/") ? `${base}graphql` : `${base}/graphql`;
};

const url =
  process.env.STRAPI_INTERNAL_GRAPHQL_URL ??
  toGraphqlUrl(process.env.STRAPI_INTERNAL_URL) ??
  process.env.PUBLIC_STRAPI_GRAPHQL_URL ??
  toGraphqlUrl(process.env.PUBLIC_STRAPI_URL);

if (!url) {
  console.error("Missing STRAPI_INTERNAL_URL or PUBLIC_STRAPI_URL.");
  process.exit(1);
}

const headers = { "Content-Type": "application/json" };
if (process.env.STRAPI_TOKEN) {
  headers.Authorization = `Bearer ${process.env.STRAPI_TOKEN}`;
}

const body = JSON.stringify({ query: "{ __typename }" });
const maxAttempts = Number(process.env.STRAPI_WAIT_ATTEMPTS ?? "60");
const delayMs = Number(process.env.STRAPI_WAIT_DELAY_MS ?? "2000");

for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  try {
    const response = await fetch(url, { method: "POST", headers, body });
    if (response.status >= 200 && response.status < 500) {
      console.log("Strapi is reachable.");
      process.exit(0);
    }
  } catch {
    // ignore and retry
  }

  console.log(`Waiting for Strapi... (${attempt}/${maxAttempts})`);
  await sleep(delayMs);
}

console.error("Strapi did not respond in time.");
process.exit(1);
