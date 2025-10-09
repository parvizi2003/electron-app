import { queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../api-instance";
import type { Category, Product } from "@/types";

const RESOURCE = "categories";

export const categoriesApi = {
  baseKey: RESOURCE,
  get: () => {
    return queryOptions({
      queryKey: [categoriesApi.baseKey, "list"],
      queryFn: (meta) =>
        jsonApiInstance<Category[]>(`/${RESOURCE}`, {
          signal: meta.signal,
        }),
    });
  },
  show: (categoryId: string) => {
    return queryOptions({
      queryKey: [categoriesApi.baseKey, categoryId, "products"],
      queryFn: (meta) =>
        jsonApiInstance<Product[]>(`/${RESOURCE}/${categoryId}`, {
          signal: meta.signal,
        }),
    });
  },
};
