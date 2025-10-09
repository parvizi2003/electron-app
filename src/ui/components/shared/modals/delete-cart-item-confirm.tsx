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

export function DeleteCartItemConfirm({ cartItemId }: { cartItemId: number }) {
  const { handleDeleteItem, isPending } = useDeleteItem();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <Trash size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete cart Item</DialogTitle>
          <DialogDescription>
            Are you shure you want to delete this cart item?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={() => handleDeleteItem(cartItemId)}
            loading={isPending}
            variant="destructive"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
