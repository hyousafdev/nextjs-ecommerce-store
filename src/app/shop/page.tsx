import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse all products in the store.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Shop</h1>
      <p className="mt-2 text-foreground/80">{products.length} products</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}