"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { generateRenavam, validateRenavam, formatRenavam } from "@/features/renavam-generator/utils/generate";

export function RenavamGeneratorForm() {
  const t = useTranslations("renavam-generator");
  const [mode, setMode] = useState<"single" | "batch">("single");
  const [renavam, setRenavam] = useState("");
  const [validationResult, setValidationResult] = useState<"valid" | "invalid" | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [batchCount, setBatchCount] = useState(10);
  const [batchResult, setBatchResult] = useState("");
  const [batchCopied, setBatchCopied] = useState(false);
  const [batchCopyError, setBatchCopyError] = useState(false);

  const handleGenerate = useCallback(() => {
    const newRenavam = generateRenavam();
    setRenavam(newRenavam);
    setValidationResult(null);
    setCopied(false);
    setCopyError(false);
  }, []);

  const handleValidate = useCallback(() => {
    const cleaned = renavam.replace(/\D/g, "");
    if (cleaned.length === 11) {
      setValidationResult(validateRenavam(renavam) ? "valid" : "invalid");
    } else {
      setValidationResult("invalid");
    }
  }, [renavam]);

  const handleInputChange = useCallback((value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    setRenavam(formatRenavam(cleaned));
    setValidationResult(null);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!renavam) return;
    try {
      await navigator.clipboard.writeText(renavam);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [renavam]);

  const handleClear = useCallback(() => {
    setRenavam("");
    setValidationResult(null);
    setCopied(false);
    setCopyError(false);
  }, []);

  const handleBatchGenerate = useCallback(() => {
    const count = Math.min(Math.max(batchCount, 1), 10);
    const renavams = Array.from({ length: count }, () => generateRenavam());
    setBatchResult(renavams.join("\n"));
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
      {/* Header */}
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
          {/* Input */}
          <div>
            <label htmlFor="renavam-input" className="mb-2 block text-sm font-medium text-foreground">
              {t("resultLabel")}
            </label>
            <input
              id="renavam-input"
              type="text"
              value={renavam}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={t("inputPlaceholder")}
              maxLength={16}
              className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none"
            />
          </div>

          {/* Validation result */}
          {validationResult && (
            <p
              className={`text-sm font-medium ${validationResult === "valid" ? "text-green-600" : "text-destructive"}`}
              role="alert"
            >
              {validationResult === "valid" ? t("successValid") : t("errorInvalid")}
            </p>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
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
              disabled={!renavam}
              className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-background px-6 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              {t("validate")}
            </button>
          </div>

          {/* Action row */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!renavam}
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
              disabled={!renavam}
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
      )}

      {/* Batch mode */}
      {mode === "batch" && (
        <div className="flex flex-col gap-4">
          {/* Quantity input */}
          <div>
            <label htmlFor="renavam-batch-count" className="mb-2 block text-sm font-medium text-foreground">
              {t("batchCount")}
            </label>
            <input
              id="renavam-batch-count"
              type="number"
              min={1}
              max={10}
              value={batchCount}
              onChange={(e) => setBatchCount(Math.min(Math.max(Number(e.target.value) || 1, 1), 10))}
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
                <label htmlFor="renavam-batch-result" className="mb-2 block text-sm font-medium text-foreground">
                  {t("batchResultLabel")}
                </label>
                <textarea
                  id="renavam-batch-result"
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
