const endpoint = (
  import.meta.env.PUBLIC_CONTACT_ENDPOINT ||
  "https://blog.afzalex.workers.dev"
).replace(/\/$/, "");

export const CONTACT = {
  action: "turnstile-spin-v2",
  email: "contact@afzalex.com",
  endpoint,
  turnstileSiteKey:
    import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ||
    "0x4AAAAAAD-RW8eXscTp-0Ba",
};
