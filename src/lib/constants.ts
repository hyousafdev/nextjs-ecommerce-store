import type { NavLink, SortOption } from "@/types";

export const siteConfig = {
  name: "NextShop",
  description:
    "A demo e-commerce store built with Next.js, TypeScript, Tailwind CSS and Redux Toolkit.",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
];

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];