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

import { useClearCart } from "@/api/cart/use-clear-cart";
import { Trash } from "lucide-react";
import { useTranslation } from "react-i18next";

export function ClearCartConfirm() {
  const { handleClearCart, isPending } = useClearCart();
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Trash size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("cart.clear.title")}</DialogTitle>
          <DialogDescription>{t("cart.clear.description")}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t("buttons.cancel")}</Button>
          </DialogClose>
          <Button
            onClick={handleClearCart}
            loading={isPending}
            variant="destructive"
          >
            {t("buttons.clear")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
