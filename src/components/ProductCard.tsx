import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock === 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-foreground/10">
      <Link
        href={`/shop/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-foreground/5"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition group-hover:scale-105"
        />
        {isOutOfStock && (
          <span className="absolute left-2 top-2 rounded bg-foreground px-2 py-1 text-xs font-medium text-background">
            Out of stock
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-foreground/60">{product.category}</p>
        <h2 className="mt-1 font-semibold">
          <Link href={`/shop/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h2>
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="font-medium">{formatPrice(product.price)}</p>
          <p className="text-sm text-foreground/70">
            ★ {product.rating.toFixed(1)}
          </p>
        </div>
      </div>
    </article>
  );
}