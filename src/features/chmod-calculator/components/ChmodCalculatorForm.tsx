"use client";

import React, { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { calculateChmod, octalToPermissions, PRESETS, type ChmodPermissions } from "@/features/chmod-calculator/utils/calculate";

const defaultPermissions: ChmodPermissions = {
  owner: { r: true, w: true, x: true },
  group: { r: true, w: false, x: true },
  public: { r: true, w: false, x: true },
};

export function ChmodCalculatorForm() {
  const t = useTranslations("chmod-calculator");
  const [permissions, setPermissions] = useState<ChmodPermissions>(defaultPermissions);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const result = calculateChmod(permissions);

  const toggle = useCallback((group: "owner" | "group" | "public", key: "r" | "w" | "x") => {
    setPermissions((prev) => ({
      ...prev,
      [group]: { ...prev[group], [key]: !prev[group][key] },
    }));
    setCopied(false);
  }, []);

  const applyPreset = useCallback((octal: string) => {
    const perms = octalToPermissions(octal);
    if (perms) {
      setPermissions(perms);
      setCopied(false);
    }
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(result.octal);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [result.octal]);

  const handleClear = useCallback(() => {
    setPermissions(defaultPermissions);
    setCopied(false);
    setCopyError(false);
  }, []);

  const faqItems = t.raw("faq.items") as Array<{ question: string; answer: string }>;
  const exampleItems = t.raw("examples.items") as string[];
  const whenToUseItems = t.raw("whenToUse.items") as string[];

  const groups: Array<{ key: "owner" | "group" | "public"; label: string }> = [
    { key: "owner", label: t("owner") },
    { key: "group", label: t("group") },
    { key: "public", label: t("public") },
  ];
  const perms: Array<{ key: "r" | "w" | "x"; label: string }> = [
    { key: "r", label: t("read") },
    { key: "w", label: t("write") },
    { key: "x", label: t("execute") },
  ];

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("description")}</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Explanation block */}
        <div className="rounded-lg border border-border bg-muted/50 p-6">
          <h2 className="mb-3 text-sm font-semibold text-foreground">{t("explanationTitle")}</h2>
          <p className="mb-2 text-sm text-muted-foreground">{t("explanationValues")}</p>
          <ul className="mb-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>{t("readEquals")}</li>
            <li>{t("writeEquals")}</li>
            <li>{t("executeEquals")}</li>
          </ul>
          <p className="mb-2 text-sm text-muted-foreground">{t("explanationGroups")}</p>
          <ul className="mb-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li><strong>{t("owner")}:</strong> {t("ownerDescription")}</li>
            <li><strong>{t("group")}:</strong> {t("groupDescription")}</li>
            <li><strong>{t("public")}:</strong> {t("publicDescription")}</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            {t("explanationExample")} <span className="font-mono font-bold text-foreground">755</span>
          </p>
        </div>

        {/* Checkbox grid */}
        <div className="grid grid-cols-4 gap-2 text-sm font-medium text-foreground">
          <div />
          {perms.map((p) => (
            <div key={p.key} className="text-center">{p.label}</div>
          ))}
          {groups.map((g) => (
            <React.Fragment key={g.key}>
              <div className="flex items-center">{g.label}</div>
              {perms.map((p) => (
                <div key={p.key} className="flex justify-center">
                  <input
                    type="checkbox"
                    checked={permissions[g.key][p.key]}
                    onChange={() => toggle(g.key, p.key)}
                    className="h-5 w-5 rounded border-border accent-brand-blue"
                  />
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Result */}
        <div className="flex items-center gap-4 rounded-md border border-border bg-card p-4">
          <div>
            <span className="text-sm text-muted-foreground">{t("octal")}: </span>
            <span className="font-mono text-lg font-bold text-foreground">{result.octal}</span>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">{t("symbolic")}: </span>
            <span className="font-mono text-lg font-bold text-foreground">{result.symbolic}</span>
          </div>
        </div>

        {/* Presets */}
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">{t("presets")}</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.octal}
                type="button"
                onClick={() => applyPreset(p.octal)}
                className="inline-flex h-9 items-center gap-1 rounded-md border border-border bg-background px-3 text-sm font-mono text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action row */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            {copied ? <Check className="h-4 w-4 text-green-600" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
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
