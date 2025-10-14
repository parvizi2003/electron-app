import { useSuspenseQuery } from "@tanstack/react-query";
import { authApi } from ".";
import { ApiError } from "../api-instance";

export function useUser() {
  let user = null;
  let error = null;

  try {
    const { data } = useSuspenseQuery({
      ...authApi.getUser(),
      retry: false,
    });

    user = data;
  } catch (err: any) {
    error = err;
    if (err instanceof ApiError) {
      user = null;
    } else {
      throw err;
    }
  }

  return { user, error };
}
