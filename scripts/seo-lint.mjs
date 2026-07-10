// SEO / GEO invariant linter.
//
// Guards the discovery and authority layer fixes so the same class of issues
// cannot silently regress. Runs on every commit via the husky pre-commit hook
// (see .husky/pre-commit) and is fast enough to run without a build.
//
// It checks, at the source level:
//   1. astro.config sets `site` and enables the sitemap integration.
//   2. public/robots.txt exists and declares a Sitemap plus content signals.
//   3. public/llms.txt exists.
//   4. Brand assets referenced by every page head are present on disk.
//   5. Every full-document page template ships a canonical link and an og:image
//      (error pages that opt out with noindex are exempt).
//
// Run: `pnpm lint`

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const errors = [];

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function requireFile(path, hint) {
  if (!existsSync(join(root, path))) {
    errors.push(`Missing required file: ${path}${hint ? ` (${hint})` : ""}`);
    return false;
  }
  return true;
}

// 1. astro.config: site + sitemap integration.
if (requireFile("astro.config.mjs")) {
  const cfg = read("astro.config.mjs");
  if (!/\bsite\s*:/.test(cfg)) {
    errors.push("astro.config.mjs must set `site` so canonical, sitemap, and RSS URLs resolve to the production origin.");
  }
  if (!/@astrojs\/sitemap/.test(cfg) || !/sitemap\s*\(/.test(cfg)) {
    errors.push("astro.config.mjs must register the @astrojs/sitemap integration so /sitemap-index.xml is generated.");
  }
}

// 2. robots.txt with Sitemap + content signals.
if (requireFile("public/robots.txt")) {
  const robots = read("public/robots.txt");
  if (!/^Sitemap:\s*https?:\/\/\S+/m.test(robots)) {
    errors.push("public/robots.txt must contain a `Sitemap:` directive pointing at the sitemap index.");
  }
  if (!/Content-Signal:/i.test(robots)) {
    errors.push("public/robots.txt must declare crawler intent with a `Content-Signal:` directive.");
  }
}

// 3. llms.txt must be deployed (served from public/, not only the repo root).
requireFile("public/llms.txt", "move it into public/ so it is served at /llms.txt");

// 4. Brand assets referenced by page heads.
for (const asset of [
  "public/favicon.ico",
  "public/apple-touch-icon.png",
  "public/og/cover.png",
  "public/og/blog-default.png",
  "public/og/logo.png"
]) {
  requireFile(asset, "referenced by page <head> / structured data");
}

// 5. Every full-document page template needs canonical + og:image.
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (name.endsWith(".astro")) out.push(full);
  }
  return out;
}

const pagesDir = join(root, "src/pages");
if (existsSync(pagesDir)) {
  for (const file of walk(pagesDir)) {
    const src = readFileSync(file, "utf8");
    const rel = relative(root, file);
    // Only full HTML documents. Skip partials and pages that opt out of
    // indexing (error pages legitimately have no canonical/og:image).
    if (!/<html[\s>]/.test(src)) continue;
    if (/noindex/.test(src)) continue;
    if (!/rel="canonical"/.test(src)) {
      errors.push(`${rel} renders a full document but has no <link rel="canonical">.`);
    }
    if (!/property="og:image"/.test(src)) {
      errors.push(`${rel} renders a full document but has no og:image meta tag.`);
    }
  }
}

if (errors.length) {
  console.error("\nSEO lint failed:\n");
  for (const e of errors) console.error(`  - ${e}`);
  console.error("");
  process.exit(1);
}

console.log("SEO lint passed: discovery and authority invariants hold.");
