import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import ProductCard from "@/components/ProductCard";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { formatPrice } from "@/lib/utils";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const isOutOfStock = product.stock === 0;
  const related = getRelatedProducts(product.slug);

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <nav className="text-sm text-foreground/60">
        <Link href="/shop" className="hover:underline">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-foreground/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm text-foreground/60">{product.category}</p>
          <h1 className="mt-1 text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-sm text-foreground/70">
            ★ {product.rating.toFixed(1)}
          </p>
          <p className="mt-4 text-2xl font-semibold">
            {formatPrice(product.price)}
          </p>
          <p className="mt-4 text-foreground/80">{product.description}</p>
          <p className="mt-4 text-sm">
            {isOutOfStock
              ? "Out of stock"
              : `In stock (${product.stock} available)`}
          </p>

          <AddToCartButton product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-semibold">Related products</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}