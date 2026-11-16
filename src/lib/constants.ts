import type { NavLink } from "@/types";

export const siteConfig = {
  name: "NextShop",
  description:
    "A demo e-commerce store built with Next.js, TypeScript, Tailwind CSS and Redux Toolkit.",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Cart", href: "/cart" },
];