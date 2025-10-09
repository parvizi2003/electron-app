import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/api/auth/use-user";
import { MainLayout } from "@/layouts/main-layout";

export function AuthRoute() {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
