import { useAcceptOrder } from "@/api/cook/use-accept-order";
import { useCookOrder } from "@/api/cook/use-get-cook-order";
import { CookOrderCard } from "./cook-order-card";
import { useTranslation } from "react-i18next";

export function CookPendingOrder() {
  const { order } = useCookOrder();
  const { t } = useTranslation();
  const { handleAcceptOrder, isPending } = useAcceptOrder();

  return (
    <>
      {"id" in order ? (
        <CookOrderCard
          order={order}
          handleSubmit={handleAcceptOrder}
          isPending={isPending}
        />
      ) : (
        <div className="text-muted-foreground text-lg animate-pulse">
          {t("order.waiting")}
        </div>
      )}
    </>
  );
}
