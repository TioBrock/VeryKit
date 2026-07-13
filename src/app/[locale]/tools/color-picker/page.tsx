import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ColorPickerForm } from "@/features/color-picker";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "color-picker" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ColorPickerPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "color-picker" });

  return (
    <>
      <ColorPickerForm />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Color Picker & Converter",
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
