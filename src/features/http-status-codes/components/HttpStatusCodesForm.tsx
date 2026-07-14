"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { httpStatusCodes } from "@/features/http-status-codes/utils/codes";

type Category = "1xx" | "2xx" | "3xx" | "4xx" | "5xx";

const CATEGORY_COLORS: Record<Category, string> = {
  "1xx": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  "2xx": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  "3xx": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  "4xx": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  "5xx": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
};

const CATEGORY_LABELS: Record<Category, string> = {
  "1xx": "information",
  "2xx": "success",
  "3xx": "redirection",
  "4xx": "clientError",
  "5xx": "serverError",
};

export function HttpStatusCodesForm() {
  const t = useTranslations("http-status-codes");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return httpStatusCodes;
    const q = search.trim();
    return httpStatusCodes.filter(
      (c) => c.code.toString() === q || c.code.toString().startsWith(q)
    );
  }, [search]);

  const faqItems = t.raw("faq.items") as Array<{ question: string; answer: string }>;
  const exampleItems = t.raw("examples.items") as string[];
  const whenToUseItems = t.raw("whenToUse.items") as string[];

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="status-search" className="mb-2 block text-sm font-medium text-foreground">
            {t("searchPlaceholder")}
          </label>
          <input
            id="status-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        <div className="text-sm text-muted-foreground">
          {t("allCodes")} ({filtered.length})
        </div>

        <div className="overflow-hidden rounded-md border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-2 text-left font-medium text-foreground">{t("code")}</th>
                <th className="px-4 py-2 text-left font-medium text-foreground">{t("colTitle")}</th>
                <th className="px-4 py-2 text-left font-medium text-foreground hidden sm:table-cell">{t("colDescription")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.code} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${CATEGORY_COLORS[item.category as Category]}`}>
                      {item.code}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{t.has(`codes.${item.code}.title`) ? t(`codes.${item.code}.title`) : item.title}</div>
                    <div className="text-xs text-muted-foreground sm:hidden">{t.has(`codes.${item.code}.description`) ? t(`codes.${item.code}.description`) : item.description}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{t.has(`codes.${item.code}.description`) ? t(`codes.${item.code}.description`) : item.description}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    {t("noResults", { search })}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">{t("examples.title")}</h2>
        </div>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          {exampleItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">{t("whenToUse.title")}</h2>
        </div>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          {whenToUseItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">{t("faq.title")}</h2>
        </div>
        <dl className="space-y-6">
          {faqItems.map((item) => (
            <div key={item.question}>
              <dt className="text-sm font-medium text-foreground">{item.question}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
