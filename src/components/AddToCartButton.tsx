"use client";

import { addToCart } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Product } from "@/types";

type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const quantityInCart = useAppSelector(
    (state) =>
      state.cart.items.find((item) => item.id === product.id)?.quantity ?? 0,
  );

  const isOutOfStock = product.stock === 0;
  const reachedLimit = quantityInCart >= product.stock;

  let label = "Add to Cart";
  if (isOutOfStock) {
    label = "Out of stock";
  } else if (reachedLimit) {
    label = "Maximum quantity in cart";
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        disabled={isOutOfStock || reachedLimit}
        onClick={() => dispatch(addToCart(product))}
        className="rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {label}
      </button>

      {quantityInCart > 0 && (
        <p className="mt-2 text-sm text-foreground/70">
          {quantityInCart} in your cart
        </p>
      )}
    </div>
  );
}