"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { sortOptions } from "@/lib/constants";
import type { ProductCategory } from "@/types";

type ShopFiltersProps = {
  categories: ProductCategory[];
};

export default function ShopFilters({ categories }: ShopFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const currentCategory = searchParams.get("category") ?? "";
  const currentSort = searchParams.get("sort") ?? "newest";

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateParams({ q: search.trim() });
  }

  function handleClear() {
    setSearch("");
    router.push(pathname);
  }

  const categoryItems = [
    { label: "All", value: "" },
    ...categories.map((category) => ({ label: category, value: category })),
  ];

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
        >
          Search
        </button>
      </form>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categoryItems.map((item) => {
            const isActive = currentCategory === item.value;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => updateParams({ category: item.value })}
                className={
                  isActive
                    ? "rounded-full bg-foreground px-4 py-1.5 text-sm text-background"
                    : "rounded-full border border-foreground/20 px-4 py-1.5 text-sm hover:bg-foreground/5"
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <select
            value={currentSort}
            onChange={(event) => updateParams({ sort: event.target.value })}
            aria-label="Sort products"
            className="rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleClear}
            className="text-sm underline"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}