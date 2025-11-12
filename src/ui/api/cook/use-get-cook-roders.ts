import { useSuspenseQuery } from "@tanstack/react-query";
import { cookApi } from ".";

export function useGetCookOrders() {
  const { data: orders, refetch } = useSuspenseQuery({
    ...cookApi.orders(),
  });

  return { orders, refetch };
}
