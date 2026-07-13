import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { JsonCompareForm } from "@/features/json-compare";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "json-compare" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function JsonComparePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "json-compare" });

  return (
    <>
      <JsonCompareForm />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JSON Compare",
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
