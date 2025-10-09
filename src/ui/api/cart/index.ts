import { queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../api-instance";
import type { CartItemWithProduct, CartWithItems } from "@/types";

const RESOURCE = "carts";

export const cartApi = {
  baseKey: RESOURCE,
  get: () => {
    return queryOptions({
      queryKey: [cartApi.baseKey],
      queryFn: (meta) =>
        jsonApiInstance<CartWithItems>(`/${RESOURCE}`, {
          signal: meta.signal,
        }),
    });
  },

  clear: () => {
    return jsonApiInstance<{ message: string }>(`/${RESOURCE}/clear`, {
      method: "POST",
    });
  },

  addToCart: (cartItem: CartItemWithProduct) => {
    return jsonApiInstance<{ message: string }>(
      `/${RESOURCE}/addToCart/${cartItem.product_id}`,
      {
        json: { count: cartItem.count },
        method: "POST",
      }
    );
  },

  deleteItem: (cartItemId: number) => {
    return jsonApiInstance<{ message: string }>(
      `/${RESOURCE}/items/${cartItemId}`,
      {
        method: "DELETE",
      }
    );
  },
  cartItemAction: ({
    cartItemId,
    action,
  }: {
    cartItemId: number;
    action: "increment" | "decrement";
  }) => {
    return jsonApiInstance<{ message: string }>(
      `/${RESOURCE}/items/${cartItemId}/${action}`,
      {
        method: "POST",
      }
    );
  },
};
