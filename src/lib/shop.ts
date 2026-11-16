import type { Product, ProductCategory, SortOption } from "@/types";
import { sortOptions } from "@/lib/constants";
import { categories, getAllProducts } from "@/lib/products";

export type ShopFilters = {
  q: string;
  category: ProductCategory | "";
  sort: SortOption;
};

type RawSearchParams = Record<string, string | string[] | undefined>;

function toSingle(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

export function parseShopFilters(params: RawSearchParams): ShopFilters {
  const q = toSingle(params.q).trim();
  const categoryParam = toSingle(params.category);
  const sortParam = toSingle(params.sort);

  const category = categories.find((item) => item === categoryParam) ?? "";
  const sort =
    sortOptions.find((option) => option.value === sortParam)?.value ??
    "newest";

  return { q, category, sort };
}

export function getFilteredProducts(filters: ShopFilters): Product[] {
  const query = filters.q.toLowerCase();

  const filtered = getAllProducts().filter((product) => {
    const matchesQuery =
      query === "" ||
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);
    const matchesCategory =
      filters.category === "" || product.category === filters.category;

    return matchesQuery && matchesCategory;
  });

  return [...filtered].sort((a, b) => {
    switch (filters.sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return a.createdAt < b.createdAt ? 1 : -1;
    }
  });
}