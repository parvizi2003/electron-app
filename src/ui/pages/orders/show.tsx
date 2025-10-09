import { useShowOrder } from "@/api/orders/use-show-order";
import { OrderItem } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { useParams } from "react-router-dom";

export function OrdersShow() {
  const { orderId } = useParams<{ orderId: string }>();
  if (!orderId) {
    // Обработка случая, если orderId отсутствует
    return <div>Order ID не найден</div>;
  }

  const { order } = useShowOrder(orderId);

  return (
    <div className="h-full w-full p-4  flex flex-col">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Order: {orderId}
      </h2>
      <div className="grid w-full grid-cols-3 gap-4 h-full  flex-1 ">
        <Card>
          <CardHeader>
            <CardTitle>User Info</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="flex gap-4">
              <span>Name:</span> <strong>{order.user_name}</strong>
            </h3>
            <h3 className="flex gap-4">
              <span>Phone Number:</span> <strong>{order.phone_number}</strong>
            </h3>
            <h3 className="flex gap-4">
              <span>Address:</span> <strong>{order.address}</strong>
            </h3>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Info</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="flex gap-4">
              <span>Items Count:</span> <strong>{order.items_count}</strong>
            </h3>
            <h3 className="flex gap-4">
              <span>Total:</span> <strong>{order.total}</strong>
            </h3>
            <h3 className="flex gap-4">
              <span>Status:</span> <strong>{order.status}</strong>
            </h3>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0 ">
            <div className="overflow-y-auto border-y ">
              {order.items.map((item) => (
                <OrderItem orderItem={item} key={item.id} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
