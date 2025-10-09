import type { PropsWithChildren } from "react";

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full flex min-h-svh items-center justify-center gap-6 p-6">
      {children}
    </div>
  );
}
