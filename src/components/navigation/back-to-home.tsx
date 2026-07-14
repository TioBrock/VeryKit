"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";

export function BackToHome() {
  const locale = useLocale();
  const t = useTranslations("navigation");

  return (
    <Link
      href={`/${locale}`}
      className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      {t("backToHome")}
    </Link>
  );
}
