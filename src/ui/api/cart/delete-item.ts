import { useMutation } from "@tanstack/react-query";
import { cartApi } from ".";
import { queryClient } from "../query-client";

import { toast } from "sonner";

export function useDeleteItem() {
  const addToCartMutation = useMutation({
    mutationFn: cartApi.deleteItem,

    onSettled() {
      queryClient.invalidateQueries({ queryKey: [cartApi.baseKey] });
    },

    onSuccess(res, deletedId) {
      const data = res;
      toast.success(data.message);

      const cart = queryClient.getQueryData(cartApi.get().queryKey);
      if (cart) {
        const deletedItem = cart.items.find((item) => item.id === deletedId);

        if (deletedItem) {
          const updatedCart = {
            ...cart,
            items: cart.items.filter((item) => item.id !== deletedId),
            total: parseFloat((cart.total - deletedItem.total).toFixed(2)),
            items_count: Math.max(0, cart.items_count - deletedItem.count),
          };

          queryClient.setQueryData(cartApi.get().queryKey, updatedCart);
        }
      }
    },
  });

  return {
    handleDeleteItem: addToCartMutation.mutate,
    isPending: addToCartMutation.isPending,
    isError: addToCartMutation.isError,
  };
}
