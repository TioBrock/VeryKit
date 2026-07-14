"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { csvToJson, jsonToCsv } from "@/features/csv-json-converter/utils/convert";

export function CsvJsonConverterForm() {
  const t = useTranslations("csv-json-converter");
  const [activeTab, setActiveTab] = useState<"csv-to-json" | "json-to-csv">("csv-to-json");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [error, setError] = useState(false);

  const handleConvert = useCallback(() => {
    try {
      if (activeTab === "csv-to-json") {
        const result = csvToJson(input);
        setOutput(JSON.stringify(result, null, 2));
      } else {
        setOutput(jsonToCsv(input));
      }
      setError(false);
      setCopied(false);
      setCopyError(false);
    } catch {
      setError(true);
      setOutput("");
    }
  }, [activeTab, input]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [output]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
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

      {/* Tab selector */}
      <div className="flex rounded-md border border-border bg-card p-1">
        <button
          type="button"
          onClick={() => { setActiveTab("csv-to-json"); handleClear(); }}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "csv-to-json"
              ? "bg-brand-blue text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("csvToJsonTab")}
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab("json-to-csv"); handleClear(); }}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === "json-to-csv"
              ? "bg-brand-blue text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("jsonToCsvTab")}
        </button>
      </div>

      {/* Work area */}
      <div className="flex flex-col gap-4">
        {/* Input */}
        <div>
          <label htmlFor="csv-json-input" className="mb-2 block text-sm font-medium text-foreground">
            Input
          </label>
          <textarea
            id="csv-json-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("inputPlaceholder")}
            rows={8}
            className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none resize-none"
          />
        </div>

        {/* Convert button */}
        <button
          type="button"
          onClick={handleConvert}
          disabled={!input}
          className="inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          {t("convert")}
        </button>

        {/* Error */}
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {t("errorInvalid")}
          </p>
        )}

        {/* Output */}
        {output && (
          <div>
            <label htmlFor="csv-json-output" className="mb-2 block text-sm font-medium text-foreground">
              {t("outputLabel")}
            </label>
            <textarea
              id="csv-json-output"
              readOnly
              value={output}
              rows={10}
              className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none resize-none"
            />
          </div>
        )}

        {/* Action row */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!output}
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
            disabled={!input && !output}
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
