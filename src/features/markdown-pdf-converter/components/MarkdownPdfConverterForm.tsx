"use client";

import { useState, useCallback, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench, FileDown } from "lucide-react";

import { markdownToHtml } from "@/features/markdown-html-converter/utils/convert";

export function MarkdownPdfConverterForm() {
  const t = useTranslations("markdown-pdf-converter");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const preview = useMemo(() => {
    if (!input.trim()) return "";
    try {
      return markdownToHtml(input);
    } catch {
      return "";
    }
  }, [input]);

  const handleCopy = useCallback(async () => {
    if (!preview) return;
    try {
      await navigator.clipboard.writeText(preview);
      setCopied(true);
      setCopyError(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [preview]);

  const handleClear = useCallback(() => {
    setInput("");
    setCopied(false);
    setCopyError(false);
  }, []);

  const handleExportPdf = useCallback(() => {
    if (!input.trim()) return;
    const html = markdownToHtml(input);

    const doc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 25mm 20mm; }
  @media print {
    body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    a { color: #2563eb !important; }
  }
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    color: #1e293b;
    font-size: 14px;
    line-height: 1.75;
    max-width: 700px;
    margin: 0 auto;
  }
  h1 {
    font-size: 26px;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 20px 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #3b82f6;
    letter-spacing: -0.02em;
  }
  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #1e293b;
    margin: 32px 0 12px 0;
    padding-bottom: 6px;
    border-bottom: 1px solid #e2e8f0;
    letter-spacing: -0.01em;
  }
  h3 {
    font-size: 17px;
    font-weight: 600;
    color: #334155;
    margin: 24px 0 8px 0;
  }
  h4 { font-size: 15px; font-weight: 600; color: #475569; margin: 20px 0 6px 0; }
  h5 { font-size: 14px; font-weight: 600; color: #64748b; margin: 16px 0 4px 0; }
  h6 { font-size: 13px; font-weight: 600; color: #64748b; margin: 16px 0 4px 0; }
  p { margin: 0 0 14px 0; }
  strong { font-weight: 600; color: #0f172a; }
  em { font-style: italic; }
  a { color: #2563eb; text-decoration: none; }
  a:hover { text-decoration: underline; }
  code {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    font-size: 12.5px;
    background: #f1f5f9;
    color: #e11d48;
    padding: 2px 6px;
    border-radius: 4px;
  }
  pre {
    background: #0f172a;
    color: #e2e8f0;
    padding: 18px 20px;
    border-radius: 8px;
    margin: 0 0 18px 0;
    overflow-x: auto;
    line-height: 1.6;
  }
  pre code {
    background: none;
    color: inherit;
    padding: 0;
    font-size: 12.5px;
  }
  blockquote {
    border-left: 3px solid #3b82f6;
    background: #f8fafc;
    padding: 12px 18px;
    margin: 0 0 18px 0;
    border-radius: 0 6px 6px 0;
    color: #475569;
    font-style: italic;
  }
  blockquote p { margin: 0; }
  ul, ol {
    padding-left: 24px;
    margin: 0 0 14px 0;
  }
  li { margin: 4px 0; }
  hr {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 28px 0;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 18px 0;
    font-size: 13px;
  }
  th {
    background: #f8fafc;
    font-weight: 600;
    text-align: left;
    padding: 10px 14px;
    border: 1px solid #e2e8f0;
    color: #1e293b;
  }
  td {
    padding: 10px 14px;
    border: 1px solid #e2e8f0;
  }
  tr:nth-child(even) td { background: #fafbfc; }
  img { max-width: 100%; border-radius: 6px; margin: 8px 0; }
</style>
</head>
<body>
${html}
</body>
</html>`;

    try {
      const w = window.open("", "_blank");
      if (w) {
        w.document.write(doc);
        w.document.close();
        w.focus();
        setTimeout(() => w.print(), 500);
      }
    } catch {
      const blob = new Blob([doc], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "document.html";
      a.click();
      URL.revokeObjectURL(url);
    }
  }, [input]);

  const faqItems = t.raw("faq.items") as Array<{ question: string; answer: string }>;
  const exampleItems = t.raw("examples.items") as string[];
  const whenToUseItems = t.raw("whenToUse.items") as string[];

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">{t("title")}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{t("description")}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="mpc-input" className="mb-2 block text-sm font-medium text-foreground">
            {t("inputLabel")}
          </label>
          <textarea
            id="mpc-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("inputPlaceholder")}
            rows={12}
            className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none resize-none"
          />
        </div>

        {preview && (
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              {t("previewLabel")}
            </label>
            <div
              className="rounded-md border border-input bg-white p-6 prose prose-sm max-w-none text-slate-800"
              dangerouslySetInnerHTML={{ __html: preview }}
            />
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleExportPdf}
            disabled={!input.trim()}
            className="inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            <FileDown className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("convertButton")}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            disabled={!preview}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            {copied ? <Check className="h-4 w-4 text-green-600" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? t("successCopy") : t("copy")}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={!input && !preview}
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
