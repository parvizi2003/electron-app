import { useMutation } from "@tanstack/react-query";
import { authApi } from ".";
import { queryClient } from "../query-client";
import type { LoginFormValues } from "@/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (res) => {
      toast.success(res.message);
      await window.electron.setToken(res.token);

      await queryClient.invalidateQueries(authApi.getUser());
      navigate("/");
    },
    onError: (err: any) => {
      toast.error(err?.data?.message || "Ошибка авторизации");
    },
  });

  const handleLogin = (formData: LoginFormValues) => {
    loginMutation.mutate(formData);
  };

  return {
    handleLogin,
    isPending: loginMutation.isPending,
    isError: loginMutation.isError,
    isSuccess: loginMutation.isSuccess,
  };
}
