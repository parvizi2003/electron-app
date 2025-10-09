import { useCart } from "@/api/cart/use-cart";

import { CartItem, CartFooter, ClearCartConfirm } from "@/components/shared";
import { ShoppingCart, Trash } from "lucide-react";
import { Button } from "@/components/ui";

export function Cart() {
  const { cart } = useCart();

  return (
    <div className="bg-sidebar flex h-svh w-[350px] flex-col gap-0 overflow-hidden border-l">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-xl font-bold flex gap-2 items-center text-primary">
          <ShoppingCart /> Cart
        </h2>
        {cart.items.length === 0 ? (
          <Button disabled>
            <Trash size={16} />
          </Button>
        ) : (
          <ClearCartConfirm />
        )}
      </div>

      <div className="h-full flex-1 overflow-x-hidden overflow-y-scroll ">
        {cart.items.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </div>

      {cart.items.length > 0 ? (
        <CartFooter total={cart.total} />
      ) : (
        <div className="flex h-full items-center justify-center">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
        </div>
      )}
    </div>
  );
}

{
}
