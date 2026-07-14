"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Copy, Trash2, Check, HelpCircle, Lightbulb, Wrench, Plus } from "lucide-react";

import { buildGherkin, type GherkinStep } from "@/features/bdd-gherkin-builder/utils/build";

export function BddGherkinBuilderForm() {
  const t = useTranslations("bdd-gherkin-builder");
  const [feature, setFeature] = useState("");
  const [scenario, setScenario] = useState("");
  const [steps, setSteps] = useState<GherkinStep[]>([
    { type: "Given", text: "" },
  ]);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const addStep = useCallback(() => {
    setSteps((prev) => [...prev, { type: "And", text: "" }]);
  }, []);

  const removeStep = useCallback((index: number) => {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateStep = useCallback((index: number, field: keyof GherkinStep, value: string) => {
    setSteps((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  }, []);

  const handleBuild = useCallback(() => {
    const output = buildGherkin({ feature, scenario, steps });
    setResult(output);
    setCopied(false);
    setCopyError(false);
  }, [feature, scenario, steps]);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  }, [result]);

  const handleClear = useCallback(() => {
    setFeature("");
    setScenario("");
    setSteps([{ type: "Given", text: "" }]);
    setResult("");
    setCopied(false);
    setCopyError(false);
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
          <label htmlFor="bdd-feature" className="mb-2 block text-sm font-medium text-foreground">{t("featureName")}</label>
          <input
            id="bdd-feature"
            type="text"
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            placeholder="User Login"
            className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 text-sm text-foreground outline-none"
          />
        </div>

        <div>
          <label htmlFor="bdd-scenario" className="mb-2 block text-sm font-medium text-foreground">{t("scenarioName")}</label>
          <input
            id="bdd-scenario"
            type="text"
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="Successful login with valid credentials"
            className="h-12 w-full rounded-md border border-input bg-muted/50 px-4 text-sm text-foreground outline-none"
          />
        </div>

        {/* Steps */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">{t("stepType")}</label>
            <button
              type="button"
              onClick={addStep}
              className="inline-flex h-8 items-center gap-1 rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-accent"
            >
              <Plus className="h-3 w-3" aria-hidden="true" />
              {t("addStep")}
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-2">
                <select
                  value={step.type}
                  onChange={(e) => updateStep(i, "type", e.target.value)}
                  className="h-10 w-28 rounded-md border border-input bg-background px-2 text-sm text-foreground outline-none"
                >
                  <option value="Given">{t("given")}</option>
                  <option value="When">{t("when")}</option>
                  <option value="Then">{t("then")}</option>
                  <option value="And">{t("and")}</option>
                </select>
                <input
                  type="text"
                  value={step.text}
                  onChange={(e) => updateStep(i, "text", e.target.value)}
                  placeholder={t("stepText")}
                  className="h-10 flex-1 rounded-md border border-input bg-muted/50 px-3 text-sm text-foreground outline-none"
                />
                <button
                  type="button"
                  onClick={() => removeStep(i)}
                  disabled={steps.length <= 1}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleBuild}
            disabled={!feature || !scenario}
            className="inline-flex h-12 items-center justify-center rounded-md bg-brand-blue px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-blue/90 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
          >
            {t("generate")}
          </button>
        </div>

        {result && (
          <div>
            <label htmlFor="bdd-result" className="mb-2 block text-sm font-medium text-foreground">{t("resultLabel")}</label>
            <textarea
              id="bdd-result"
              readOnly
              value={result}
              rows={10}
              className="w-full rounded-md border border-input bg-muted/50 px-4 py-3 font-mono text-sm text-foreground outline-none resize-none"
            />
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!result}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
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
