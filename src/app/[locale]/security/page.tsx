import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "security" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function SecurityPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "security" });

  const reportItems = t.raw("reporting.items") as string[];
  const designItems = t.raw("design.items") as string[];
  const scopeItems = t.raw("scope.items") as string[];

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-12 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-3 text-lg font-semibold text-foreground">{t("reporting.title")}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t("reporting.description")}
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
          {reportItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-3 text-lg font-semibold text-foreground">{t("design.title")}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t("design.description")}
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
          {designItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-3 text-lg font-semibold text-foreground">{t("scope.title")}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t("scope.description")}
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted-foreground">
          {scopeItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
