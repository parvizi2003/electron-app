import { useSuspenseQuery } from "@tanstack/react-query";
import { ordersApi } from ".";

export function useOrdersList() {
  const { data: orders, refetch } = useSuspenseQuery({
    ...ordersApi.get(),
  });

  return { orders, refetch };
}
