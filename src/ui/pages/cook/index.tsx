import { useCookAcceptedOrder } from "@/api/cook/use-cook-accepted-order";
import { CookOrderCard, CookPendingOrder } from "@/components/shared";
import { CookAcceptedOrder } from "@/components/shared/cook-accepted-order";

export function CookIndex() {
  const { order } = useCookAcceptedOrder();
  return (
    <div className="h-full w-full p-6 flex flex-col items-center justify-center bg-muted/40">
      {"id" in order ? (
        <CookAcceptedOrder order={order} />
      ) : (
        <CookPendingOrder />
      )}
    </div>
  );
}
