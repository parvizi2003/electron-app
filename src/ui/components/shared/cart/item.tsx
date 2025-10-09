import { UseCartItemAction } from "@/api/cart/use-cart-item-action";
import { CartItemWithProduct } from "@/types";
import { Button } from "@/components/ui";
import { Minus, Plus } from "lucide-react";
import { DeleteCartItemConfirm } from "@/components/shared";
import { IMAGE_URL } from "@/api/api-instance";

export function CartItem({ cartItem }: { cartItem: CartItemWithProduct }) {
  const { handleAddToCart, isPending: actionIsPending } = UseCartItemAction();

  return (
    <div className="relative flex items-center gap-x-4 border-b py-4 last:border-b-0 mx-4">
      {/* <div className="absolute top-0 right-0 bottom-0 left-0"></div> */}
      <img
        src={`${IMAGE_URL}/${cartItem.product.image_url}`}
        className="size-12"
      />
      <div>
        <h3 className="mb-2 font-bold">{cartItem.product.name}</h3>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-2">
            <Button
              size="sm"
              variant="outline"
              className="p-2"
              onClick={() => handleAddToCart(cartItem.id, "decrement")}
              loading={actionIsPending}
            >
              <Minus size={16} />
            </Button>

            <span className="font-bold">{cartItem.count}</span>

            <Button
              size="sm"
              variant="outline"
              className="p-2"
              onClick={() => handleAddToCart(cartItem.id, "increment")}
              loading={actionIsPending}
            >
              <Plus size={16} />
            </Button>
          </div>
          <span> $ {cartItem.product.price}</span>
        </div>
      </div>

      <div className="ml-auto">
        <DeleteCartItemConfirm cartItemId={cartItem.id} />
      </div>
    </div>
  );
}
