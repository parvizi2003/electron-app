import { useOrdersList } from "@/api/orders/use-orders-list";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export function OrdersIndex() {
  const { orders } = useOrdersList();

  return (
    <div className="h-full w-full p-4">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Orders</h2>
      <div className="overflow-hidden rounded-sm border">
        <table className="min-w-full divide-y divide-gray-200 border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                User Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Phone Number
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Address
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Total
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-800">{order.id}</td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {order.user_name}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {order.phone_number}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {order.address}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={cn(
                      "inline-block rounded px-2 py-1 text-xs font-medium",
                      {
                        "bg-yellow-100 text-yellow-800":
                          order.status === "PENDING",
                        "bg-green-100 text-green-800":
                          order.status === "COMPLETED",
                        "bg-gray-100 text-gray-800":
                          order.status !== "PENDING" &&
                          order.status !== "COMPLETED",
                      }
                    )}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <Button size="sm" className="my-2" asChild>
                    <Link to={`/orders/${order.id}`}>
                      <Pencil size={12} className="mr-2 stroke-3" />
                      Edit
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
