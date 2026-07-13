"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { generateHash, HASH_ALGORITHMS, type HashAlgorithm } from "@/features/hash-generator/utils/hash";

export function HashGeneratorForm() {
  const t = useTranslations("hash-generator");
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<HashAlgorithm, string>>({
    "MD5": "",
    "SHA-1": "",
    "SHA-256": "",
    "SHA-512": "",
  });
  const [copiedAlgo, setCopiedAlgo] = useState<HashAlgorithm | null>(null);
  const [copyError, setCopyError] = useState(false);

  useEffect(() => {
    if (!input) {
      setHashes({ "MD5": "", "SHA-1": "", "SHA-256": "", "SHA-512": "" });
      return;
    }

    let cancelled = false;
    const compute = async () => {
      const results: Record<string, string> = {};
      for (const algo of HASH_ALGORITHMS) {
        results[algo] = await generateHash(input, algo);
      }
      if (!cancelled) {
        setHashes(results as Record<HashAlgorithm, string>);
      }
    };
    compute();
    return () => { cancelled = true; };
  }, [input]);

  const handleCopy = useCallback(async (algo: HashAlgorithm) => {
    const value = hashes[algo];
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopiedAlgo(algo);
      setCopyError(false);
      setTimeout(() => setCopiedAlgo(null), 2000);
    } catch {
      setCopiedAlgo(null);
      setCopyError(true);
    }
  }, [hashes]);

  const handleClear = useCallback(() => {
    setInput("");
    setCopiedAlgo(null);
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

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="hash-input" className="mb-2 block text-sm font-medium text-foreground">
            {t("inputLabel")}
          </label>
          <textarea
            id="hash-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("placeholder")}
            rows={4}
            className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        <div className="flex flex-col gap-3">
          {HASH_ALGORITHMS.map((algo) => (
            <div key={algo} className="flex items-center gap-3">
              <label className="w-24 flex-shrink-0 text-sm font-medium text-foreground">{algo}</label>
              <input
                type="text"
                readOnly
                value={hashes[algo]}
                placeholder={t("hashPlaceholder")}
                className="h-10 flex-1 rounded-md border border-input bg-muted/50 px-4 font-mono text-sm text-foreground outline-none"
              />
              <button
                type="button"
                onClick={() => handleCopy(algo)}
                disabled={!hashes[algo]}
                className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                {copiedAlgo === algo ? (
                  <Check className="h-4 w-4 text-green-600" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {copiedAlgo === algo ? t("copied") : t("copy")}
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleClear}
          disabled={!input}
          className="inline-flex h-10 w-fit items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          {t("clear")}
        </button>

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
