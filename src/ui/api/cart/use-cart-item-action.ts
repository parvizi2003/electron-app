import { useMutation } from "@tanstack/react-query";
import { cartApi } from ".";
import { queryClient } from "../query-client";

import { toast } from "sonner";

export function UseCartItemAction() {
  const addToCartMutation = useMutation({
    mutationFn: cartApi.cartItemAction,
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: [cartApi.baseKey] });
    },
    async onSuccess(res) {
      const data = res;
      toast.success(data.message);
    },
  });

  const handleAddToCart = (
    cartItemId: number,
    action: "increment" | "decrement",
  ) => {
    addToCartMutation.mutate({ cartItemId, action });
  };

  return {
    handleAddToCart,
    isPending: addToCartMutation.isPending,
    isError: addToCartMutation.isError,
  };
}
