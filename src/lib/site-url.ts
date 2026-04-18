/**
 * Kanonisk URL for metadata (og:image, metadataBase).
 * Ikke bruk bare `VERCEL_URL` for deling — den peker på preview-deploy; Facebook får da ofte HTML i stedet for bildet.
 */
export function getMetadataSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    const u = explicit.replace(/\/$/, "");
    if (u.startsWith("http://") || u.startsWith("https://")) return u;
    return `https://${u}`;
  }

  const prod = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (prod) {
    const host = prod.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://${host}`;
  }

  // Siste utvei: gjeldende deploy (ofte preview) — dårlig for OG hvis URL krever auth
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
