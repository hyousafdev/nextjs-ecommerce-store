"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import type { CartItem } from "@/types";

type CartItemRowProps = {
  item: CartItem;
};

export default function CartItemRow({ item }: CartItemRowProps) {
  const dispatch = useAppDispatch();
  const lineTotal = item.price * item.quantity;

  return (
    <li className="flex gap-4 py-6">
      <Link
        href={`/shop/${item.slug}`}
        className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-md bg-foreground/5"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between gap-4">
          <Link
            href={`/shop/${item.slug}`}
            className="font-medium hover:underline"
          >
            {item.name}
          </Link>
          <p className="font-medium">{formatPrice(lineTotal)}</p>
        </div>
        <p className="mt-1 text-sm text-foreground/60">
          {formatPrice(item.price)} each
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center rounded-md border border-foreground/20">
            <button
              type="button"
              aria-label={`Decrease quantity of ${item.name}`}
              onClick={() => dispatch(decreaseQuantity(item.id))}
              disabled={item.quantity <= 1}
              className="px-3 py-1 hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>
            <span className="min-w-8 px-2 text-center text-sm">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity of ${item.name}`}
              onClick={() => dispatch(increaseQuantity(item.id))}
              disabled={item.quantity >= item.stock}
              className="px-3 py-1 hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => dispatch(removeFromCart(item.id))}
            className="text-sm underline"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}