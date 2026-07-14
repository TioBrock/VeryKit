"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { toolsCatalog } from "@/lib/tools-catalog";
import { Breadcrumb } from "./breadcrumb";

export function ToolsBreadcrumb() {
  const locale = useLocale();
  const t = useTranslations("navigation");
  const pathname = usePathname();

  const toolHref = pathname.replace(`/${locale}`, "");
  const tool = toolsCatalog.find((t) => t.href === toolHref);

  const toolName = tool ? tool.name : t("tools");

  const items = [{ label: t("tools") }, { label: toolName }];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-6 sm:px-6 lg:px-8">
      <Breadcrumb items={items} />
    </div>
  );
}
