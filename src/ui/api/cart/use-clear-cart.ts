import { useMutation } from "@tanstack/react-query";
import { cartApi } from ".";
import { queryClient } from "../query-client";

import { toast } from "sonner";
import type { CartWithItems } from "@/types";

export function useClearCart() {
  const clearCartMutation = useMutation({
    mutationFn: cartApi.clear,

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: cartApi.get().queryKey });

      const previousData = queryClient.getQueryData(cartApi.get().queryKey);

      if (!previousData) {
        return { previousData: undefined };
      }

      const clearedCart: CartWithItems = {
        ...previousData,
        items: [],
        items_count: 0,
        total: 0,
      };

      queryClient.setQueryData(cartApi.get().queryKey, clearedCart);

      return { previousData };
    },

    onError(_, __, context) {
      queryClient.setQueryData(cartApi.get().queryKey, context?.previousData);
    },

    onSettled() {
      queryClient.invalidateQueries({ queryKey: [cartApi.baseKey] });
    },

    async onSuccess(res) {
      toast.success(res.message);
    },
  });

  const handleClearCart = () => {
    clearCartMutation.mutate();
  };

  return {
    handleClearCart,
    isPending: clearCartMutation.isPending,
    isError: clearCartMutation.isError,
  };
}
