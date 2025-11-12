import { useSuspenseQuery } from "@tanstack/react-query";
import { cookApi } from ".";

export function useCookAcceptedOrder() {
  const { data: order, refetch } = useSuspenseQuery({
    ...cookApi.acceptedOrder(),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return { order, refetch };
}
