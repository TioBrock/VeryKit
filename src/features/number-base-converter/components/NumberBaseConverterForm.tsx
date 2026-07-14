"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { convertBases } from "@/features/number-base-converter/utils/convert";

export function NumberBaseConverterForm() {
  const t = useTranslations("number-base-converter");
  const [decimal, setDecimal] = useState("");
  const [hex, setHex] = useState("");
  const [binary, setBinary] = useState("");
  const [octal, setOctal] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);

  const updateFromDecimal = useCallback((value: string) => {
    setDecimal(value);
    if (value === "" || value === "-") {
      setHex("");
      setBinary("");
      setOctal("");
      return;
    }
    const result = convertBases(value, 10);
    setHex(result.hex);
    setBinary(result.binary);
    setOctal(result.octal);
  }, []);

  const updateFromHex = useCallback((value: string) => {
    setHex(value);
    if (value === "" || value === "-" || value === "0x" || value === "0X") {
      setDecimal("");
      setBinary("");
      setOctal("");
      return;
    }
    const result = convertBases(value, 16);
    setDecimal(result.decimal);
    setBinary(result.binary);
    setOctal(result.octal);
  }, []);

  const updateFromBinary = useCallback((value: string) => {
    setBinary(value);
    if (value === "" || value === "-") {
      setDecimal("");
      setHex("");
      setOctal("");
      return;
    }
    const result = convertBases(value, 2);
    setDecimal(result.decimal);
    setHex(result.hex);
    setOctal(result.octal);
  }, []);

  const updateFromOctal = useCallback((value: string) => {
    setOctal(value);
    if (value === "" || value === "-") {
      setDecimal("");
      setHex("");
      setBinary("");
      return;
    }
    const result = convertBases(value, 8);
    setDecimal(result.decimal);
    setHex(result.hex);
    setBinary(result.binary);
  }, []);

  const handleCopy = useCallback(async (value: string, field: string) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setCopyError(false);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(null);
      setCopyError(true);
    }
  }, []);

  const handleClear = useCallback(() => {
    setDecimal("");
    setHex("");
    setBinary("");
    setOctal("");
    setCopiedField(null);
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
        {/* Input fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Decimal */}
          <div>
            <label htmlFor="decimal-input" className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
              <span>{t("decimal")}</span>
              <button
                type="button"
                onClick={() => handleCopy(decimal, "decimal")}
                disabled={!decimal}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                {copiedField === "decimal" ? (
                  <Check className="h-3 w-3 text-green-600" aria-hidden="true" />
                ) : (
                  <Copy className="h-3 w-3" aria-hidden="true" />
                )}
                {copiedField === "decimal" ? t("successCopy") : t("copy")}
              </button>
            </label>
            <input
              id="decimal-input"
              type="text"
              value={decimal}
              onChange={(e) => updateFromDecimal(e.target.value)}
              placeholder={t("enterValue")}
              className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none"
            />
          </div>

          {/* Hexadecimal */}
          <div>
            <label htmlFor="hex-input" className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
              <span>{t("hex")}</span>
              <button
                type="button"
                onClick={() => handleCopy(hex, "hex")}
                disabled={!hex}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                {copiedField === "hex" ? (
                  <Check className="h-3 w-3 text-green-600" aria-hidden="true" />
                ) : (
                  <Copy className="h-3 w-3" aria-hidden="true" />
                )}
                {copiedField === "hex" ? t("successCopy") : t("copy")}
              </button>
            </label>
            <input
              id="hex-input"
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              placeholder={t("enterValue")}
              className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none"
            />
          </div>

          {/* Binary */}
          <div>
            <label htmlFor="binary-input" className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
              <span>{t("binary")}</span>
              <button
                type="button"
                onClick={() => handleCopy(binary, "binary")}
                disabled={!binary}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                {copiedField === "binary" ? (
                  <Check className="h-3 w-3 text-green-600" aria-hidden="true" />
                ) : (
                  <Copy className="h-3 w-3" aria-hidden="true" />
                )}
                {copiedField === "binary" ? t("successCopy") : t("copy")}
              </button>
            </label>
            <input
              id="binary-input"
              type="text"
              value={binary}
              onChange={(e) => updateFromBinary(e.target.value)}
              placeholder={t("enterValue")}
              className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none"
            />
          </div>

          {/* Octal */}
          <div>
            <label htmlFor="octal-input" className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
              <span>{t("octal")}</span>
              <button
                type="button"
                onClick={() => handleCopy(octal, "octal")}
                disabled={!octal}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
              >
                {copiedField === "octal" ? (
                  <Check className="h-3 w-3 text-green-600" aria-hidden="true" />
                ) : (
                  <Copy className="h-3 w-3" aria-hidden="true" />
                )}
                {copiedField === "octal" ? t("successCopy") : t("copy")}
              </button>
            </label>
            <input
              id="octal-input"
              type="text"
              value={octal}
              onChange={(e) => updateFromOctal(e.target.value)}
              placeholder={t("enterValue")}
              className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none"
            />
          </div>
        </div>

        {/* Clear button */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClear}
            disabled={!decimal && !hex && !binary && !octal}
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
