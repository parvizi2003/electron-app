import { categoriesApi } from "@/api/categories";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useCategoriesList() {
  const { data: categories, refetch } = useSuspenseQuery({
    ...categoriesApi.get(),
  });

  return { categories, refetch };
}
