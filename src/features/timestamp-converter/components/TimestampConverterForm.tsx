"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import {
  timestampToDate,
  dateToTimestamp,
  getCurrentTimestamp,
  autoDetectUnit,
  type TimestampUnit,
  type TimezoneMode,
} from "@/features/timestamp-converter/utils/convert";

export function TimestampConverterForm() {
  const t = useTranslations("timestamp-converter");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [error, setError] = useState(false);

  const [unit, setUnit] = useState<TimestampUnit>("seconds");
  const [mode, setMode] = useState<TimezoneMode>("utc");

  const handleGetCurrentTimestamp = useCallback(() => {
    const ts = getCurrentTimestamp(unit);
    setInput(String(ts));
    setCopied(false);
    setCopyError(false);

    try {
      const dateStr = timestampToDate(ts, unit, mode);
      setResult(dateStr);
      setError(false);
    } catch {
      setError(true);
    }
  }, [unit, mode]);

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setError(true);
      return;
    }

    const trimmed = input.trim();

    // Check if it's a numeric timestamp
    if (/^\d+$/.test(trimmed)) {
      const detectedUnit = autoDetectUnit(trimmed);
      const numValue = Number(trimmed);
      try {
        const dateStr = timestampToDate(numValue, detectedUnit, mode);
        setResult(dateStr);
        setError(false);
        setCopied(false);
        setCopyError(false);
      } catch {
        setError(true);
        setResult("");
      }
    } else {
      // Try to parse as a date string
      try {
        const ts = dateToTimestamp(trimmed, unit);
        setResult(String(ts));
        setError(false);
        setCopied(false);
        setCopyError(false);
      } catch {
        setError(true);
        setResult("");
      }
    }
  }, [input, unit, mode]);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [result]);

  const handleClear = useCallback(() => {
    setInput("");
    setResult("");
    setCopied(false);
    setCopyError(false);
    setError(false);
  }, []);

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
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="ts-input" className="text-sm font-medium text-foreground">
              {t("inputLabel")}
            </label>
          </div>
          <input
            id="ts-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("inputPlaceholder")}
            className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none"
          />
        </div>

        {/* Options */}
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">{t("timestampUnit")}</span>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="radio"
                name="ts-unit"
                checked={unit === "seconds"}
                onChange={() => setUnit("seconds")}
                className="h-4 w-4 accent-brand-blue"
              />
              {t("seconds")}
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="radio"
                name="ts-unit"
                checked={unit === "milliseconds"}
                onChange={() => setUnit("milliseconds")}
                className="h-4 w-4 accent-brand-blue"
              />
              {t("milliseconds")}
            </label>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground">{t("timezone")}</span>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="radio"
                name="ts-mode"
                checked={mode === "utc"}
                onChange={() => setMode("utc")}
                className="h-4 w-4 accent-brand-blue"
              />
              {t("utc")}
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="radio"
                name="ts-mode"
                checked={mode === "local"}
                onChange={() => setMode("local")}
                className="h-4 w-4 accent-brand-blue"
              />
              {t("local")}
            </label>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleConvert}
            disabled={!input}
            className="inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            {t("convert")}
          </button>
          <button
            type="button"
            onClick={handleGetCurrentTimestamp}
            className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            {t("currentTimestamp")}
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {t("errorInvalid")}
          </p>
        )}

        {/* Result */}
        {result && (
          <div>
            <label htmlFor="ts-result" className="mb-2 block text-sm font-medium text-foreground">
              {t("resultLabel")}
            </label>
            <input
              id="ts-result"
              type="text"
              readOnly
              value={result}
              placeholder={t("resultPlaceholder")}
              className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none"
            />
          </div>
        )}

        {/* Action row */}
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
            {copied ? t("successCopy") : t("copy")}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={!input && !result}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            {t("clear")}
          </button>
        </div>

        {/* Copy error */}
        {copyError && (
          <p className="text-sm text-destructive" role="alert">
            {t("errorCopy")}
          </p>
        )}
      </div>

      {/* Examples */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">{t("examples.title")}</h2>
        </div>
        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">Input (Timestamp)</p>
            <pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs text-foreground">{`1700000000`}</pre>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">Output (UTC)</p>
            <pre className="overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs text-foreground">{`2023-11-14T22:13:20.000Z`}</pre>
          </div>
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
