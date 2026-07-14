"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ChevronRight, Home } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  const locale = useLocale();
  const t = useTranslations("navigation");

  const allItems: BreadcrumbItem[] = [
    { label: t("home"), href: `/${locale}` },
    ...items,
  ];

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isFirst = index === 0;

          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              )}
              {isFirst && (
                <Home className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              )}
              {isLast || !item.href ? (
                <span className="font-medium text-foreground" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
