"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench, AlertTriangle } from "lucide-react";

import {
  CARD_BRANDS,
  generateCardData,
  type CardBrand,
  type CardData,
} from "@/features/credit-card-generator/utils/generate";

const BRAND_STYLES: Record<CardBrand, string> = {
  visa: "from-blue-600 to-blue-800",
  mastercard: "from-orange-500 to-red-600",
  amex: "from-indigo-500 to-indigo-700",
  discover: "from-amber-500 to-orange-600",
};

export function CreditCardGeneratorForm() {
  const t = useTranslations("credit-card-generator");
  const [brand, setBrand] = useState<CardBrand>("visa");
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleGenerate = useCallback(() => {
    setCardData(generateCardData(brand));
    setCopied(false);
    setCopyError(false);
  }, [brand]);

  const handleCopy = useCallback(async () => {
    if (!cardData) return;
    try {
      await navigator.clipboard.writeText(cardData.number.replace(/\s/g, ""));
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [cardData]);

  const handleClear = useCallback(() => {
    setCardData(null);
    setCopied(false);
    setCopyError(false);
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

      <div className="rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-900/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
          <p className="text-sm text-yellow-800 dark:text-yellow-200">{t("warning")}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <fieldset>
          <legend className="mb-3 text-sm font-medium text-foreground">{t("brandLabel")}</legend>
          <div className="flex flex-wrap gap-3">
            {CARD_BRANDS.map((b) => (
              <label
                key={b.id}
                className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors ${
                  brand === b.id
                    ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                    : "border-border bg-background text-foreground hover:bg-accent"
                }`}
              >
                <input
                  type="radio"
                  name="card-brand"
                  value={b.id}
                  checked={brand === b.id}
                  onChange={() => setBrand(b.id)}
                  className="sr-only"
                />
                {b.name}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={handleGenerate}
          className="inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          {t("generate")}
        </button>

        {cardData && (
          <div className="flex flex-col items-center gap-6 pt-2">
            {/* Virtual Card */}
            <div
              className={`relative w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br ${BRAND_STYLES[cardData.brand]} p-6 shadow-xl sm:p-8`}
              style={{ aspectRatio: "1.586 / 1" }}
            >
              <div className="flex h-full flex-col justify-between text-white">
                {/* Top row: brand name */}
                <div className="flex items-start justify-between">
                  <div className="h-8 w-12 rounded bg-white/20" aria-hidden="true" />
                  <span className="text-lg font-bold uppercase tracking-wide opacity-90">
                    {CARD_BRANDS.find((b) => b.id === cardData.brand)?.name}
                  </span>
                </div>

                {/* Card number */}
                <div className="font-mono text-xl tracking-widest sm:text-2xl">
                  {cardData.number}
                </div>

                {/* Bottom row: name + expiry */}
                <div className="flex items-end justify-between gap-4 text-xs sm:text-sm">
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 text-[10px] uppercase tracking-wider opacity-70">
                      {t("cardName")}
                    </p>
                    <p className="truncate font-medium uppercase tracking-wide">
                      {cardData.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="mb-0.5 text-[10px] uppercase tracking-wider opacity-70">
                      {t("cardExpiry")}
                    </p>
                    <p className="font-medium">{cardData.expiry}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CVV */}
            <div className="flex flex-col items-center gap-1">
              <div className="rounded-lg border border-border bg-muted/50 px-6 py-3 font-mono text-sm text-foreground">
                <span className="text-xs text-muted-foreground">{t("cardCVV")}: </span>
                <span className="font-semibold">{cardData.cvv}</span>
              </div>
              <p className="text-xs text-muted-foreground">{t("cardCvvNote")}</p>
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!cardData}
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
            disabled={!cardData}
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
