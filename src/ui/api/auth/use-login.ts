import { useMutation } from "@tanstack/react-query";
import { authApi } from ".";
import { queryClient } from "../query-client";
import type { LoginFormValues } from "@/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../api-instance";

export function useLogin() {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (res) => {
      toast.success(res.message);
      await window.electron.setToken("auth", res.token);

      await queryClient.invalidateQueries(authApi.getUser());
      navigate("/");
    },

    onError: (err: any) => {
      if (err instanceof ApiError) {
        toast.error(err.message || "Ошибка авторизации");
      } else {
        toast.error("Неизвестная ошибка");
        console.error(err);
      }
    },
  });

  const handleLogin = (formData: LoginFormValues) => {
    loginMutation.mutate(formData);
  };

  return {
    handleLogin,
    isPending: loginMutation.isPending,
    error: loginMutation.error,
  };
}
