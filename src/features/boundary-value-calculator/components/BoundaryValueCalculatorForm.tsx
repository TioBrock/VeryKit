"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { calculateBoundaries } from "@/features/boundary-value-calculator/utils/boundary";

export function BoundaryValueCalculatorForm() {
  const t = useTranslations("boundary-value-calculator");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [result, setResult] = useState<ReturnType<typeof calculateBoundaries> | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleCalculate = useCallback(() => {
    setError("");
    const minNum = Number(min);
    const maxNum = Number(max);

    if (min === "" || max === "") {
      setError(t("errorEmpty"));
      return;
    }
    if (isNaN(minNum) || isNaN(maxNum)) {
      setError(t("errorInvalid"));
      return;
    }
    if (minNum >= maxNum) {
      setError(t("errorRange"));
      return;
    }

    setResult(calculateBoundaries(minNum, maxNum));
  }, [min, max, t]);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    const text = Object.values(result).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [result]);

  const handleClear = useCallback(() => {
    setMin("");
    setMax("");
    setResult(null);
    setError("");
    setCopied(false);
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="min-input" className="mb-2 block text-sm font-medium text-foreground">
              {t("minLabel")}
            </label>
            <input
              id="min-input"
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
          <div>
            <label htmlFor="max-input" className="mb-2 block text-sm font-medium text-foreground">
              {t("maxLabel")}
            </label>
            <input
              id="max-input"
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCalculate}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-brand-blue px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            {t("calculate")}
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

        {error && (
          <p className="text-sm text-destructive" role="alert">{error}</p>
        )}

        {result && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-foreground">{t("resultLabel")}</h2>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {copied ? t("copied") : t("copy")}
              </button>
            </div>
            <div className="overflow-hidden rounded-md border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium text-foreground">{t("boundaryBelow")}</th>
                    <th className="px-4 py-2 text-right font-mono text-foreground">{result.below}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2 text-left font-medium text-foreground">{t("boundaryMin")}</td>
                    <td className="px-4 py-2 text-right font-mono text-foreground">{result.min}</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="px-4 py-2 text-left font-medium text-foreground">{t("boundaryMinAbove")}</td>
                    <td className="px-4 py-2 text-right font-mono text-foreground">{result.minAbove}</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="px-4 py-2 text-left font-medium text-foreground">{t("boundaryMaxBelow")}</td>
                    <td className="px-4 py-2 text-right font-mono text-foreground">{result.maxBelow}</td>
                  </tr>
                  <tr className="border-b border-border bg-muted/30">
                    <td className="px-4 py-2 text-left font-medium text-foreground">{t("boundaryMax")}</td>
                    <td className="px-4 py-2 text-right font-mono text-foreground">{result.max}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-left font-medium text-foreground">{t("boundaryAbove")}</td>
                    <td className="px-4 py-2 text-right font-mono text-foreground">{result.above}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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
