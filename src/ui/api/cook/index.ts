import { queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../api-instance";
import type { OrderWithItems } from "@/types";

const RESOURCE = "/cook";

export const cookApi = {
  baseKey: RESOURCE,
  orders: () => {
    return queryOptions({
      queryKey: [cookApi.baseKey, "orders"],
      queryFn: (meta) =>
        jsonApiInstance<OrderWithItems[]>(`${RESOURCE}/orders`, {
          signal: meta.signal,
        }),
    });
  },

  getPendingOrder: () => {
    return queryOptions({
      queryKey: [cookApi.baseKey, "order"],
      queryFn: (meta) =>
        jsonApiInstance<OrderWithItems | { message: string }>(
          `${RESOURCE}/orders/pending`,
          {
            signal: meta.signal,
          }
        ),
    });
  },

  acceptedOrder: () => {
    return queryOptions({
      queryKey: [cookApi.baseKey, "accepted-order"],
      queryFn: (meta) =>
        jsonApiInstance<OrderWithItems | { message: string }>(
          `${RESOURCE}/orders/accepted`,
          {
            signal: meta.signal,
          }
        ),
    });
  },

  acceptOrder: (orderId: number) => {
    return jsonApiInstance<{ message: string }>(
      `${RESOURCE}/orders/${orderId}/accept`,
      {
        method: "POST",
      }
    );
  },
  finishOrder: (orderId: number) => {
    return jsonApiInstance<{ message: string }>(
      `${RESOURCE}/orders/${orderId}/finish`,
      {
        method: "POST",
      }
    );
  },
};
