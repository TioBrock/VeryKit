"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import {
  generatePassword,
  calculateStrength,
  getCharsetSize,
  type StrengthLevel,
} from "@/features/password-generator/utils/generate";

export function PasswordGeneratorForm() {
  const t = useTranslations("password-generator");
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [error, setError] = useState(false);

  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);

  const strength = calculateStrength(
    password.length || length,
    password.length > 0 ? getCharsetSize({ length, uppercase, lowercase, numbers, symbols, excludeAmbiguous }) : getCharsetSize({ length, uppercase, lowercase, numbers, symbols, excludeAmbiguous })
  );

  const handleGenerate = useCallback(() => {
    if (!uppercase && !lowercase && !numbers && !symbols) {
      setError(true);
      setPassword("");
      return;
    }
    try {
      const result = generatePassword({ length, uppercase, lowercase, numbers, symbols, excludeAmbiguous });
      setPassword(result);
      setError(false);
      setCopied(false);
      setCopyError(false);
    } catch {
      setError(true);
    }
  }, [length, uppercase, lowercase, numbers, symbols, excludeAmbiguous]);

  const handleCopy = useCallback(async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [password]);

  const handleClear = useCallback(() => {
    setPassword("");
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
        {/* Options */}
        <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <label htmlFor="password-length" className="text-sm font-medium text-foreground">
              {t("length")}
            </label>
            <span className="text-sm text-muted-foreground">{length}</span>
          </div>
          <input
            id="password-length"
            type="range"
            min={4}
            max={128}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-brand-blue"
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="h-4 w-4 accent-brand-blue"
              />
              {t("uppercase")}
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="h-4 w-4 accent-brand-blue"
              />
              {t("lowercase")}
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
                className="h-4 w-4 accent-brand-blue"
              />
              {t("numbers")}
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={symbols}
                onChange={(e) => setSymbols(e.target.checked)}
                className="h-4 w-4 accent-brand-blue"
              />
              {t("symbols")}
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                className="h-4 w-4 accent-brand-blue"
              />
              {t("excludeAmbiguous")}
            </label>
          </div>

          {/* Strength Meter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{t("strength")}</span>
              <span className={`text-sm font-medium ${
                strength.level === "veryWeak" ? "text-red-500" :
                strength.level === "weak" ? "text-orange-500" :
                strength.level === "fair" ? "text-yellow-500" :
                strength.level === "strong" ? "text-green-500" :
                "text-green-700"
              }`}>
                {t(strength.level)}
              </span>
            </div>
            <div className="flex gap-1.5">
              {(["veryWeak", "weak", "fair", "strong", "veryStrong"] as StrengthLevel[]).map((level, i) => {
                const filled = ["veryWeak", "weak", "fair", "strong", "veryStrong"].indexOf(strength.level) >= i;
                return (
                  <div
                    key={level}
                    className={`h-2 flex-1 rounded-full transition-colors ${
                      filled
                        ? level === "veryWeak" ? "bg-red-500" :
                          level === "weak" ? "bg-orange-500" :
                          level === "fair" ? "bg-yellow-500" :
                          level === "strong" ? "bg-green-500" :
                          "bg-green-700"
                        : "bg-muted"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          className="inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          {t("generate")}
        </button>

        {/* Error */}
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {t("errorNoChars")}
          </p>
        )}

        {/* Result */}
        <div>
          <label htmlFor="password-result" className="mb-2 block text-sm font-medium text-foreground">
            {t("resultLabel")}
          </label>
          <input
            id="password-result"
            type="text"
            readOnly
            value={password}
            placeholder={t("resultPlaceholder")}
            className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none"
          />
        </div>

        {/* Action row */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!password}
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
            disabled={!password}
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
