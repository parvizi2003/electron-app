import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { OrderWithItems } from "@/types";
import { LoadingButton } from "./loading-button";

interface CookOrderCardProps {
  order: OrderWithItems;
  handleSubmit: (orderId: number) => void;
  isPending: boolean;
  isAcceptedOrder?: boolean;
}

export function CookOrderCard({
  order,
  handleSubmit,
  isPending,
  isAcceptedOrder,
}: CookOrderCardProps) {
  return (
    <Card className="w-full max-w-md  border border-muted-foreground/10">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold">
          🧾 Заказ #{order.id}
        </CardTitle>

        <CardDescription className="text-sm text-primary  mt-2">
          <strong>{order.address ? "С Собой" : "В заведении"}</strong>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-2 font-medium text-muted-foreground">
          🧆 Позиции:
        </div>
        <ul className="flex flex-col gap-3">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border rounded px-3 py-2 bg-muted"
            >
              <span className="font-medium">{item.product_name}</span>
              <span className="text-sm text-muted-foreground">
                x{item.items_count}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex justify-end pt-4">
        <LoadingButton
          text={isAcceptedOrder ? "Завершить заказ" : "Принять заказ"}
          submit={() => handleSubmit(order.id)}
          loading={isPending}
        />
      </CardFooter>
    </Card>
  );
}
