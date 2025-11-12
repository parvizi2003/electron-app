import { useMutation } from "@tanstack/react-query";
import { cookApi } from ".";
import { toast } from "sonner";
import { queryClient } from "../query-client";

export function useFinishOrder() {
  const finishOrder = useMutation({
    mutationFn: (orderId: number) => cookApi.finishOrder(orderId),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: [cookApi.baseKey] });
    },
    onError: (err) => {
      toast.error(err.message ?? "Ошибка при принятии заказа");
    },
  });

  const handleFinishOrder = (orderId: number) => {
    finishOrder.mutate(orderId);
  };

  return {
    handleFinishOrder,
    isPending: finishOrder.isPending,
  };
}
