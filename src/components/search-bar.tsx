"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { toolsCatalog } from "@/lib/tools-catalog";
import { ToolCard } from "@/components/tool-card";

export function SearchBar() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");

  // Update local query state when URL parameter changes externally
  const qParam = searchParams.get("q") ?? "";
  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  const handleQueryChange = (val: string) => {
    setQuery(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set("q", val);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return toolsCatalog.filter((tool) => {
      const translatedName = t(tool.nameKey).toLowerCase();
      const translatedNameNormalized = translatedName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const englishName = tool.name.toLowerCase();
      const id = tool.id.toLowerCase().replace(/-/g, " ");
      const description = t(tool.descriptionKey).toLowerCase();
      const keywords = tool.keywords.join(" ").toLowerCase();

      return (
        translatedName.includes(q) ||
        translatedNameNormalized.includes(q) ||
        englishName.includes(q) ||
        id.includes(q) ||
        description.includes(q) ||
        keywords.includes(q)
      );
    });
  }, [query, t]);

  return (
    <div className="w-full">
      <div className="relative">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          aria-label={t("home.searchPlaceholder")}
          placeholder={t("home.searchPlaceholder")}
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          autoComplete="off"
          className="h-14 w-full rounded-xl border border-border bg-background pl-12 pr-12 text-base text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-brand-blue"
        />
        {query && (
          <button
            type="button"
            onClick={() => handleQueryChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {query.trim() && (
        <div className="mt-4">
          {results.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {t("home.noResults", { query })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

