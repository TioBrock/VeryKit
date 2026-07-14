"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { parseUserAgent, type UserAgentInfo } from "@/features/user-agent-parser/utils/parser";

export function UserAgentParserForm() {
  const t = useTranslations("user-agent-parser");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<UserAgentInfo | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleParse = useCallback(() => {
    if (!input.trim()) {
      setResult(null);
      return;
    }
    const parsed = parseUserAgent(input);
    setResult(parsed);
    setCopied(false);
    setCopyError(false);
  }, [input]);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    const text = `OS: ${result.os}\nBrowser: ${result.browser}\nVersion: ${result.version}\nDevice: ${result.device}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [result]);

  const handleClear = useCallback(() => {
    setInput("");
    setResult(null);
    setCopied(false);
    setCopyError(false);
  }, []);

  const faqItems = t.raw("faq.items") as Array<{ question: string; answer: string }>;
  const exampleItems = t.raw("examples.items") as string[];
  const whenToUseItems = t.raw("whenToUse.items") as string[];

  const deviceColor = result?.device === "Mobile" || result?.device === "Tablet"
    ? "text-orange-600 dark:text-orange-400"
    : result?.device === "Desktop"
      ? "text-green-600 dark:text-green-400"
      : "text-muted-foreground";

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
          <label htmlFor="ua-input" className="mb-2 block text-sm font-medium text-foreground">
            {t("inputLabel")}
          </label>
          <textarea
            id="ua-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onInput={handleParse}
            placeholder={t("inputPlaceholder")}
            rows={3}
            className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none resize-none focus:ring-2 focus:ring-brand-blue"
          />
          <div className="mt-2">
            <button
              type="button"
              onClick={handleParse}
              disabled={!input.trim()}
              className="inline-flex h-10 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
            >
              {t("analyzeButton")}
            </button>
          </div>
        </div>

        {/* How to use */}
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <h3 className="mb-2 text-sm font-semibold text-foreground">{t("howToUse")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("howToUseContent")}
          </p>
        </div>

        {/* Real example */}
        <div className="rounded-lg border border-border bg-muted/50 p-4">
          <h3 className="mb-2 text-sm font-semibold text-foreground">{t("realExample")}</h3>
          <p className="mb-2 text-xs text-muted-foreground">{t("realExampleHint")}</p>
          <code className="block break-all rounded bg-background px-3 py-2 font-mono text-xs text-foreground">
            {t("realExampleString")}
          </code>
        </div>

        {/* Parsed Result */}
        {result && (
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("osLabel")}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{result.os}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("browserLabel")}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{result.browser}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("versionLabel")}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{result.version}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{t("deviceLabel")}</p>
                <p className={`mt-1 text-sm font-medium ${deviceColor}`}>{result.device}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
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
            {copied ? t("copied") : t("copy")}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={!input}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            {t("clear")}
          </button>
        </div>

        {/* Copy error */}
        {copyError && (
          <p className="text-sm text-destructive" role="alert">{t("errorCopy")}</p>
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
