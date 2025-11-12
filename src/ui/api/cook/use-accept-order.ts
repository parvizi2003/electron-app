import { useMutation } from "@tanstack/react-query";
import { cookApi } from ".";
import { toast } from "sonner";
import { queryClient } from "../query-client";

export function useAcceptOrder() {
  const acceptOrder = useMutation({
    mutationFn: (orderId: number) => cookApi.acceptOrder(orderId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [cookApi.baseKey] });
    },
    onError: (err) => {
      toast.error(err.message ?? "Ошибка при принятии заказа");
    },
  });

  const handleAcceptOrder = (orderId: number) => {
    acceptOrder.mutate(orderId);
  };

  return {
    handleAcceptOrder,
    isPending: acceptOrder.isPending,
  };
}
