import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@/api/auth/use-user";
import { MainLayout } from "@/layouts/main-layout";

interface AuthRouteProps {
  allowedRoles?: string[];
}

export function AuthRoute({ allowedRoles }: AuthRouteProps) {
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
