import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { TestDataGeneratorForm } from "@/features/test-data-generator";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "test-data-generator" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TestDataGeneratorPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "test-data-generator" });

  return (
    <>
      <TestDataGeneratorForm />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: t("title"),
            description: t("description"),
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </>
  );
}
