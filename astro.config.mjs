import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { SITE_ORIGIN } from "./src/lib/site.js";

export default defineConfig({
  site: SITE_ORIGIN,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          "zh-hans": "zh-CN",
          "zh-hant": "zh-TW",
          ja: "ja",
          es: "es",
          de: "de",
          fr: "fr",
          ru: "ru",
          "pt-br": "pt-BR",
          ar: "ar",
          ko: "ko"
        }
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp"
      }
    }
  }
});
