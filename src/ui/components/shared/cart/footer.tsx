import { cn } from "@/lib/utils";

import { OrderConfirm } from "@/components/shared";

interface CartFooterProps {
  className?: string;
  total: number;
}

export function CartFooter({ className, total }: CartFooterProps) {
  return (
    <div className={cn("border-t p-4", className)}>
      <div className="flex w-full flex-col">
        <h3 className="mb-4 flex text-2xl">
          <span>Total:</span>
          <span className="flex-1 border-b border-dashed" />
          <strong>$ {total}</strong>
        </h3>
        <OrderConfirm />
      </div>
    </div>
  );
}
