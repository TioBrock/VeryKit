"use client";

import { useLocale, useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

import { locales, type Locale } from "@/i18n";

export function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const [isPending, startTransition] = useTransition();

  function handleLocaleChange(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    const nextPathname = segments.join("/") || `/${locale}`;

    startTransition(() => {
      router.replace(nextPathname);
    });
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Languages aria-hidden="true" className="h-4 w-4" />
      <span className="sr-only">{t("actions.switchLanguage")}</span>
      <select
        aria-label={t("actions.switchLanguage")}
        className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-blue"
        disabled={isPending}
        value={currentLocale}
        onChange={(event) => handleLocaleChange(event.target.value as Locale)}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {t(`language.${locale}`)}
          </option>
        ))}
      </select>
    </label>
  );
}
