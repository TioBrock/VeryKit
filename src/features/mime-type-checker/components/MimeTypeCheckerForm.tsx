"use client";

import { useState, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { getMimeType, searchMimeTypes } from "@/features/mime-type-checker/utils/mime";

export function MimeTypeCheckerForm() {
  const t = useTranslations("mime-type-checker");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLookup = useCallback(() => {
    if (!input.trim()) {
      setResult(null);
      return;
    }
    const mime = getMimeType(input);
    setResult(mime);
    setCopied(false);
    setCopyError(false);
  }, [input]);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [result]);

  const handleClear = useCallback(() => {
    setInput("");
    setResult(null);
    setCopied(false);
    setCopyError(false);
  }, []);

  const filteredTypes = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchMimeTypes(searchQuery);
  }, [searchQuery]);

  const faqItems = t.raw("faq.items") as Array<{ question: string; answer: string }>;
  const exampleItems = t.raw("examples.items") as string[];
  const whenToUseItems = t.raw("whenToUse.items") as string[];

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {t("description")}
        </p>
      </div>

      {/* Work area */}
      <div className="flex flex-col gap-4">
        {/* Input */}
        <div>
          <label htmlFor="mime-input" className="mb-2 block text-sm font-medium text-foreground">
            {t("inputLabel")}
          </label>
          <div className="flex gap-3">
            <input
              id="mime-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onInput={handleLookup}
              placeholder={t("inputPlaceholder")}
              className="h-12 flex-1 rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <button
              type="button"
              onClick={handleLookup}
              disabled={!input}
              className="inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              {t("resultLabel")}
            </button>
          </div>
        </div>

        {/* Result */}
        {result !== null && (
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("extensionLabel")}</p>
            <p className="mt-1 font-mono text-lg font-medium text-foreground">{input}</p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("mimeTypeLabel")}</p>
            <p className="mt-1 font-mono text-lg font-medium text-brand-blue">{result}</p>
          </div>
        )}

        {result === null && input && (
          <p className="text-sm text-muted-foreground">{t("noResult")}</p>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!result}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? t("copied") : t("copy")}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={!input}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            {t("clear")}
          </button>
        </div>

        {/* Copy error */}
        {copyError && (
          <p className="text-sm text-destructive" role="alert">{t("errorCopy")}</p>
        )}

        {/* Search common types */}
        <div>
          <label htmlFor="mime-search" className="mb-2 block text-sm font-medium text-foreground">
            {t("commonTypes")}
          </label>
          <input
            id="mime-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="h-10 w-full rounded-md border border-input bg-muted/50 px-4 text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
          />
          {filteredTypes.length > 0 && (
            <div className="mt-2 max-h-60 overflow-y-auto rounded-md border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-4 py-2 text-left font-medium text-foreground">{t("extensionLabel")}</th>
                    <th className="px-4 py-2 text-left font-medium text-foreground">{t("mimeTypeLabel")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTypes.map(({ extension, mimeType }) => (
                    <tr key={extension} className="border-b border-border last:border-0 hover:bg-muted/20">
                      <td className="px-4 py-2 font-mono text-foreground">{extension}</td>
                      <td className="px-4 py-2 font-mono text-muted-foreground">{mimeType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Examples */}
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

      {/* When to use */}
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

      {/* FAQ */}
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
