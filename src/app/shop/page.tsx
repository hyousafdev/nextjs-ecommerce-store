import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/ShopFilters";
import { categories } from "@/lib/products";
import { getFilteredProducts, parseShopFilters } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse all products in the store.",
};

type ShopPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function ProductResults({ searchParams }: ShopPageProps) {
  const filters = parseShopFilters(await searchParams);
  const products = getFilteredProducts(filters);

  if (products.length === 0) {
    return (
      <div className="mt-10 text-center">
        <p className="text-lg font-medium">No products found</p>
        <p className="mt-2 text-foreground/70">
          Try a different search or remove some filters.
        </p>
        <Link
          href="/shop"
          className="mt-4 inline-block text-sm underline"
        >
          Clear all filters
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mt-6 text-sm text-foreground/70">
        {products.length} {products.length === 1 ? "product" : "products"}{" "}
        found
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Shop</h1>

      <div className="mt-6">
        <Suspense fallback={<div className="h-28" />}>
          <ShopFilters categories={categories} />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <p className="mt-6 text-sm text-foreground/70">Loading products...</p>
        }
      >
        <ProductResults searchParams={searchParams} />
      </Suspense>
    </section>
  );
}