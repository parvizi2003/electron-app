import { queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../api-instance";
import type { Order, OrderWithItems } from "@/types";

const RESOURCE = "orders";

export const ordersApi = {
  baseKey: RESOURCE,
  get: () => {
    return queryOptions({
      queryKey: [ordersApi.baseKey, "list"],
      queryFn: (meta) =>
        jsonApiInstance<Order[]>(`/${RESOURCE}`, {
          signal: meta.signal,
        }),
    });
  },
  show: (orderId: string) => {
    return queryOptions({
      queryKey: [ordersApi.baseKey, "list", orderId],
      queryFn: (meta) =>
        jsonApiInstance<OrderWithItems>(`/${RESOURCE}/${orderId}`, {
          signal: meta.signal,
        }),
    });
  },
  store: () => {
    return jsonApiInstance<{ message: string }>(`/${RESOURCE}/store`, {
      method: "POST",
    });
  },
};
