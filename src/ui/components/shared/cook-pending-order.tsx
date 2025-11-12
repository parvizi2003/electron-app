import { useAcceptOrder } from "@/api/cook/use-accept-order";
import { useCookOrder } from "@/api/cook/use-get-cook-order";
import { CookOrderCard } from "./cook-order-card";

export function CookPendingOrder() {
  const { order } = useCookOrder();

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
          🔄 Ожидание нового заказа...
        </div>
      )}
    </>
  );
}
