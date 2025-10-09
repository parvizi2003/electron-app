import { cartApi } from "./index";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useCart() {
  const { data: cart, refetch } = useSuspenseQuery({
    ...cartApi.get(),
  });

  return { cart, refetch };
}
