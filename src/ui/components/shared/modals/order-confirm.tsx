import { useStoreOrder } from "@/api/orders/use-store-order";
import { useCart } from "@/api/cart/use-cart";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/";
import { CartItem } from "@/components/shared";
import { useTranslation } from "react-i18next";

export function OrderConfirm() {
  const { handleStoreOrder, isPending } = useStoreOrder();
  const { cart } = useCart();
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-auto w-full font-bold text-xl h-12" size="lg">
          {t("order.checkout")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("order.title")}</DialogTitle>
          <DialogDescription>{t("order.description")}</DialogDescription>
        </DialogHeader>
        <div className="h-[700px] overflow-y-auto border-y">
          {cart.items.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </div>
        <div>
          <h3 className="flex border-b pb-4 text-2xl">
            <span>{t("cart.total")}:</span>
            <span className="flex-1 border-b border-dashed"></span>
            <strong>{cart.total}</strong>
          </h3>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t("buttons.cancel")}</Button>
          </DialogClose>
          <Button onClick={handleStoreOrder} loading={isPending}>
            {t("buttons.checkout")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
