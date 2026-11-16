"use client";

import Link from "next/link";
import { selectCartCount } from "@/store/cartSlice";
import { useAppSelector } from "@/store/hooks";

export default function CartLink() {
  const count = useAppSelector(selectCartCount);

  return (
    <Link href="/cart" className="hover:underline">
      Cart
      {count > 0 && (
        <span className="ml-1 rounded-full bg-foreground px-2 py-0.5 text-xs text-background">
          {count}
        </span>
      )}
    </Link>
  );
}