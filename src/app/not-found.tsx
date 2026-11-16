import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="text-sm text-foreground/60">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <p className="mt-4 text-foreground/80">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-block rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
      >
        Back to Shop
      </Link>
    </section>
  );
}