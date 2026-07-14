"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { parseCurl, toFetchCode, toPythonCode } from "@/features/curl-to-code/utils/curl";

type Tab = "javascript" | "python";

export function CurlToCodeForm() {
  const t = useTranslations("curl-to-code");
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("javascript");
  const [jsCode, setJsCode] = useState("");
  const [pyCode, setPyCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [error, setError] = useState(false);

  const handleConvert = useCallback(() => {
    try {
      const parsed = parseCurl(input);
      setJsCode(toFetchCode(parsed));
      setPyCode(toPythonCode(parsed));
      setError(false);
      setCopied(false);
      setCopyError(false);
    } catch {
      setError(true);
      setJsCode("");
      setPyCode("");
    }
  }, [input]);

  const currentCode = activeTab === "javascript" ? jsCode : pyCode;

  const handleCopy = useCallback(async () => {
    if (!currentCode) return;
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [currentCode]);

  const handleClear = useCallback(() => {
    setInput("");
    setJsCode("");
    setPyCode("");
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
          <label htmlFor="curl-input" className="mb-2 block text-sm font-medium text-foreground">
            {t("curlInput")}
          </label>
          <textarea
            id="curl-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("curlPlaceholder")}
            rows={8}
            className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none resize-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        {/* Convert button */}
        <button
          type="button"
          onClick={handleConvert}
          disabled={!input}
          className="inline-flex h-12 w-fit items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
        >
          {t("title")}
        </button>

        {/* Error */}
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {t("errorInvalid")}
          </p>
        )}

        {/* Output */}
        {(jsCode || pyCode) && (
          <div className="flex flex-col gap-3">
            {/* Tabs */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { setActiveTab("javascript"); setCopied(false); }}
                className={`inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors ${
                  activeTab === "javascript"
                    ? "bg-brand-blue text-white"
                    : "border border-border bg-background text-foreground hover:bg-accent"
                }`}
              >
                {t("jsTab")}
              </button>
              <button
                type="button"
                onClick={() => { setActiveTab("python"); setCopied(false); }}
                className={`inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors ${
                  activeTab === "python"
                    ? "bg-brand-blue text-white"
                    : "border border-border bg-background text-foreground hover:bg-accent"
                }`}
              >
                {t("pythonTab")}
              </button>
            </div>

            {/* Code output */}
            <pre className="min-h-[200px] overflow-x-auto rounded-md border border-input bg-muted/50 p-4 font-mono text-sm text-foreground">
              <code>{currentCode}</code>
            </pre>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!currentCode}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
            {copied ? t("copied") : t("copyCode")}
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
