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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <Card className="w-full max-w-md  border border-muted-foreground/10">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold">
          🧾 {t("order.number") + " # " + order.id}
        </CardTitle>

        <CardDescription className="text-sm text-primary  mt-2">
          <strong>
            {order.address ? t("order.is_delivery") : t("order.in_store")}
          </strong>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-2 font-medium text-muted-foreground">
          {t("order.positions")}:
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
          text={
            isAcceptedOrder
              ? t("buttons.complete_order")
              : t("buttons.accept_order")
          }
          submit={() => handleSubmit(order.id)}
          loading={isPending}
        />
      </CardFooter>
    </Card>
  );
}
