import { useMutation } from "@tanstack/react-query";
import { ordersApi } from ".";
import { toast } from "sonner";
import { queryClient } from "../query-client";
import { cartApi } from "../cart";

export function useStoreOrder() {
  const storeOrderMutation = useMutation({
    mutationFn: ordersApi.store,
    onSettled: async () => {
      await queryClient.invalidateQueries(cartApi.get());
      queryClient.invalidateQueries(ordersApi.get());
    },
    onSuccess: async (res) => {
      toast.success(res.message);
    },
  });

  const handleStoreOrder = () => {
    storeOrderMutation.mutate();
  };

  return { handleStoreOrder, isPending: storeOrderMutation.isPending };
}
