import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contributing" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContributingPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contributing" });

  const reportItems = t.raw("reporting.items") as string[];
  const codeItems = t.raw("code.items") as string[];

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
        <h2 className="mb-3 text-lg font-semibold text-foreground">{t("code.title")}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t("code.description")}
        </p>
        <ol className="mt-3 list-inside list-decimal space-y-1 text-sm text-muted-foreground">
          {codeItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-3 text-lg font-semibold text-foreground">{t("setup.title")}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t("setup.description")}
        </p>
        <pre className="mt-3 overflow-x-auto rounded-md bg-muted p-4 font-mono text-xs text-foreground">
          {t("setup.command")}
        </pre>
      </div>
    </section>
  );
}
