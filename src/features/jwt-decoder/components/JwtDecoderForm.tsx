"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { decodeJwt, isJwtExpired, formatJwtDate, type JwtParts } from "@/features/jwt-decoder/utils/decode";

export function JwtDecoderForm() {
  const t = useTranslations("jwt-decoder");
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<JwtParts | null>(null);
  const [expired, setExpired] = useState(false);
  const [error, setError] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleDecode = useCallback(() => {
    if (!token.trim()) return;
    try {
      const parts = decodeJwt(token);
      setDecoded(parts);
      setExpired(isJwtExpired(parts.payload));
      setError(false);
    } catch {
      setError(true);
      setDecoded(null);
    }
  }, [token]);

  const handleCopy = useCallback(async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch { /* ignore */ }
  }, []);

  const handleClear = useCallback(() => {
    setToken("");
    setDecoded(null);
    setError(false);
    setExpired(false);
  }, []);

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
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="jwt-input" className="text-sm font-medium text-foreground">{t("inputLabel")}</label>
          </div>
          <textarea id="jwt-input" value={token} onChange={(e) => { setToken(e.target.value); setDecoded(null); setError(false); }}
            placeholder={t("inputPlaceholder")} rows={4}
            className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none resize-none" />
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={handleDecode} disabled={!token}
            className="inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2">
            Decode
          </button>
          <button type="button" onClick={handleClear} disabled={!token && !decoded}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue">
            <Trash2 className="h-4 w-4" aria-hidden="true" />{t("clear")}
          </button>
        </div>

        {error && <p className="text-sm text-destructive" role="alert">{t("errorInvalid")}</p>}

        {decoded && (
          <div className="flex flex-col gap-4">
            <div className={`rounded-md px-4 py-2 text-sm font-medium ${expired ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"}`}>
              {expired ? t("expired") : t("valid")}
            </div>

            {[
              { label: t("header"), key: "header", data: decoded.header },
              { label: t("payload"), key: "payload", data: decoded.payload },
            ].map(({ label, key, data }) => (
              <div key={key}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{label}</span>
                  <button type="button" onClick={() => handleCopy(JSON.stringify(data, null, 2), key)}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground">
                    {copiedField === key ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                    {copiedField === key ? t("successCopy") : t("copy")}
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs text-foreground">{JSON.stringify(data, null, 2)}</pre>
              </div>
            ))}

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{t("signature")}</span>
                <button type="button" onClick={() => handleCopy(decoded.signature, "sig")}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-accent hover:text-foreground">
                  {copiedField === "sig" ? <Check className="h-3 w-3 text-green-600" /> : <Copy className="h-3 w-3" />}
                  {copiedField === "sig" ? t("successCopy") : t("copy")}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs text-foreground break-all">{decoded.signature}</pre>
            </div>

            {(decoded.payload.iat != null || decoded.payload.exp != null) && (
              <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
                {decoded.payload.iat != null && <p>{t("issuedAt")}: {formatJwtDate(decoded.payload.iat as number)}</p>}
                {decoded.payload.exp != null && <p>{t("expiresAt")}: {formatJwtDate(decoded.payload.exp as number)}</p>}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2"><Lightbulb className="h-5 w-5 text-muted-foreground" /><h2 className="text-lg font-semibold text-foreground">{t("examples.title")}</h2></div>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">{exampleItems.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2"><Wrench className="h-5 w-5 text-muted-foreground" /><h2 className="text-lg font-semibold text-foreground">{t("whenToUse.title")}</h2></div>
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">{whenToUseItems.map((item) => <li key={item}>{item}</li>)}</ul>
      </div>
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2"><HelpCircle className="h-5 w-5 text-muted-foreground" /><h2 className="text-lg font-semibold text-foreground">{t("faq.title")}</h2></div>
        <dl className="space-y-6">{faqItems.map((item) => <div key={item.question}><dt className="text-sm font-medium text-foreground">{item.question}</dt><dd className="mt-1 text-sm text-muted-foreground">{item.answer}</dd></div>)}</dl>
      </div>
    </section>
  );
}
