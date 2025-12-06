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

import { useDeleteItem } from "@/api/cart/delete-item";
import { Trash } from "lucide-react";
import { useTranslation } from "react-i18next";

export function DeleteCartItemConfirm({ cartItemId }: { cartItemId: number }) {
  const { handleDeleteItem, isPending } = useDeleteItem();
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <Trash size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("cart.delete_item.title")}</DialogTitle>
          <DialogDescription>
            {t("cart.delete_item.description")}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t("buttons.cancel")}</Button>
          </DialogClose>
          <Button
            onClick={() => handleDeleteItem(cartItemId)}
            loading={isPending}
            variant="destructive"
          >
            {t("buttons.delete")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
