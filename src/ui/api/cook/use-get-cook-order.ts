import { useSuspenseQuery } from "@tanstack/react-query";
import { cookApi } from ".";

export function useCookOrder() {
  const { data: order, refetch } = useSuspenseQuery({
    ...cookApi.getPendingOrder(),

    // каждые 10 сек, но только если ордера нет
    refetchInterval: (data) => {
      return "id" in data ? false : 10000; // 10000 = 10 сек
    },
  });

  return { order, refetch };
}
