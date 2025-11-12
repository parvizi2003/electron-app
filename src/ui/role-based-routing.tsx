import { Navigate } from "react-router-dom";
import { useUser } from "./api/auth/use-user";

interface RoleBasedRoutingProps {
  routes: {
    CASHIER?: React.ReactNode;
    COOK?: React.ReactNode;
  };
}

export function RoleBasedRouting({ routes }: RoleBasedRoutingProps) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  console.log(user.role);
  if (routes[user.role]) {
    return <>{routes[user.role]}</>;
  }

  return <Navigate to="/no-access" replace />;
}
