import type { RouteObject } from "react-router-dom";
import { AuthRoute } from "./auth-route";
import { GuestRoute } from "./guest-route";

import { Login, Home, OrdersShow, OrdersIndex } from "./pages";
import ErrorPage from "./pages/error-page";

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
    path: "/",
    element: <AuthRoute />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/categories/:categoryId",
        element: <Home />,
      },
      {
        path: "/orders",
        element: <OrdersIndex />,
      },
      {
        path: "/orders/:orderId",
        element: <OrdersShow />,
      },
    ],
  },
];
