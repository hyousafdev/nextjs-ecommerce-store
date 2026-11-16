export type NavLink = {
  label: string;
  href: string;
};

export type ProductCategory =
  | "Electronics"
  | "Clothing"
  | "Home"
  | "Accessories";

export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  rating: number;
  stock: number;
  createdAt: string;
};

export type SortOption = "newest" | "price-asc" | "price-desc" | "rating";

export type CartItem = Pick<
  Product,
  "id" | "slug" | "name" | "price" | "image" | "stock"
> & {
  quantity: number;
};