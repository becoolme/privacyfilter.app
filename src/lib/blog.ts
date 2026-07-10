import { getCollection, type CollectionEntry } from "astro:content";

export type BlogLocale =
  | "en"
  | "ja"
  | "zh-CN"
  | "zh-TW"
  | "es"
  | "de"
  | "fr"
  | "ru"
  | "pt-BR"
  | "ar"
  | "ko";

const localePathPrefix: Record<BlogLocale, string> = {
  en: "",
  ja: "/ja",
  "zh-CN": "/zh-hans",
  "zh-TW": "/zh-hant",
  es: "/es",
  de: "/de",
  fr: "/fr",
  ru: "/ru",
  "pt-BR": "/pt-br",
  ar: "/ar",
  ko: "/ko"
};

const localeLangAttr: Record<BlogLocale, string> = {
  en: "en",
  ja: "ja",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  es: "es",
  de: "de",
  fr: "fr",
  ru: "ru",
  "pt-BR": "pt-BR",
  ar: "ar",
  ko: "ko"
};

const localeOg: Record<BlogLocale, string> = {
  en: "en_US",
  ja: "ja_JP",
  "zh-CN": "zh_CN",
  "zh-TW": "zh_TW",
  es: "es_ES",
  de: "de_DE",
  fr: "fr_FR",
  ru: "ru_RU",
  "pt-BR": "pt_BR",
  ar: "ar_AR",
  ko: "ko_KR"
};

const localeBreadcrumbLabel: Record<BlogLocale, string> = {
  en: "Breadcrumb",
  ja: "パンくずリスト",
  "zh-CN": "面包屑导航",
  "zh-TW": "麵包屑導覽",
  es: "Ruta de navegación",
  de: "Brotkrümelnavigation",
  fr: "Fil d'Ariane",
  ru: "Навигационная цепочка",
  "pt-BR": "Trilha de navegação",
  ar: "مسار التنقل",
  ko: "탐색 경로"
};

const localeDateLocale: Record<BlogLocale, string> = {
  en: "en-US",
  ja: "ja-JP",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  es: "es-ES",
  de: "de-DE",
  fr: "fr-FR",
  ru: "ru-RU",
  "pt-BR": "pt-BR",
  ar: "ar-EG",
  ko: "ko-KR"
};

export type BlogPost = CollectionEntry<"blog">;

const idPrefixToLocale: Record<string, BlogLocale> = {
  en: "en",
  ja: "ja",
  "zh-cn": "zh-CN",
  "zh-tw": "zh-TW",
  es: "es",
  de: "de",
  fr: "fr",
  ru: "ru",
  "pt-br": "pt-BR",
  ar: "ar",
  ko: "ko"
};

export function postLocale(post: BlogPost): BlogLocale {
  const head = post.id.split("/")[0].toLowerCase();
  return idPrefixToLocale[head] ?? "en";
}

export function postSlug(post: BlogPost): string {
  const parts = post.id.split("/");
  return parts.slice(1).join("/") || post.id;
}

export function blogIndexPath(locale: BlogLocale): string {
  return `${localePathPrefix[locale]}/blog/`;
}

export function blogPostPath(locale: BlogLocale, slug: string): string {
  return `${localePathPrefix[locale]}/blog/${slug}/`;
}

export function homePath(locale: BlogLocale): string {
  return locale === "en" ? "/" : `${localePathPrefix[locale]}/`;
}

export function htmlLangFor(locale: BlogLocale): string {
  return localeLangAttr[locale];
}

export function ogLocaleFor(locale: BlogLocale): string {
  return localeOg[locale];
}

export function breadcrumbLabelFor(locale: BlogLocale): string {
  return localeBreadcrumbLabel[locale];
}

export function formatPostDate(date: Date, locale: BlogLocale): string {
  const longMonthLocales: BlogLocale[] = [
    "ja",
    "zh-CN",
    "zh-TW",
    "es",
    "de",
    "fr",
    "ru",
    "pt-BR",
    "ar",
    "ko"
  ];
  if (longMonthLocales.includes(locale)) {
    return date.toLocaleDateString(localeDateLocale[locale], {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

export async function getPostsForLocale(locale: BlogLocale): Promise<BlogPost[]> {
  const all = await getCollection("blog", ({ data }) => !data.draft);
  return all
    .filter((post) => postLocale(post) === locale)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getAllAlternates(slug: string): Promise<
  { locale: BlogLocale; href: string; htmlLang: string }[]
> {
  const all = await getCollection("blog", ({ data }) => !data.draft);
  const matches = all.filter((post) => postSlug(post) === slug);
  return matches.map((post) => {
    const loc = postLocale(post);
    return {
      locale: loc,
      href: blogPostPath(loc, slug),
      htmlLang: htmlLangFor(loc)
    };
  });
}

export const allBlogLocales: BlogLocale[] = [
  "en",
  "ja",
  "zh-CN",
  "zh-TW",
  "es",
  "de",
  "fr",
  "ru",
  "pt-BR",
  "ar",
  "ko"
];

const langParamToLocale: Record<string, BlogLocale> = {
  ja: "ja",
  "zh-hans": "zh-CN",
  "zh-hant": "zh-TW",
  es: "es",
  de: "de",
  fr: "fr",
  ru: "ru",
  "pt-br": "pt-BR",
  ar: "ar",
  ko: "ko"
};

export function localeFromLangParam(lang: string): BlogLocale | null {
  return langParamToLocale[lang] ?? null;
}

export const localizedLangParams: { lang: string; locale: BlogLocale }[] = [
  { lang: "ja", locale: "ja" },
  { lang: "zh-hans", locale: "zh-CN" },
  { lang: "zh-hant", locale: "zh-TW" },
  { lang: "es", locale: "es" },
  { lang: "de", locale: "de" },
  { lang: "fr", locale: "fr" },
  { lang: "ru", locale: "ru" },
  { lang: "pt-br", locale: "pt-BR" },
  { lang: "ar", locale: "ar" },
  { lang: "ko", locale: "ko" }
];
