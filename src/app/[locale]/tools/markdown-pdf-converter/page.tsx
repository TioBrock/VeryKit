import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { MarkdownPdfConverterForm } from "@/features/markdown-pdf-converter";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "markdown-pdf-converter" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function MarkdownPdfConverterPage() {
  return <MarkdownPdfConverterForm />;
}
