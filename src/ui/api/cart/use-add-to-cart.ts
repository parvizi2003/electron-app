import { useMutation } from "@tanstack/react-query";
import { cartApi } from ".";
import { queryClient } from "../query-client";

import { toast } from "sonner";

export function useAddToCart() {
  const addToCartMutation = useMutation({
    mutationFn: cartApi.addToCart,

    onMutate: async (newCartItem) => {
      await queryClient.cancelQueries({ queryKey: cartApi.get().queryKey });

      const previousData = queryClient.getQueryData(cartApi.get().queryKey);
      if (!previousData) return { previousData };

      const existingItem = previousData.items.find(
        (item) => item.product_id === newCartItem.product_id
      );

      const copy = { ...newCartItem };

      copy.id = existingItem?.id ?? Math.random();
      copy.cart_id = previousData.id;
      copy.count = existingItem
        ? existingItem.count + newCartItem.count
        : newCartItem.count;
      copy.total = existingItem
        ? parseFloat((existingItem.total + newCartItem.total).toFixed(2))
        : newCartItem.total;

      const updatedItems = existingItem
        ? previousData.items.map((item) =>
            item.product_id === newCartItem.product_id ? newCartItem : item
          )
        : [...previousData.items, newCartItem];

      queryClient.setQueryData(cartApi.get().queryKey, {
        ...previousData,
        items: updatedItems,
        items_count: previousData.items_count + newCartItem.count,
        total: parseFloat((previousData.total + newCartItem.total).toFixed(2)),
      });

      return { previousData };
    },

    onError(_, __, context) {
      queryClient.setQueryData(cartApi.get().queryKey, context?.previousData);
    },

    onSettled() {
      queryClient.invalidateQueries(cartApi.get());
    },

    async onSuccess(res) {
      toast.success(res.message);
    },
  });

  return {
    handleAddToCart: addToCartMutation.mutate,
    isPending: addToCartMutation.isPending,
    isError: addToCartMutation.isError,
  };
}
