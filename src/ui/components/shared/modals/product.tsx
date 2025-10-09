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
import { useEffect, useState } from "react";

export function ProductModal({ product }: { product: Product }) {
  const { handleAddToCart } = useAddToCart();
  const [count, setCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const handleCountChange = (action: "increment" | "decrement") => {
    setCount((prev) => {
      return action === "increment" ? prev + 1 : Math.max(1, prev - 1);
    });
  };

  const handleAdd = () => {
    const newCartItem: CartItemWithProduct = {
      id: Math.random(),
      cart_id: 0,
      product_id: product.id,
      product: product,
      count: count,
      total: parseFloat((product.price * count).toFixed(2)),
    };

    handleAddToCart(newCartItem);
    setCount(1);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        handleCountChange("increment");
      } else if (e.key === "ArrowDown") {
        handleCountChange("decrement");
      } else if (e.key === "Enter") {
        handleAdd();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, count]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setCount(1);
      }}
    >
      <DialogTrigger>
        <ProductCard product={product} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            Do you really want to add <strong>{product.name}</strong> to cart?
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
              onClick={() => handleCountChange("decrement")}
              disabled={count === 1}
            >
              <Minus size={16} />
            </Button>
            <span className="text-xl font-bold">{count}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCountChange("increment")}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button onClick={handleAdd}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
