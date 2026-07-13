import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

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
        <h2 className="mb-3 text-lg font-semibold text-foreground">{t("mission.title")}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t("mission.description")}
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-3 text-lg font-semibold text-foreground">{t("privacy.title")}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t("privacy.description")}
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-3 text-lg font-semibold text-foreground">{t("openSource.title")}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t("openSource.description")}
        </p>
      </div>
    </section>
  );
}
