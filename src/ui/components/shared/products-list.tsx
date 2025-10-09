import { useProductsList } from "@/api/categories/use-products-list";
import { ProductCard } from "@/components/shared";
import { ProductModal } from "./modals/product";

export function ProductsList({ categoryId }: { categoryId: string }) {
  const { products } = useProductsList(categoryId);
  return (
    <div className="flex-1">
      <div className="grid grid-cols-5 gap-4 p-4">
        {products.map((product) => (
          <ProductModal key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
