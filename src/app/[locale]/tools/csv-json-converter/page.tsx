import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CsvJsonConverterForm } from "@/features/csv-json-converter";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "csv-json-converter" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CsvJsonConverterPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "csv-json-converter" });

  return (
    <>
      <CsvJsonConverterForm />
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
