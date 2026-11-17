import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review the items in your shopping cart.",
};

export default function CartPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <CartView />
    </section>
  );
}