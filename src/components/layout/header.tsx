"use client";

import { useState, useEffect, type KeyboardEvent } from "react";
import Link from "next/link";
import { useRouter, useParams, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/navigation/language-switcher";
import { ThemeToggle } from "@/components/navigation/theme-toggle";

type HeaderProps = {
  locale: string;
};

export function Header({ locale }: HeaderProps) {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [mobileQuery, setMobileQuery] = useState("");
  const [desktopQuery, setDesktopQuery] = useState("");

  // Clear search inputs when pathname changes
  useEffect(() => {
    setMobileQuery("");
    setDesktopQuery("");
  }, [pathname]);

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const currentLocale = params.locale as string;
    router.push(`/${currentLocale}/?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      {/* Mobile */}
      <div className="mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:hidden">
        <Link
          href={`/${locale}`}
          className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          aria-label={t("brand.name")}
        >
          <Logo />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
      <div className="px-4 pb-3 sm:px-6 lg:hidden">
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            aria-label={t("navigation.searchLabel")}
            placeholder={t("navigation.searchPlaceholder")}
            value={mobileQuery}
            onChange={(e) => setMobileQuery(e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                handleSearch(mobileQuery);
                setMobileQuery("");
              }
            }}
            className="h-14 w-full rounded-xl border border-border bg-background pl-12 pr-12 text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-brand-blue"
          />
        </div>
      </div>

      {/* Desktop */}
      <div className="relative mx-auto hidden h-16 max-w-7xl px-4 sm:px-6 lg:block lg:px-8">
        <Link
          href={`/${locale}`}
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand-blue sm:left-6 lg:left-8"
          aria-label={t("brand.name")}
        >
          <Logo />
        </Link>

        <div className="absolute left-1/2 top-1/2 h-11 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2">
          <div className="relative h-full">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              aria-label={t("navigation.searchLabel")}
              placeholder={t("navigation.searchPlaceholder")}
              value={desktopQuery}
              onChange={(e) => setDesktopQuery(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  handleSearch(desktopQuery);
                  setDesktopQuery("");
                }
              }}
              className="h-full w-full rounded-xl border border-border bg-background pl-12 pr-12 text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-brand-blue"
            />
          </div>
        </div>

        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2 sm:right-6 lg:right-8">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
