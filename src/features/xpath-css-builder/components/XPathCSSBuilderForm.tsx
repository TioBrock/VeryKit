"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { buildXPath, buildCSSSelector } from "@/features/xpath-css-builder/utils/builder";

export function XPathCSSBuilderForm() {
  const t = useTranslations("xpath-css-builder");
  const [tag, setTag] = useState("");
  const [className, setClassName] = useState("");
  const [id, setId] = useState("");
  const [attrName, setAttrName] = useState("");
  const [attrValue, setAttrValue] = useState("");
  const [copiedField, setCopiedField] = useState<"xpath" | "css" | null>(null);

  const options = useMemo(() => ({ tag, className, id, attrName, attrValue }), [tag, className, id, attrName, attrValue]);

  const xpath = useMemo(() => buildXPath(options), [options]);
  const cssSelector = useMemo(() => buildCSSSelector(options), [options]);

  const handleCopy = useCallback(async (field: "xpath" | "css") => {
    const value = field === "xpath" ? xpath : cssSelector;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(null);
    }
  }, [xpath, cssSelector]);

  const handleClear = useCallback(() => {
    setTag("");
    setClassName("");
    setId("");
    setAttrName("");
    setAttrValue("");
    setCopiedField(null);
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
            <label htmlFor="tag-input" className="mb-2 block text-sm font-medium text-foreground">
              {t("tagLabel")}
            </label>
            <input
              id="tag-input"
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="div"
              className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
          <div>
            <label htmlFor="class-input" className="mb-2 block text-sm font-medium text-foreground">
              {t("classLabel")}
            </label>
            <input
              id="class-input"
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="my-class"
              className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
          <div>
            <label htmlFor="id-input" className="mb-2 block text-sm font-medium text-foreground">
              {t("idLabel")}
            </label>
            <input
              id="id-input"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="my-id"
              className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="attr-name-input" className="mb-2 block text-sm font-medium text-foreground">
                {t("attrNameLabel")}
              </label>
              <input
                id="attr-name-input"
                type="text"
                value={attrName}
                onChange={(e) => setAttrName(e.target.value)}
                placeholder="data-testid"
                className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
            <div>
              <label htmlFor="attr-value-input" className="mb-2 block text-sm font-medium text-foreground">
                {t("attrValueLabel")}
              </label>
              <input
                id="attr-value-input"
                type="text"
                value={attrValue}
                onChange={(e) => setAttrValue(e.target.value)}
                placeholder="value"
                className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="inline-flex h-10 w-fit items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          {t("clear")}
        </button>

        <div className="flex flex-col gap-3">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">{t("xpathOutput")}</label>
              <button
                type="button"
                onClick={() => handleCopy("xpath")}
                className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus:ring-brand-blue"
              >
                {copiedField === "xpath" ? (
                  <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {copiedField === "xpath" ? t("copied") : t("copy")}
              </button>
            </div>
            <input
              type="text"
              readOnly
              value={xpath}
              className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">{t("cssOutput")}</label>
              <button
                type="button"
                onClick={() => handleCopy("css")}
                className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus:ring-brand-blue"
              >
                {copiedField === "css" ? (
                  <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {copiedField === "css" ? t("copied") : t("copy")}
              </button>
            </div>
            <input
              type="text"
              readOnly
              value={cssSelector}
              className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none"
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">{t("realTimeUpdate")}</p>
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
