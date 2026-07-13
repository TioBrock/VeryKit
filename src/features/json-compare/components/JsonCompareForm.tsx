"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { compareJson, isValidJson, type DiffEntry } from "@/features/json-compare/utils/compare";

export function JsonCompareForm() {
  const t = useTranslations("json-compare");
  const [jsonA, setJsonA] = useState("");
  const [jsonB, setJsonB] = useState("");
  const [diffs, setDiffs] = useState<DiffEntry[] | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleCompare = useCallback(() => {
    setError("");
    setCopied(false);
    setCopyError(false);

    if (!jsonA.trim() || !jsonB.trim()) {
      setError(t("errorEmpty"));
      setDiffs(null);
      return;
    }

    if (!isValidJson(jsonA)) {
      setError(t("errorInvalidA"));
      setDiffs(null);
      return;
    }

    if (!isValidJson(jsonB)) {
      setError(t("errorInvalidB"));
      setDiffs(null);
      return;
    }

    try {
      const result = compareJson(jsonA, jsonB);
      setDiffs(result);
    } catch {
      setError(t("errorCompare"));
      setDiffs(null);
    }
  }, [jsonA, jsonB, t]);

  const handleCopy = useCallback(async () => {
    if (!diffs) return;
    const text = diffs
      .map((d) => {
        if (d.type === "added") return `+ ${d.path}: ${JSON.stringify(d.newValue)}`;
        if (d.type === "removed") return `- ${d.path}: ${JSON.stringify(d.oldValue)}`;
        return `~ ${d.path}: ${JSON.stringify(d.oldValue)} → ${JSON.stringify(d.newValue)}`;
      })
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [diffs]);

  const handleClear = useCallback(() => {
    setJsonA("");
    setJsonB("");
    setDiffs(null);
    setError("");
    setCopied(false);
    setCopyError(false);
  }, []);

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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="json-a" className="text-sm font-medium text-foreground">
              {t("labelA")}
            </label>
            <textarea
              id="json-a"
              value={jsonA}
              onChange={(e) => setJsonA(e.target.value)}
              placeholder={t("placeholderA")}
              rows={8}
              className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="json-b" className="text-sm font-medium text-foreground">
              {t("labelB")}
            </label>
            <textarea
              id="json-b"
              value={jsonB}
              onChange={(e) => setJsonB(e.target.value)}
              placeholder={t("placeholderB")}
              rows={8}
              className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCompare}
            className="inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            {t("compare")}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={!jsonA && !jsonB}
            className="inline-flex h-12 items-center gap-2 rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            {t("clear")}
          </button>
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">{error}</p>
        )}

        {/* Color Legend */}
        {diffs && diffs.length > 0 && (
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm bg-green-200 dark:bg-green-800"></span>
              {t('legendAdded')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm bg-red-200 dark:bg-red-800"></span>
              {t('legendRemoved')}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm bg-yellow-200 dark:bg-yellow-800"></span>
              {t('legendChanged')}
            </span>
          </div>
        )}

        {diffs && diffs.length > 0 && (
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">{t("resultsTitle")}</h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  {copied ? (
                    <Check className="h-3 w-3 text-green-600" aria-hidden="true" />
                  ) : (
                    <Copy className="h-3 w-3" aria-hidden="true" />
                  )}
                  {copied ? t("copied") : t("copy")}
                </button>
              </div>
            </div>
            <ul className="space-y-1 font-mono text-sm">
              {diffs.map((diff) => (
                <li
                  key={diff.path}
                  className={`rounded px-3 py-1 ${
                    diff.type === "added"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : diff.type === "removed"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                  }`}
                >
                  <span className="font-semibold">{diff.path}</span>
                  {diff.type === "added" && (
                    <span className="ml-2">+ {JSON.stringify(diff.newValue)}</span>
                  )}
                  {diff.type === "removed" && (
                    <span className="ml-2">- {JSON.stringify(diff.oldValue)}</span>
                  )}
                  {diff.type === "changed" && (
                    <span className="ml-2">
                      {JSON.stringify(diff.oldValue)} → {JSON.stringify(diff.newValue)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {diffs && diffs.length === 0 && (
          <p className="text-sm text-muted-foreground">{t("noDiffs")}</p>
        )}

        {copyError && (
          <p className="text-sm text-destructive" role="alert">{t("errorCopy")}</p>
        )}
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
