"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { convertBytes } from "@/features/byte-converter/utils/convert";

const UNITS = ["Bytes", "Bits", "KB", "MB", "GB", "TB"];

export function ByteConverterForm() {
  const t = useTranslations("byte-converter");
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Bytes");
  const [results, setResults] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleConvert = useCallback(() => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) {
      setResults({});
      return;
    }
    const converted = convertBytes(num, fromUnit);
    setResults(converted);
    setCopied(false);
    setCopyError(false);
  }, [inputValue, fromUnit]);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0) {
      const converted = convertBytes(num, fromUnit);
      setResults(converted);
      setCopied(false);
      setCopyError(false);
    } else {
      setResults({});
    }
  }, [fromUnit]);

  const handleUnitChange = useCallback((unit: string) => {
    setFromUnit(unit);
    const num = parseFloat(inputValue);
    if (!isNaN(num) && num >= 0) {
      const converted = convertBytes(num, unit);
      setResults(converted);
      setCopied(false);
      setCopyError(false);
    }
  }, [inputValue]);

  const handleCopy = useCallback(async () => {
    const text = Object.entries(results)
      .map(([unit, value]) => `${value} ${unit}`)
      .join("\n");
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [results]);

  const handleClear = useCallback(() => {
    setInputValue("");
    setFromUnit("Bytes");
    setResults({});
    setCopied(false);
    setCopyError(false);
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
          <label htmlFor="byte-input" className="mb-2 block text-sm font-medium text-foreground">
            {t("inputLabel")}
          </label>
          <div className="flex gap-2">
            <input
              id="byte-input"
              type="number"
              min={0}
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="0"
              className="h-12 flex-1 rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none"
            />
            <select
              value={fromUnit}
              onChange={(e) => handleUnitChange(e.target.value)}
              className="h-12 rounded-md border border-input bg-muted/50 px-4 text-sm text-foreground outline-none"
            >
              {UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {Object.keys(results).length > 0 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              {t("resultLabel")}
            </label>
            <div className="rounded-md border border-input bg-muted/50 p-4">
              {Object.entries(results).map(([unit, value]) => (
                <div key={unit} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{t(unit === "Bytes" ? "bytes" : unit === "bits" ? "bits" : unit === "KB" ? "kilobytes" : unit === "MB" ? "megabytes" : unit === "GB" ? "gigabytes" : "terabytes")}</span>
                  <span className="font-mono text-sm text-foreground">{value} {unit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action row */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={Object.keys(results).length === 0}
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
            disabled={!inputValue}
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
