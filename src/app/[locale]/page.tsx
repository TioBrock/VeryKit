"use client";

import { Suspense, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Database,
  Globe,
  FlaskConical,
  Wrench,
  MapPin,
  MoreHorizontal,
} from "lucide-react";

import { SearchBar } from "@/components/search-bar";
import { Logo } from "@/components/logo";
import { toolsCatalog } from "@/lib/tools-catalog";
import { ToolCard } from "@/components/tool-card";
import type { ToolCategory } from "@/lib/tools-catalog";

const CATEGORY_ORDER: ToolCategory[] = ["Data", "API", "Testing", "Utilities", "Regional", "Others"];

const CATEGORY_ICONS: Record<ToolCategory, typeof Database> = {
  Data: Database,
  API: Globe,
  Testing: FlaskConical,
  Utilities: Wrench,
  Regional: MapPin,
  Others: MoreHorizontal,
};

const VALID_CATEGORIES = new Set(CATEGORY_ORDER);

function readCategories(searchParams: URLSearchParams): ToolCategory[] {
  const params = searchParams.getAll("category");
  if (params.length === 0) return [];
  return params.filter((p): p is ToolCategory => VALID_CATEGORIES.has(p as ToolCategory));
}

function HomePageContent() {
  const t = useTranslations("home");
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategories = useMemo(() => readCategories(searchParams), [searchParams]);

  const toggleCategory = useCallback((cat: ToolCategory) => {
    const next = new URLSearchParams(searchParams.toString());
    const existing = next.getAll("category");

    let updated: string[];
    if (existing.includes(cat)) {
      updated = existing.filter((c) => c !== cat);
    } else {
      updated = [...existing, cat];
    }

    // Clear then re-set to keep order clean
    next.delete("category");
    for (const c of updated) next.append("category", c);

    const qs = next.toString();
    router.push(`?${qs}`, { scroll: false });
  }, [searchParams, router]);

  const filteredTools = useMemo(
    () =>
      selectedCategories.length > 0
        ? toolsCatalog.filter((tool) => selectedCategories.includes(tool.category))
        : toolsCatalog,
    [selectedCategories],
  );

  const groupedTools = useMemo(() => {
    const groups: Partial<Record<ToolCategory, typeof toolsCatalog>> = {};
    for (const tool of filteredTools) {
      if (!groups[tool.category]) groups[tool.category] = [];
      groups[tool.category]!.push(tool);
    }
    return CATEGORY_ORDER
      .filter((cat) => groups[cat]?.length)
      .map((cat) => ({ category: cat, tools: groups[cat]! }));
  }, [filteredTools]);

  const descriptionSuffix = useMemo(() => {
    if (selectedCategories.length === 0) return null;
    return selectedCategories.map((c) => t(`categories.${c.toLowerCase()}`)).join(", ");
  }, [selectedCategories, t]);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center px-4 pt-8 pb-2 text-center sm:px-6 lg:px-8">
        <div className="-mt-14 -mb-10">
          <Logo size="lg" />
        </div>
        <p className="max-w-xl text-lg text-muted-foreground">
          {t("subtitle")}
        </p>
        <div className="mt-4 w-full max-w-2xl">
          <SearchBar />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto w-full max-w-5xl px-4 pt-6 pb-12 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-semibold text-foreground">
          {t("categories.title")}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_ORDER.map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            const isActive = selectedCategories.includes(cat);
            const descKey = `categories.${cat.toLowerCase()}Description` as const;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`flex items-start gap-4 rounded-lg border p-5 text-left transition-colors ${
                  isActive
                    ? "border-brand-blue bg-brand-blue/5 ring-1 ring-brand-blue/20"
                    : "border-border bg-card hover:border-brand-blue/30 hover:bg-accent/50"
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-colors ${
                  isActive
                    ? "bg-brand-blue text-white"
                    : "bg-muted text-muted-foreground"
                }`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {t(`categories.${cat.toLowerCase()}`)}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t(descKey)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-2 text-2xl font-semibold text-foreground">
          {t("tools.title")}
        </h2>
        <p className="mb-8 text-sm text-muted-foreground">
          {descriptionSuffix
            ? `${t("tools.description")} - ${descriptionSuffix}`
            : t("tools.description")}
        </p>

        {groupedTools.length > 0 ? (
          <div className="flex flex-col gap-10">
            {groupedTools.map(({ category, tools }) => (
              <div key={category}>
                <h3 className="mb-4 text-lg font-semibold text-foreground">
                  {t(`categories.${category.toLowerCase()}`)}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {tools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No tools in this category yet.
          </p>
        )}
      </section>
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense>
      <HomePageContent />
    </Suspense>
  );
}
