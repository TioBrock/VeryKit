import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { defineRouting } from "next-intl/routing";

export const locales = ["en", "pt-BR", "es"] as const;
export const defaultLocale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
  localeDetection: true,
});

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
