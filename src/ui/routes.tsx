import type { RouteObject } from "react-router-dom";
import { AuthRoute } from "./auth-route";
import { GuestRoute } from "./guest-route";

import { Login, Home, OrdersShow, OrdersIndex } from "./pages";
import ErrorPage from "./pages/error-page";
import { NoAccess } from "./pages/no-access";
import { RoleBasedRouting } from "./role-based-routing";
import { CookIndex } from "./pages/cook";
import { CookOrders } from "./pages/cook/orders";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <GuestRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/no-access",
    element: <NoAccess />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <AuthRoute allowedRoles={["CASHIER", "COOK"]} />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: (
          <RoleBasedRouting
            routes={{ CASHIER: <Home />, COOK: <CookIndex /> }}
          />
        ),
      },

      {
        path: "/categories/:categoryId",
        element: <Home />,
      },
      {
        path: "/orders",
        element: (
          <RoleBasedRouting
            routes={{ COOK: <CookOrders />, CASHIER: <OrdersIndex /> }}
          />
        ),
      },
      {
        path: "/orders/:orderId",
        element: <OrdersShow />,
      },
    ],
  },
];
