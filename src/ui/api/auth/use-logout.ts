import { useMutation } from "@tanstack/react-query";
import { authApi } from ".";
import { queryClient } from "../query-client";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: async (res) => {
      toast.success(res.message);
      await window.electron.deleteToken();
      await queryClient.invalidateQueries(authApi.getUser());
      navigate("/login");
      window.location.reload();
    },
    onError: (err: any) => {
      toast.error(err?.data?.message || "Logout failed");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return {
    handleLogout,
    isPending: logoutMutation.isPending,
    isError: logoutMutation.isError,
  };
}
