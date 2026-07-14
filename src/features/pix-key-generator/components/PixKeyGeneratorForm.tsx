"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { generatePixKey, type PixKeyType } from "@/features/pix-key-generator/utils/generate";

export function PixKeyGeneratorForm() {
  const t = useTranslations("pix-key-generator");
  const [keyType, setKeyType] = useState<PixKeyType>("random");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleGenerate = useCallback(() => {
    const newKey = generatePixKey(keyType);
    setResult(newKey);
    setCopied(false);
    setCopyError(false);
  }, [keyType]);

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
    setResult("");
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
        {/* Key type selector */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            {t("keyType")}
          </label>
          <div className="flex rounded-md border border-border bg-card p-1">
            <button
              type="button"
              onClick={() => setKeyType("random")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                keyType === "random"
                  ? "bg-brand-blue text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("randomKey")}
            </button>
            <button
              type="button"
              onClick={() => setKeyType("cpf")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                keyType === "cpf"
                  ? "bg-brand-blue text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("cpfKey")}
            </button>
            <button
              type="button"
              onClick={() => setKeyType("email")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                keyType === "email"
                  ? "bg-brand-blue text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t("emailKey")}
            </button>
          </div>
        </div>

        {/* Generate button */}
        <button
          type="button"
          onClick={handleGenerate}
          className="inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          {t("generate")}
        </button>

        {/* Result */}
        {result && (
          <div>
            <label htmlFor="pix-result" className="mb-2 block text-sm font-medium text-foreground">
              {t("resultLabel")}
            </label>
            <input
              id="pix-result"
              type="text"
              readOnly
              value={result}
              className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none"
            />
          </div>
        )}

        {/* Action row */}
        {result && (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
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
              className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              {t("clear")}
            </button>
          </div>
        )}

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
