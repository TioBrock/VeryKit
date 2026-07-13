"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { convertCase, type CaseType } from "@/features/case-converter/utils/convert";

const CASE_OPTIONS: CaseType[] = [
  "uppercase",
  "lowercase",
  "titleCase",
  "sentenceCase",
  "camelCase",
  "pascalCase",
  "snakeCase",
  "kebabCase",
  "dotCase",
  "constantCase",
];

const CASE_EXAMPLES: Record<CaseType, string> = {
  uppercase: "HELLO WORLD",
  lowercase: "hello world",
  titleCase: "Hello World",
  sentenceCase: "Hello world",
  camelCase: "helloWorld",
  pascalCase: "HelloWorld",
  snakeCase: "hello_world",
  kebabCase: "hello-world",
  dotCase: "hello.world",
  constantCase: "HELLO_WORLD",
};

export function CaseConverterForm() {
  const t = useTranslations("case-converter");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [error, setError] = useState(false);
  const [activeCase, setActiveCase] = useState<CaseType>("camelCase");

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setError(true);
      setResult("");
      return;
    }
    setResult(convertCase(input, activeCase));
    setError(false);
    setCopied(false);
    setCopyError(false);
  }, [input, activeCase]);

  const handleCaseClick = useCallback(
    (caseType: CaseType) => {
      setActiveCase(caseType);
      if (input.trim()) {
        setResult(convertCase(input, caseType));
        setError(false);
        setCopied(false);
        setCopyError(false);
      }
    },
    [input],
  );

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
            <label htmlFor="case-input" className="text-sm font-medium text-foreground">
              {t("inputLabel")}
            </label>
          </div>
          <textarea
            id="case-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("inputPlaceholder")}
            rows={4}
            className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none resize-none"
          />
        </div>

        {/* Case options */}
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="mb-3 text-sm font-medium text-foreground">{t("optionsLabel")}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {CASE_OPTIONS.map((caseType) => (
              <button
                key={caseType}
                type="button"
                onClick={() => handleCaseClick(caseType)}
                className={`flex flex-col items-start rounded-md px-3 py-2 text-left transition-colors ${
                  activeCase === caseType
                    ? "bg-brand-blue text-white"
                    : "border border-border bg-background text-foreground hover:bg-accent"
                }`}
              >
                <span className="text-xs font-medium">{t(caseType)}</span>
                <span className={`mt-0.5 font-mono text-[10px] ${
                  activeCase === caseType ? "text-white/70" : "text-muted-foreground"
                }`}>
                  {CASE_EXAMPLES[caseType]}
                </span>
              </button>
            ))}
          </div>
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
            {t("errorEmpty")}
          </p>
        )}

        {/* Result */}
        {result && (
          <div>
            <label htmlFor="case-result" className="mb-2 block text-sm font-medium text-foreground">
              {t("resultLabel")}
            </label>
            <textarea
              id="case-result"
              readOnly
              value={result}
              placeholder={t("resultPlaceholder")}
              rows={4}
              className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none resize-none"
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
