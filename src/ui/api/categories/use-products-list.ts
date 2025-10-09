import { categoriesApi } from "@/api/categories";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useProductsList(categoryId: string) {
  const { data: products, refetch } = useSuspenseQuery({
    ...categoriesApi.show(categoryId),
  });

  return { products, refetch };
}
