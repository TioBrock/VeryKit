"use client";

import { useState, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { hexToColorFormats, isValidHex, normalizeHex, contrastRatio, wcagLevel } from "@/features/color-picker/utils/convert";

type CopiedField = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "cmyk" | null;

export function ColorPickerForm() {
  const t = useTranslations("color-picker");
  const [hex, setHex] = useState("#3b82f6");
  const [alpha, setAlpha] = useState(1);
  const [copiedField, setCopiedField] = useState<CopiedField>(null);
  const [copyError, setCopyError] = useState(false);
  const [fgColor, setFgColor] = useState("#3b82f6");
  const [bgColor, setBgColor] = useState("#ffffff");

  const normalizedHex = useMemo(() => {
    if (!isValidHex(hex)) return null;
    return normalizeHex(hex);
  }, [hex]);

  const formats = useMemo(() => {
    if (!normalizedHex) return null;
    return hexToColorFormats(normalizedHex, alpha);
  }, [normalizedHex, alpha]);

  const normalizedFg = useMemo(() => (isValidHex(fgColor) ? normalizeHex(fgColor) : null), [fgColor]);
  const normalizedBg = useMemo(() => (isValidHex(bgColor) ? normalizeHex(bgColor) : null), [bgColor]);

  const ratio = useMemo(() => {
    if (!normalizedFg || !normalizedBg) return null;
    return contrastRatio(normalizedFg, normalizedBg);
  }, [normalizedFg, normalizedBg]);

  const levels = useMemo(() => (ratio !== null ? wcagLevel(ratio) : null), [ratio]);

  const handleHexInput = useCallback((value: string) => {
    const cleaned = value.startsWith("#") ? value : `#${value}`;
    setHex(cleaned);
    setCopiedField(null);
    setCopyError(false);
  }, []);

  const handleColorPicker = useCallback((value: string) => {
    setHex(value);
    setCopiedField(null);
    setCopyError(false);
  }, []);

  const handleCopy = useCallback(async (value: string, field: CopiedField) => {
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
    setHex("#3b82f6");
    setAlpha(1);
    setCopiedField(null);
    setCopyError(false);
  }, []);

  const formatRows = formats
    ? ([
        { key: "hex" as const, label: "HEX", value: formats.hex },
        { key: "rgb" as const, label: "RGB", value: formats.rgb },
        { key: "rgba" as const, label: "RGBA", value: formats.rgba },
        { key: "hsl" as const, label: "HSL", value: formats.hsl },
        { key: "hsla" as const, label: "HSLA", value: formats.hsla },
        { key: "cmyk" as const, label: "CMYK", value: formats.cmyk },
      ] as const)
    : [];

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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-2">
            <label htmlFor="color-picker" className="text-sm font-medium text-foreground">
              {t("pickerLabel")}
            </label>
            <input
              id="color-picker"
              type="color"
              value={normalizedHex ?? "#000000"}
              onChange={(e) => handleColorPicker(e.target.value)}
              className="h-12 w-16 cursor-pointer rounded-md border border-input bg-transparent"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="hex-input" className="text-sm font-medium text-foreground">
              HEX
            </label>
            <input
              id="hex-input"
              type="text"
              value={hex}
              onChange={(e) => handleHexInput(e.target.value)}
              placeholder="#000000"
              className={`h-12 w-36 rounded-md border bg-muted/50 px-4 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue ${
                !isValidHex(hex) ? "border-destructive" : "border-input"
              }`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="alpha-slider" className="text-sm font-medium text-foreground">
            {t("alphaLabel")}: {Math.round(alpha * 100)}%
          </label>
          <input
            id="alpha-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            className="w-full accent-brand-blue"
          />
        </div>

        {normalizedHex && (
          <div
            className="h-20 w-full rounded-md border border-border"
            style={{ backgroundColor: formats?.rgba }}
          />
        )}

        {formats && (
          <div className="flex flex-col gap-2">
            {formatRows.map((row) => (
              <div key={row.key} className="flex items-center gap-3">
                <label className="w-14 flex-shrink-0 text-sm font-medium text-foreground">{row.label}</label>
                <input
                  type="text"
                  readOnly
                  value={row.value}
                  className="h-10 flex-1 rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleCopy(row.value, row.key)}
                  className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  {copiedField === row.key ? (
                    <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  {copiedField === row.key ? t("copied") : t("copy")}
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleClear}
          className="inline-flex h-10 w-fit items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          {t("clear")}
        </button>

        {copyError && (
          <p className="text-sm text-destructive" role="alert">{t("errorCopy")}</p>
        )}

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">{t("contrastTitle")}</h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex flex-col gap-2">
              <label htmlFor="contrast-fg" className="text-sm font-medium text-foreground">
                {t("foregroundLabel")}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="contrast-fg"
                  type="color"
                  value={normalizedFg ?? "#000000"}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded-md border border-input bg-transparent"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-10 w-28 rounded-md border border-input bg-muted/50 px-3 font-mono text-sm text-foreground outline-none"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contrast-bg" className="text-sm font-medium text-foreground">
                {t("backgroundLabel")}
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="contrast-bg"
                  type="color"
                  value={normalizedBg ?? "#ffffff"}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded-md border border-input bg-transparent"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-10 w-28 rounded-md border border-input bg-muted/50 px-3 font-mono text-sm text-foreground outline-none"
                />
              </div>
            </div>
          </div>

          {ratio !== null && levels && (
            <div className="mt-4 flex flex-col gap-3">
              <div className="text-sm font-medium text-foreground">
                {t("contrastRatio")}: <span className="font-mono">{ratio.toFixed(2)}:1</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {([
                  { key: "aaNormal", pass: levels.aa },
                  { key: "aaLarge", pass: levels.aaLarge },
                  { key: "aaaNormal", pass: levels.aaa },
                  { key: "aaaLarge", pass: levels.aaaLarge },
                ] as const).map((item) => (
                  <span
                    key={item.key}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                      item.pass
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {t(item.key)}: {item.pass ? t("pass") : t("fail")}
                  </span>
                ))}
              </div>
              <div
                className="mt-2 rounded-md border border-border p-4 text-center text-sm"
                style={{ backgroundColor: normalizedBg ?? "#ffffff", color: normalizedFg ?? "#000000" }}
              >
                {t("previewText")}
              </div>
            </div>
          )}
        </div>
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
