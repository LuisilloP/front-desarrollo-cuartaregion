/**
 * Google Tag Manager container.
 *
 * The container ID is public by design (it ships in the page source), so the
 * production container is the default and the site keeps tracking even if the
 * env var is not set.
 *
 * An empty value means "not configured", NOT "disabled". Docker turns an
 * unset ARG into an empty-string ENV, so treating blank as intent silently
 * dropped GTM from every page the first time this built through the
 * Dockerfile. To actually switch GTM off, set PUBLIC_GTM_ID to `off`.
 */
const DEFAULT_GTM_ID = "GTM-5VZ9RFTH";

/** Explicit opt-out values, so disabling GTM always looks deliberate. */
const DISABLED_VALUES = new Set(["off", "none", "false", "0"]);

const configured = (import.meta.env.PUBLIC_GTM_ID ?? "").trim();

export const GTM_ID = DISABLED_VALUES.has(configured.toLowerCase())
  ? ""
  : configured || DEFAULT_GTM_ID;

export const isGtmEnabled = GTM_ID.length > 0;
