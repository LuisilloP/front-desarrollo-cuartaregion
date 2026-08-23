/**
 * Google Tag Manager container.
 *
 * The container ID is public by design (it ships in the page source), so the
 * production container is the default and the site keeps tracking even if the
 * env var is not set. Point a build at a different container with
 * PUBLIC_GTM_ID, or set it to an empty value to drop GTM from the output.
 */
const DEFAULT_GTM_ID = "GTM-5VZ9RFTH";

const configured = import.meta.env.PUBLIC_GTM_ID;

export const GTM_ID = (configured ?? DEFAULT_GTM_ID).trim();

export const isGtmEnabled = GTM_ID.length > 0;
