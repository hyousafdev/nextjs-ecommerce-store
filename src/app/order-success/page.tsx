import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Thank you for your order.",
};

type OrderSuccessPageProps = {
  searchParams: Promise<{ orderId?: string | string[] }>;
};

async function OrderDetails({ searchParams }: OrderSuccessPageProps) {
  const { orderId } = await searchParams;
  const id = Array.isArray(orderId) ? orderId[0] : orderId;

  if (!id || !/^ORD-[A-Z0-9]{8}$/.test(id)) {
    return (
      <>
        <h1 className="text-3xl font-bold">No order found</h1>
        <p className="mt-2 text-foreground/70">
          We could not find an order to show here.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
        >
          Go to Shop
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Thank you for your order!</h1>
      <p className="mt-2 text-foreground/70">
        This is a demo store, so no payment was taken and nothing will be
        shipped.
      </p>
      <p className="mt-6">
        Your order number is{" "}
        <span className="font-mono font-semibold">{id}</span>
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-block rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
      >
        Continue Shopping
      </Link>
    </>
  );
}

export default function OrderSuccessPage({
  searchParams,
}: OrderSuccessPageProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <Suspense
        fallback={<p className="text-foreground/70">Loading order details...</p>}
      >
        <OrderDetails searchParams={searchParams} />
      </Suspense>
    </section>
  );
}