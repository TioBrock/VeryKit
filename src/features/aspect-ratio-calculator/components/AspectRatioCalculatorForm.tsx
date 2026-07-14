"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { calculateAspectRatio, COMMON_RATIOS } from "@/features/aspect-ratio-calculator/utils/calculate";

export function AspectRatioCalculatorForm() {
  const t = useTranslations("aspect-ratio-calculator");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [ratioW, setRatioW] = useState("");
  const [ratioH, setRatioH] = useState("");
  const [result, setResult] = useState<{ width: number; height: number; ratio: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleCalculate = useCallback(() => {
    const w = width ? Number(width) : undefined;
    const h = height ? Number(height) : undefined;
    const rw = ratioW ? Number(ratioW) : undefined;
    const rh = ratioH ? Number(ratioH) : undefined;
    const res = calculateAspectRatio(w, h, rw, rh);
    setResult(res);
    setCopied(false);
  }, [width, height, ratioW, ratioH]);

  const handlePreset = useCallback((r: string) => {
    const [rw, rh] = r.split(":");
    setRatioW(rw);
    setRatioH(rh);
    setWidth("");
    setHeight("");
    setResult(null);
    setCopied(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    const text = `${result.width}x${result.height} (${result.ratio})`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [result]);

  const handleClear = useCallback(() => {
    setWidth("");
    setHeight("");
    setRatioW("");
    setRatioH("");
    setResult(null);
    setCopied(false);
    setCopyError(false);
  }, []);

  const faqItems = t.raw("faq.items") as Array<{ question: string; answer: string }>;
  const exampleItems = t.raw("examples.items") as string[];
  const whenToUseItems = t.raw("whenToUse.items") as string[];

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("description")}</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Row 1: Ratio inputs */}
        <div>
          <label htmlFor="ar-ratio-w" className="mb-2 block text-sm font-medium text-foreground">{t("ratioBaseLabel")}</label>
          <div className="flex items-center gap-2">
            <input
              id="ar-ratio-w"
              type="number"
              min="1"
              value={ratioW}
              onChange={(e) => setRatioW(e.target.value)}
              placeholder="16"
              className="h-12 w-24 rounded-md border border-input bg-muted/50 px-4 text-sm text-foreground outline-none"
            />
            <span className="text-lg font-bold text-foreground">:</span>
            <input
              id="ar-ratio-h"
              type="number"
              min="1"
              value={ratioH}
              onChange={(e) => setRatioH(e.target.value)}
              placeholder="9"
              className="h-12 w-24 rounded-md border border-input bg-muted/50 px-4 text-sm text-foreground outline-none"
            />
          </div>
        </div>

        {/* Row 2: Width and Height */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="ar-width" className="mb-2 block text-sm font-medium text-foreground">{t("widthLabel")}</label>
            <input
              id="ar-width"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="1920"
              className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 text-sm text-foreground outline-none"
            />
          </div>
          <div>
            <label htmlFor="ar-height" className="mb-2 block text-sm font-medium text-foreground">{t("heightLabel")}</label>
            <input
              id="ar-height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="1080"
              className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 text-sm text-foreground outline-none"
            />
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-foreground">{t("commonRatios")}</p>
          <div className="flex flex-wrap gap-2">
            {COMMON_RATIOS.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handlePreset(r)}
                className="inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-sm font-mono text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCalculate}
            disabled={(!width && !height) || (!ratioW || !ratioH)}
            className="inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            {t("calculate")}
          </button>
        </div>

        {result && (
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">{t("resultLabel")}</p>
            <p className="font-mono text-lg font-bold text-foreground">
              {result.width} x {result.height}
            </p>
            <p className="text-sm text-muted-foreground">
              Ratio: <span className="font-mono font-bold text-foreground">{result.ratio}</span>
            </p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!result}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            {copied ? <Check className="h-4 w-4 text-green-600" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? t("successCopy") : t("copy")}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={!width && !height && !ratioW && !ratioH && !result}
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

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">{t("examples.title")}</h2>
        </div>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          {exampleItems.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">{t("whenToUse.title")}</h2>
        </div>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          {whenToUseItems.map((item) => <li key={item}>{item}</li>)}
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
