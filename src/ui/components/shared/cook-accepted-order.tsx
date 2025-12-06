import { useFinishOrder } from "@/api/cook/use-finish-order";
import { CookOrderCard } from "./cook-order-card";
import { OrderWithItems } from "@/types";
import { useTranslation } from "react-i18next";

export function CookAcceptedOrder({ order }: { order: OrderWithItems }) {
  const { handleFinishOrder, isPending } = useFinishOrder();
  const { t } = useTranslation();
  return (
    <>
      {"id" in order ? (
        <CookOrderCard
          order={order}
          handleSubmit={handleFinishOrder}
          isPending={isPending}
          isAcceptedOrder
        />
      ) : (
        <div className="text-muted-foreground text-lg animate-pulse">
          {t("order.waiting")}
        </div>
      )}
    </>
  );
}
