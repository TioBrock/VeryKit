"use client";

import { useState, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { testRegex, isValidRegex, highlightMatches } from "@/features/regex-tester/utils/test";

const CHEAT_SHEET = [
  { label: 'Email', i18nKey: 'cheatSheetEmail', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
  { label: 'URL', i18nKey: 'cheatSheetUrl', pattern: 'https?:\\/\\/[\\w.-]+\\.[a-zA-Z]{2,}(\\/\\S*)?' },
  { label: 'Numbers', i18nKey: 'cheatSheetNumbers', pattern: '^\\d+$' },
  { label: 'Phone BR', i18nKey: 'cheatSheetPhoneBR', pattern: '\\(?\\d{2}\\)?\\s?\\d{4,5}-\\d{4}' },
  { label: 'Date', i18nKey: 'cheatSheetDate', pattern: '\\d{2}\\/\\d{2}\\/\\d{4}' },
  { label: 'IPv4', i18nKey: 'cheatSheetIPv4', pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}' },
  { label: 'Hex Color', i18nKey: 'cheatSheetHexColor', pattern: '#[0-9A-Fa-f]{3,6}' },
  { label: 'Words', i18nKey: 'cheatSheetWords', pattern: '\\w+' },
];

const FLAGS = [
  { id: "g", label: "Global (g)" },
  { id: "i", label: "Case-insensitive (i)" },
  { id: "m", label: "Multiline (m)" },
  { id: "s", label: "Dotall (s)" },
] as const;

export function RegexTesterForm() {
  const t = useTranslations("regex-tester");
  const [pattern, setPattern] = useState("");
  const [text, setText] = useState("");
  const [flags, setFlags] = useState<Set<string>>(new Set(["g"]));
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const toggleFlag = useCallback((flag: string) => {
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(flag)) {
        next.delete(flag);
      } else {
        next.add(flag);
      }
      return next;
    });
  }, []);

  const matchResults = useMemo(() => {
    if (!pattern || !text) return [];
    if (!isValidRegex(pattern)) return [];
    const flagsStr = Array.from(flags).join("");
    return testRegex(pattern, text, flagsStr);
  }, [pattern, text, flags]);

  const highlightedHtml = useMemo(() => {
    if (!pattern || !text) return "";
    if (!isValidRegex(pattern)) return "";
    const flagsStr = Array.from(flags).join("");
    const matches = testRegex(pattern, text, flagsStr);
    return highlightMatches(text, matches);
  }, [pattern, text, flags]);

  const isValidPattern = pattern === "" || isValidRegex(pattern);

  const handleCopy = useCallback(async () => {
    if (matchResults.length === 0) return;
    const text = matchResults.map((m) => m.value).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [matchResults]);

  const handleClear = useCallback(() => {
    setPattern("");
    setText("");
    setFlags(new Set(["g"]));
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

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="regex-pattern" className="mb-2 block text-sm font-medium text-foreground">
            {t("patternLabel")}
          </label>
          <input
            id="regex-pattern"
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder={t("patternPlaceholder")}
            className={`h-12 w-full rounded-md border bg-muted/50 px-4 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue ${
              !isValidPattern ? "border-destructive" : "border-input"
            }`}
          />
          {!isValidPattern && (
            <p className="mt-1 text-xs text-destructive">{t("invalidPattern")}</p>
          )}
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-foreground">{t("flagsLabel")}</legend>
          <div className="flex flex-wrap gap-3">
            {FLAGS.map((f) => (
              <label
                key={f.id}
                className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border px-4 text-sm font-medium transition-colors ${
                  flags.has(f.id)
                    ? "border-brand-blue bg-brand-blue/10 text-brand-blue"
                    : "border-border bg-background text-foreground hover:bg-accent"
                }`}
              >
                <input
                  type="checkbox"
                  checked={flags.has(f.id)}
                  onChange={() => toggleFlag(f.id)}
                  className="sr-only"
                />
                {f.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="regex-text" className="mb-2 block text-sm font-medium text-foreground">
            {t("textLabel")}
          </label>
          <textarea
            id="regex-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("textPlaceholder")}
            rows={8}
            className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        {text && highlightedHtml && (
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="mb-2 text-sm font-medium text-foreground">{t("highlightedTitle")}</div>
            <div
              className="whitespace-pre-wrap font-mono text-sm text-foreground"
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t("matchCount")}: <span className="font-semibold text-foreground">{matchResults.length}</span>
          </p>
          {matchResults.length > 0 && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex h-8 items-center gap-2 rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              {copied ? (
                <Check className="h-3 w-3 text-green-600" aria-hidden="true" />
              ) : (
                <Copy className="h-3 w-3" aria-hidden="true" />
              )}
              {copied ? t("copied") : t("copy")}
            </button>
          )}
        </div>

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
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">{t("cheatSheetTitle")}</h2>
        </div>
        <p className="mb-3 text-sm text-muted-foreground">{t("cheatSheetDesc")}</p>
        <div className="flex flex-wrap gap-2">
          {CHEAT_SHEET.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setPattern(item.pattern)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:border-brand-blue/30"
            >
              <span className="font-semibold">{t(item.i18nKey)}</span>
              <code className="text-muted-foreground">{item.pattern.length > 30 ? item.pattern.slice(0, 30) + '...' : item.pattern}</code>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">{t("howItWorks")}</h2>
        </div>
        <p className="text-sm text-muted-foreground">{t("howItWorksDesc")}</p>
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
