"use client";

import Link from "next/link";
import CartItemRow from "@/components/CartItemRow";
import { formatPrice } from "@/lib/utils";
import {
  clearCart,
  selectCartCount,
  selectCartItems,
  selectCartTotal,
} from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function CartView() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="mt-10 text-center">
        <p className="text-lg font-medium">Your cart is empty</p>
        <p className="mt-2 text-foreground/70">
          Looks like you have not added anything yet.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <ul className="divide-y divide-foreground/10 border-y border-foreground/10">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </ul>

        <button
          type="button"
          onClick={() => dispatch(clearCart())}
          className="mt-4 text-sm underline"
        >
          Clear cart
        </button>
      </div>

      <aside className="h-fit rounded-lg border border-foreground/10 p-6">
        <h2 className="text-lg font-semibold">Order summary</h2>

        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt>Items ({count})</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>Free</dd>
          </div>
        </dl>

        <div className="mt-4 flex justify-between border-t border-foreground/10 pt-4 text-lg font-semibold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        <Link
          href="/checkout"
          className="mt-6 block rounded-md bg-foreground px-5 py-3 text-center text-sm font-medium text-background hover:opacity-90"
        >
          Proceed to Checkout
        </Link>
      </aside>
    </div>
  );
}