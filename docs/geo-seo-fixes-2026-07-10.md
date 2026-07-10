# GEO/SEO audit fixes - 2026-07-10

Implements the P0 and low-risk P1 findings from the audit `seo-audit/2026-07-04`
(project wiki). Source of truth for the problem list is that report; this file
records what shipped, how it was verified, and what is intentionally deferred.

## What changed (user-visible effect)

| Audit item | Status | Fix |
|---|---|---|
| P0-1 Missing `<link rel="canonical">` | Done | Self-canonical on every page (home x11 locales, blog list, blog post, changelog) driven by a single `SITE_ORIGIN` in `src/lib/site.js`. |
| P0-2 `/sitemap.xml` 404 | Done | Added `@astrojs/sitemap` with i18n config; `site` set in `astro.config.mjs`. Generates `/sitemap-index.xml` + `/sitemap-0.xml` with `xhtml:link` hreflang alternates. |
| P0-3 `robots.txt` had zero directives | Done | `public/robots.txt` now declares `User-agent`, `Allow`, `Content-Signal` (search=yes, ai-input=yes, ai-train=no) and a `Sitemap:` pointer. |
| P0-4 Thin structured data | Done | Added standalone `Organization` schema with `sameAs`; `WebApplication` gained `url`/`image`/`license`/`publisher`; `BlogPosting` gained `url`/`image`/`mainEntityOfPage`/`author.url`/`publisher.logo`; added `BreadcrumbList` and `Blog`/`CollectionPage` schema. |
| P0-5 `llms.txt` not deployed | Done | Moved `llms.txt` to `public/llms.txt` so it serves at `/llms.txt`; added Sitemap, RSS, and Changelog links inside it. |
| P1-1 No og:image / twitter:image | Done | Generated `public/og/cover.png` and `public/og/blog-default.png` (1200x630); wired `og:image`, dimensions, alt, and `twitter:image` on all pages. |
| P1-2 No `/favicon.ico` | Done | Added `public/favicon.ico` (16/32/48) and `public/apple-touch-icon.png` (180) generated from the existing shield mark; kept the inline SVG icon. |
| P1-3 Blog list had no JSON-LD | Done | Added `Blog` schema to `/blog/` and every localized list; each list item is now wrapped in `<article>`. |
| P1-4 No breadcrumb | Done | Visible `<nav aria-label>` breadcrumb plus `BreadcrumbList` schema on blog posts (localized label). |
| P1-5 No RSS | Done | `@astrojs/rss` feed at `/blog/rss.xml`; discoverable via `<link rel="alternate" type="application/rss+xml">`. |
| P1-6 HEAD `/robots.txt` 404 | Done (verify in prod) | robots.txt is now a real static asset served by the Workers `ASSETS` binding, which answers GET and HEAD. Re-check on production after deploy. |
| Changelog page | Done | New `/changelog/` (+ 10 localized routes) built from `src/lib/changelog.js`. User-facing copy only, no internal detail, no em-dashes. |

## Regression guard

- Added `scripts/seo-lint.mjs` (run with `pnpm lint`) that asserts the invariants
  behind the fixes above: `site` + sitemap in the Astro config, robots.txt has
  `Sitemap:` and `Content-Signal`, `public/llms.txt` exists, the referenced brand
  assets exist, and every full-document page template ships a canonical link and
  og:image (error pages that opt out with `noindex` are exempt).
- Wired husky (`.husky/pre-commit` runs `pnpm lint`) so the same class of issue
  cannot land again without being caught.

## Design notes

- No parallel SEO mechanism was introduced. Canonical, OG, sitemap, and structured
  data all read the shared origin/brand constants from `src/lib/site.js`.
- Localized changelog follows the existing blog convention (a default English page
  plus a `[lang]/` route driven by `localizedLangParams`), not a new i18n system.
- Brand assets were generated from the site's own shield mark to stay on-brand; a
  designer can replace `public/og/*.png` and the icons without any code change.

## Verification (local)

```bash
pnpm install
pnpm build            # 45 pages built, sitemap-index.xml created
pnpm lint             # SEO invariants pass
```

Post-build spot checks (against `dist/`):

- `dist/index.html`, `dist/ja/index.html`, blog list, blog post, changelog: exactly
  one `<link rel="canonical">` each, pointing at the self URL.
- `dist/sitemap-0.xml`: every `<url>` carries the full hreflang alternate set.
- `dist/robots.txt`: `Sitemap:` + `Content-Signal:` present.
- `dist/blog/rss.xml`: valid RSS with absolute item links.
- All `application/ld+json` blocks on home, blog list, blog post, and changelog
  parse as valid JSON with the expected `@type`.
- `dist/favicon.ico`, `dist/apple-touch-icon.png`, `dist/og/*.png` present.

Note: `pnpm check` (astro check) reports type errors that already exist on `main`
(the untyped `localeNames` in `src/lib/i18n.js` is passed to `BlogLocale`-typed
helpers). Those are pre-existing and out of scope here; the project's working
verification command is `pnpm build`, which passes.

## Deferred (not in this PR)

- P1-7 Quick facts / About-the-model cards and P1-8 comparison tables + HowTo:
  these need verifiable model facts (parameter count, license specifics, download
  size) and 11-language copy. Left out to avoid inventing unverifiable claims.
- P2: CSP header, ecosystem entry points.

## Needs human / production follow-up

- Deploy, then re-verify these production URLs return 200 and the expected content:
  `/sitemap-index.xml`, `/sitemap-0.xml`, `/robots.txt` (both GET and HEAD),
  `/llms.txt`, `/blog/rss.xml`, `/favicon.ico`, `/apple-touch-icon.png`,
  `/og/cover.png`, `/og/blog-default.png`.
- Run Google Rich Results Test on `/`, `/blog/`, a blog post, and `/changelog/`.
- Submit `/sitemap-index.xml` in Google Search Console.
- Optionally replace the generated OG images and icons with designed artwork.
