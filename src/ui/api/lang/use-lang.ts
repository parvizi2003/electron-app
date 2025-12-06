import { useSuspenseQuery } from "@tanstack/react-query";
import { langApi } from ".";

export function useLang() {
  const { data: lang } = useSuspenseQuery({
    ...langApi.get("ru"),
    staleTime: Infinity,
  });

  return { lang };
}
