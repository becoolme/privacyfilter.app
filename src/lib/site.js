// Single source of truth for the production origin and shared brand assets.
// Imported by astro.config.mjs, page templates, and lib/blog.ts so canonical
// URLs, sitemap, Open Graph tags, and structured data all stay in sync.

export const SITE_ORIGIN = "https://privacyfilter.app";

export const ORG_NAME = "Privacy Filter";

// Absolute URLs used by structured data and Open Graph tags.
export const OG_IMAGE = `${SITE_ORIGIN}/og/cover.png`;
export const OG_BLOG_IMAGE = `${SITE_ORIGIN}/og/blog-default.png`;
export const OG_IMAGE_WIDTH = "1200";
export const OG_IMAGE_HEIGHT = "630";
export const LOGO_URL = `${SITE_ORIGIN}/og/logo.png`;

export const GITHUB_URL = "https://github.com/becoolme/privacyfilter.app";
export const MODEL_URL = "https://huggingface.co/openai/privacy-filter";

// Entity graph for the Organization schema (sameAs profiles).
export const ORG_SAME_AS = [GITHUB_URL, MODEL_URL];

// Join the origin with a root-relative path, guarding against double slashes.
export function absoluteUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
