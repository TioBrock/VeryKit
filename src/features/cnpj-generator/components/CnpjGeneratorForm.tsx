"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { generateCnpj, validateCnpj, formatCnpj } from "@/features/cnpj-generator/utils/generate";

export function CnpjGeneratorForm() {
  const t = useTranslations("cnpj-generator");
  const [mode, setMode] = useState<"single" | "batch">("single");
  const [cnpj, setCnpj] = useState("");
  const [validity, setValidity] = useState<"valid" | "invalid" | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [batchCount, setBatchCount] = useState(10);
  const [batchResult, setBatchResult] = useState("");
  const [batchCopied, setBatchCopied] = useState(false);
  const [batchCopyError, setBatchCopyError] = useState(false);

  const handleGenerate = useCallback(() => {
    setCnpj(generateCnpj());
    setValidity(null);
    setCopied(false);
    setCopyError(false);
  }, []);

  const handleValidate = useCallback(() => {
    if (!cnpj.trim()) {
      setValidity(null);
      return;
    }
    setValidity(validateCnpj(cnpj) ? "valid" : "invalid");
  }, [cnpj]);

  const handleInputChange = useCallback((value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length <= 14) {
      setCnpj(formatCnpj(cleaned));
      setValidity(null);
    }
  }, []);

  const handleCopy = useCallback(async () => {
    if (!cnpj) return;
    try {
      await navigator.clipboard.writeText(cnpj);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [cnpj]);

  const handleClear = useCallback(() => {
    setCnpj("");
    setValidity(null);
    setCopied(false);
    setCopyError(false);
  }, []);

  const handleBatchGenerate = useCallback(() => {
    const count = Math.min(Math.max(batchCount, 1), 100);
    const cnpjs = Array.from({ length: count }, () => generateCnpj());
    setBatchResult(cnpjs.join("\n"));
    setBatchCopied(false);
    setBatchCopyError(false);
  }, [batchCount]);

  const handleBatchCopy = useCallback(async () => {
    if (!batchResult) return;
    try {
      await navigator.clipboard.writeText(batchResult);
      setBatchCopied(true);
      setBatchCopyError(false);
    } catch {
      setBatchCopied(false);
      setBatchCopyError(true);
    }
  }, [batchResult]);

  const handleBatchClear = useCallback(() => {
    setBatchResult("");
    setBatchCopied(false);
    setBatchCopyError(false);
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

      {/* Mode toggle */}
      <div className="flex rounded-md border border-border bg-card p-1">
        <button
          type="button"
          onClick={() => setMode("single")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            mode === "single"
              ? "bg-brand-blue text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("singleMode")}
        </button>
        <button
          type="button"
          onClick={() => setMode("batch")}
          className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            mode === "batch"
              ? "bg-brand-blue text-white"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {t("batchMode")}
        </button>
      </div>

      {/* Single mode */}
      {mode === "single" && (
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleGenerate}
              className="inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              {t("generate")}
            </button>
            <button
              type="button"
              onClick={handleValidate}
              className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              {t("validate")}
            </button>
          </div>

          <div>
            <label htmlFor="cnpj-input" className="mb-2 block text-sm font-medium text-foreground">
              {t("inputLabel")}
            </label>
            <input
              id="cnpj-input"
              type="text"
              value={cnpj}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={t("placeholder")}
              className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          {validity && (
            <p
              className={`text-sm font-medium ${
                validity === "valid" ? "text-green-600 dark:text-green-400" : "text-destructive"
              }`}
            >
              {validity === "valid" ? t("valid") : t("invalid")}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!cnpj}
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
              disabled={!cnpj}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              {t("clear")}
            </button>
          </div>

          {copyError && (
            <p className="text-sm text-destructive" role="alert">{t("errorCopy")}</p>
          )}
        </div>
      )}

      {/* Batch mode */}
      {mode === "batch" && (
        <div className="flex flex-col gap-4">
          {/* Quantity input */}
          <div>
            <label htmlFor="cnpj-batch-count" className="mb-2 block text-sm font-medium text-foreground">
              {t("batchCount")}
            </label>
            <input
              id="cnpj-batch-count"
              type="number"
              min={1}
              max={100}
              value={batchCount}
              onChange={(e) => setBatchCount(Math.min(Math.max(Number(e.target.value) || 1, 1), 100))}
              className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none"
            />
          </div>

          {/* Generate button */}
          <button
            type="button"
            onClick={handleBatchGenerate}
            className="inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            {t("generateBatch")}
          </button>

          {/* Batch result */}
          {batchResult && (
            <>
              <div>
                <label htmlFor="cnpj-batch-result" className="mb-2 block text-sm font-medium text-foreground">
                  {t("batchResultLabel")}
                </label>
                <textarea
                  id="cnpj-batch-result"
                  readOnly
                  value={batchResult}
                  className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none"
                  rows={6}
                  style={{ maxHeight: "16rem", overflowY: "auto" }}
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleBatchCopy}
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  {batchCopied ? (
                    <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  {batchCopied ? t("successCopy") : t("copy")}
                </button>
                <button
                  type="button"
                  onClick={handleBatchClear}
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  {t("clear")}
                </button>
              </div>

              {batchCopyError && (
                <p className="text-sm text-destructive" role="alert">
                  {t("errorCopy")}
                </p>
              )}
            </>
          )}
        </div>
      )}

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
