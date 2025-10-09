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

export function ClearCartConfirm() {
  const { handleClearCart, isPending } = useClearCart();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Trash size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Clear cart</DialogTitle>
          <DialogDescription>
            Are you shure you want to clear cart?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleClearCart}
            loading={isPending}
            variant="destructive"
          >
            Clear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
