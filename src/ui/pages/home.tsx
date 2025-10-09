import { useCategoriesList } from "@/api/categories/use-categories-list";
import { CategoriesList, ProductsList, Cart } from "@/components/shared";
import { useParams } from "react-router-dom";

export function Home() {
  const { categories } = useCategoriesList();
  const { categoryId } = useParams();

  const activeCategory = categoryId ?? String(categories[0].id);
  return (
    <>
      <div className="max-h-full flex-1 overflow-y-scroll">
        <CategoriesList
          categories={categories}
          activeCategory={activeCategory}
        />
        <ProductsList categoryId={activeCategory} />
      </div>

      <Cart />
    </>
  );
}
