import Link from "next/link";
import { useTranslations } from "next-intl";

type FooterProps = {
  locale: string;
};

export function Footer({ locale }: FooterProps) {
  const t = useTranslations();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="max-w-2xl">{t("footer.description")}</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-4">
          <Link className="rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand-blue" href={`/${locale}`}>
            {t("navigation.home")}
          </Link>
          <Link className="rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand-blue" href={`/${locale}/about`}>
            {t("navigation.about")}
          </Link>
          <Link className="rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand-blue" href={`/${locale}/contributing`}>
            {t("footer.contributing")}
          </Link>
          <Link className="rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand-blue" href={`/${locale}/security`}>
            {t("footer.security")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
