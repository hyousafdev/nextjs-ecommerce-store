import type { Product, ProductCategory } from "@/types";

const image = (seed: string) => `https://picsum.photos/seed/${seed}/600/600`;

export const categories: ProductCategory[] = [
  "Electronics",
  "Clothing",
  "Home",
  "Accessories",
];

const products: Product[] = [
  {
    id: 1,
    slug: "wireless-headphones",
    name: "Wireless Headphones",
    description:
      "Over-ear Bluetooth headphones with deep bass, noise isolation and up to 30 hours of battery life.",
    price: 89.99,
    category: "Electronics",
    image: image("wireless-headphones"),
    rating: 4.6,
    stock: 18,
    createdAt: "2026-10-01",
  },
  {
    id: 2,
    slug: "smart-watch",
    name: "Smart Watch",
    description:
      "Track your steps, heart rate and sleep, and get phone notifications right on your wrist.",
    price: 129,
    category: "Electronics",
    image: image("smart-watch"),
    rating: 4.4,
    stock: 9,
    createdAt: "2026-10-12",
  },
  {
    id: 3,
    slug: "portable-speaker",
    name: "Portable Speaker",
    description:
      "A compact water-resistant speaker with clear sound for the beach, the park or your desk.",
    price: 49.5,
    category: "Electronics",
    image: image("portable-speaker"),
    rating: 4.2,
    stock: 25,
    createdAt: "2026-09-20",
  },
  {
    id: 4,
    slug: "classic-cotton-t-shirt",
    name: "Classic Cotton T-Shirt",
    description:
      "A soft everyday t-shirt made from 100% cotton with a relaxed fit.",
    price: 24.99,
    category: "Clothing",
    image: image("classic-cotton-t-shirt"),
    rating: 4.3,
    stock: 60,
    createdAt: "2026-09-05",
  },
  {
    id: 5,
    slug: "denim-jacket",
    name: "Denim Jacket",
    description:
      "A timeless denim jacket with sturdy stitching that goes with almost everything.",
    price: 79,
    category: "Clothing",
    image: image("denim-jacket"),
    rating: 4.7,
    stock: 14,
    createdAt: "2026-10-25",
  },
  {
    id: 6,
    slug: "running-shoes",
    name: "Running Shoes",
    description:
      "Lightweight running shoes with a cushioned sole and a breathable mesh upper.",
    price: 64.95,
    category: "Clothing",
    image: image("running-shoes"),
    rating: 4.5,
    stock: 22,
    createdAt: "2026-11-02",
  },
  {
    id: 7,
    slug: "ceramic-coffee-mug",
    name: "Ceramic Coffee Mug",
    description:
      "A handmade-style ceramic mug that keeps your coffee warm and looks good doing it.",
    price: 12.5,
    category: "Home",
    image: image("ceramic-coffee-mug"),
    rating: 4.1,
    stock: 80,
    createdAt: "2026-08-15",
  },
  {
    id: 8,
    slug: "table-lamp",
    name: "Table Lamp",
    description:
      "A modern table lamp with a warm glow, ideal for your desk or bedside.",
    price: 39.99,
    category: "Home",
    image: image("table-lamp"),
    rating: 4.4,
    stock: 31,
    createdAt: "2026-09-28",
  },
  {
    id: 9,
    slug: "throw-blanket",
    name: "Throw Blanket",
    description:
      "A cozy woven blanket for the sofa or bed, soft on the skin and easy to wash.",
    price: 34,
    category: "Home",
    image: image("throw-blanket"),
    rating: 4.8,
    stock: 12,
    createdAt: "2026-10-18",
  },
  {
    id: 10,
    slug: "leather-wallet",
    name: "Leather Wallet",
    description:
      "A slim leather wallet with card slots and a coin pocket that fits easily in your pocket.",
    price: 29.99,
    category: "Accessories",
    image: image("leather-wallet"),
    rating: 4.3,
    stock: 40,
    createdAt: "2026-07-30",
  },
  {
    id: 11,
    slug: "canvas-backpack",
    name: "Canvas Backpack",
    description:
      "A durable canvas backpack with a padded laptop sleeve and plenty of room for daily use.",
    price: 54,
    category: "Accessories",
    image: image("canvas-backpack"),
    rating: 4.6,
    stock: 17,
    createdAt: "2026-11-08",
  },
  {
    id: 12,
    slug: "sunglasses",
    name: "Sunglasses",
    description:
      "UV-protected sunglasses with a lightweight frame for sunny days.",
    price: 19.99,
    category: "Accessories",
    image: image("sunglasses"),
    rating: 3.9,
    stock: 0,
    createdAt: "2026-08-02",
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProductBySlug(slug);

  if (!current) {
    return [];
  }

  return products
    .filter(
      (product) =>
        product.category === current.category && product.slug !== slug,
    )
    .slice(0, limit);
}