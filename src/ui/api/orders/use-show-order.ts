import { useSuspenseQuery } from "@tanstack/react-query";
import { ordersApi } from ".";

export function useShowOrder(orderId: string) {
  const { data: order, refetch } = useSuspenseQuery({
    ...ordersApi.show(orderId),
  });

  return { order, refetch };
}
