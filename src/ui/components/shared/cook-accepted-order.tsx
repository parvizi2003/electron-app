import { useFinishOrder } from "@/api/cook/use-finish-order";
import { CookOrderCard } from "./cook-order-card";
import { OrderWithItems } from "@/types";

export function CookAcceptedOrder({ order }: { order: OrderWithItems }) {
  const { handleFinishOrder, isPending } = useFinishOrder();
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
          🔄 Ожидание нового заказа...
        </div>
      )}
    </>
  );
}
