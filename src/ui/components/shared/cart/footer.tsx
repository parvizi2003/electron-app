import { cn } from "@/lib/utils";

import { OrderConfirm } from "@/components/shared";
import { useTranslation } from "react-i18next";

interface CartFooterProps {
  className?: string;
  total: number;
}

export function CartFooter({ className, total }: CartFooterProps) {
  const { t } = useTranslation();
  return (
    <div className={cn("border-t p-4", className)}>
      <div className="flex w-full flex-col">
        <h3 className="mb-4 flex text-2xl">
          <span>{t("cart.total")}:</span>
          <span className="flex-1 border-b border-dashed" />
          <strong>$ {total}</strong>
        </h3>
        <OrderConfirm />
      </div>
    </div>
  );
}
