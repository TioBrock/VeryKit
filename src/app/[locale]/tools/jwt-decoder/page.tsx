import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { JwtDecoderForm } from "@/features/jwt-decoder";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "jwt-decoder" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function JwtDecoderPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "jwt-decoder" });

  return (
    <>
      <JwtDecoderForm />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JWT Decoder",
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
