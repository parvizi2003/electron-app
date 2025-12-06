import { useAddToCart } from "@/api/cart/use-add-to-cart";
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
import { ProductCard } from "../product-card";
import { CartItemWithProduct, Product } from "@/types";
import { IMAGE_URL } from "@/api/api-instance";
import { Minus, Plus } from "lucide-react";
import { useState, useCallback } from "react";
import { Trans, useTranslation } from "react-i18next";

export function ProductModal({ product }: { product: Product }) {
  const { handleAddToCart } = useAddToCart();
  const [count, setCount] = useState(1);
  const { t } = useTranslation();

  const handleAdd = useCallback(() => {
    const newCartItem: CartItemWithProduct = {
      id: Math.random(),
      cart_id: 0,
      product_id: product.id,
      product,
      count,
      total: parseFloat((product.price * count).toFixed(2)),
    };

    handleAddToCart(newCartItem);
    setCount(1);
  }, [product, count, handleAddToCart]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowUp") setCount((prev) => prev + 1);
    if (e.key === "ArrowDown") setCount((prev) => Math.max(1, prev - 1));
    if (e.key === "Enter") handleAdd();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <ProductCard product={product} />
      </DialogTrigger>

      <DialogContent onKeyDown={handleKeyDown} tabIndex={0}>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            <Trans
              i18nKey="cart.add_item.description"
              values={{ product: product.name }}
              components={{ strong: <strong /> }}
            />
          </DialogDescription>
        </DialogHeader>

        <div className="border p-4 flex gap-4 items-center">
          <img
            src={`${IMAGE_URL}/${product.image_url}`}
            alt={product.image_url}
            className="w-20 aspect-square"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-muted-foreground">{product.description}</p>
            <p className="font-bold text-primary">$ {product.price}</p>
          </div>
          <div className="flex gap-2 items-center">
            <Button
              variant={count === 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setCount((prev) => Math.max(1, prev - 1))}
              disabled={count === 1}
            >
              <Minus size={16} />
            </Button>
            <span className="text-xl font-bold">{count}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCount((prev) => prev + 1)}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t("buttons.cancel")}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleAdd}>{t("buttons.add")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
