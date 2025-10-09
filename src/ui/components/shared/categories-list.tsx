import { IMAGE_URL } from "@/api/api-instance";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";
import { Link } from "react-router-dom";

interface CategoriesListProps {
  categories: Category[];
  activeCategory: string;
}

export function CategoriesList({
  categories,
  activeCategory,
}: CategoriesListProps) {
  return (
    <ul className="flex w-full gap-x-2 overflow-x-auto border-b p-4">
      {categories.map((category) => (
        <li key={category.id} className="w-full flex-1">
          <Link
            to={`/categories/${category.id}`}
            className={cn(
              "bg-card text-card-foreground flex w-full flex-col items-center gap-2 rounded-sm border p-4 shadow-sm",
              activeCategory === String(category.id) &&
                "bg-primary text-background"
            )}
          >
            <img
              src={IMAGE_URL + category.image_url}
              alt={category.image_url}
              className="size-16"
            />

            <h3 className="font-bold text-nowrap">{category.name}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}
