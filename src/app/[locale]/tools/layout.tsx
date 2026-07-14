import { ToolsBreadcrumb } from "@/components/navigation/tools-breadcrumb";

export default function ToolsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <ToolsBreadcrumb />
      {children}
    </div>
  );
}
