import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { UrlEncoderForm } from "@/features/url-encoder";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "url-encoder" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function UrlEncoderPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "url-encoder" });

  return (
    <>
      <UrlEncoderForm />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "URL Encode / Decode",
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
