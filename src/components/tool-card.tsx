"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import type { ToolEntry } from "@/lib/tools-catalog";

type ToolCardProps = {
  tool: ToolEntry;
};

export function ToolCard({ tool }: ToolCardProps) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <Link
      href={`/${locale}${tool.href}`}
      className="group flex flex-col gap-3 rounded-lg border border-border bg-card p-5 shadow-sm transition-colors hover:border-brand-blue/30 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
          <tool.icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">{t(tool.nameKey)}</h3>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">
        {t(tool.descriptionKey)}
      </p>
    </Link>
  );
}
