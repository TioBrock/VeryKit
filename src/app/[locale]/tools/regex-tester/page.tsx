import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { RegexTesterForm } from "@/features/regex-tester";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "regex-tester" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RegexTesterPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "regex-tester" });

  return (
    <>
      <RegexTesterForm />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Regex Tester",
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
