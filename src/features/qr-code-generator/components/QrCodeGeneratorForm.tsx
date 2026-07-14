"use client";

import { useState, useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench } from "lucide-react";

import { generateQrCode, buildPixPayload } from "@/features/qr-code-generator/utils/generate";

export function QrCodeGeneratorForm() {
  const t = useTranslations("qr-code-generator");
  const [mode, setMode] = useState<"text" | "pix">("text");
  const [input, setInput] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [pixCity, setPixCity] = useState("");
  const [pixAmount, setPixAmount] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [pixPayload, setPixPayload] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [error, setError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGenerate = useCallback(async () => {
    try {
      let payload: string;
      if (mode === "pix") {
        if (!pixKey.trim() || !receiverName.trim() || !pixCity.trim()) {
          setError(true);
          setQrDataUrl("");
          return;
        }
        payload = buildPixPayload({
          pixKey: pixKey.trim(),
          receiverName: receiverName.trim(),
          city: pixCity.trim(),
          amount: pixAmount.trim() || undefined,
        });
      } else {
        if (!input.trim()) {
          setError(true);
          setQrDataUrl("");
          return;
        }
        payload = input;
      }
      const url = await generateQrCode(payload);
      setQrDataUrl(url);
      setPixPayload(mode === "pix" ? payload : "");
      setError(false);
      setCopied(false);
      setCopyError(false);
    } catch {
      setError(true);
      setQrDataUrl("");
    }
  }, [mode, input, pixKey, receiverName, pixCity, pixAmount]);

  const handleDownload = useCallback(() => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrDataUrl;
    link.click();
  }, [qrDataUrl]);

  const handleCopy = useCallback(async () => {
    if (!qrDataUrl) return;
    try {
      await navigator.clipboard.writeText(qrDataUrl);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [qrDataUrl]);

  const handleClear = useCallback(() => {
    setInput("");
    setPixKey("");
    setReceiverName("");
    setPixCity("");
    setPixAmount("");
    setQrDataUrl("");
    setPixPayload("");
    setCopied(false);
    setCopyError(false);
    setError(false);
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
        {/* Mode tabs */}
        <div className="flex gap-1 rounded-md border border-border bg-muted p-1">
          <button
            type="button"
            onClick={() => { setMode("text"); setQrDataUrl(""); setError(false); }}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              mode === "text" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("textTab")}
          </button>
          <button
            type="button"
            onClick={() => { setMode("pix"); setQrDataUrl(""); setError(false); }}
            className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              mode === "pix" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("pixTab")}
          </button>
        </div>

        {mode === "text" ? (
          <div>
            <label htmlFor="qr-input" className="mb-2 block text-sm font-medium text-foreground">
              {t("inputLabel")}
            </label>
            <input
              id="qr-input"
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder={t("inputPlaceholder")}
              className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 text-sm text-foreground outline-none"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="pix-key" className="mb-2 block text-sm font-medium text-foreground">
                {t("pixKeyLabel")} *
              </label>
              <input
                id="pix-key"
                type="text"
                value={pixKey}
                onChange={(e) => { setPixKey(e.target.value); setError(false); }}
                placeholder={t("pixKeyPlaceholder")}
                className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 text-sm text-foreground outline-none"
              />
            </div>
            <div>
              <label htmlFor="pix-name" className="mb-2 block text-sm font-medium text-foreground">
                {t("pixNameLabel")} *
              </label>
              <input
                id="pix-name"
                type="text"
                value={receiverName}
                onChange={(e) => { setReceiverName(e.target.value); setError(false); }}
                placeholder={t("pixNamePlaceholder")}
                className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 text-sm text-foreground outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pix-city" className="mb-2 block text-sm font-medium text-foreground">
                  {t("pixCityLabel")} *
                </label>
                <input
                  id="pix-city"
                  type="text"
                  value={pixCity}
                  onChange={(e) => { setPixCity(e.target.value); setError(false); }}
                  placeholder={t("pixCityPlaceholder")}
                  className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 text-sm text-foreground outline-none"
                />
              </div>
              <div>
                <label htmlFor="pix-amount" className="mb-2 block text-sm font-medium text-foreground">
                  {t("pixAmountLabel")}
                </label>
                <input
                  id="pix-amount"
                  type="text"
                  value={pixAmount}
                  onChange={(e) => { setPixAmount(e.target.value); setError(false); }}
                  placeholder={t("pixAmountPlaceholder")}
                  className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 text-sm text-foreground outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {mode === "pix" ? t("errorPixEmpty") : t("errorEmpty")}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            {t("generate")}
          </button>
        </div>

        {qrDataUrl && (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-6">
            <div className="rounded-lg bg-white p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrDataUrl} alt="QR Code" width={256} height={256} />
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-brand-blue px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
              >
                {t("download")}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              >
                {copied ? <Check className="h-4 w-4 text-green-600" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                {copied ? t("successCopy") : t("copy")}
              </button>
            </div>
            {mode === "pix" && pixPayload && (
              <div className="w-full">
                <label className="mb-2 block text-sm font-medium text-foreground">{t("pixPayloadLabel")}</label>
                <textarea
                  readOnly
                  value={pixPayload}
                  rows={3}
                  className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-xs text-foreground outline-none resize-none"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClear}
            disabled={!input && !qrDataUrl && !pixKey && !receiverName && !pixCity && !pixAmount}
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
