export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12" aria-busy="true">
      <div className="h-4 w-40 animate-pulse rounded bg-foreground/10" />

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-lg bg-foreground/10" />

        <div className="space-y-4">
          <div className="h-4 w-24 animate-pulse rounded bg-foreground/10" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-foreground/10" />
          <div className="h-8 w-32 animate-pulse rounded bg-foreground/10" />
          <div className="h-20 w-full animate-pulse rounded bg-foreground/10" />
          <div className="h-12 w-40 animate-pulse rounded bg-foreground/10" />
        </div>
      </div>
    </section>
  );
}