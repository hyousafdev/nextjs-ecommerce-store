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