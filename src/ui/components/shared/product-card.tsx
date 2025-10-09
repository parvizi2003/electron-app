import type { Product } from "@/types";
import { Card, CardContent } from "@/components/ui";
import { IMAGE_URL } from "@/api/api-instance";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      key={product.id}
      className="hover:bg-primary/5 cursor-pointer p-2 duration-50 hover:scale-101 h-full"
    >
      <CardContent className="flex h-full flex-col p-2">
        <div className="mb-2 aspect-square w-full rounded-md overflow-hidden bg-muted">
          <img
            src={IMAGE_URL + product.image_url}
            alt={IMAGE_URL + product.image_url}
            className="h-full w-full "
          />
        </div>
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <p className="mt-auto text-base font-semibold ">
          $ {product.price.toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
}
