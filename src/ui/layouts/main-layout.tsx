import { AppSidebar } from "@/components/shared";
import type { PropsWithChildren } from "react";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-full">
      <AppSidebar />
      <div className="flex h-full flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
