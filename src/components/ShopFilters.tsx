"use client";

import { useEffect, useRef } from "react";
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

  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuery = searchParams.get("q") ?? "";
  const currentCategory = searchParams.get("category") ?? "";
  const currentSort = searchParams.get("sort") ?? "newest";

  // Keep the input in sync when the URL changes from outside
  // (Back button, "Clear all filters" link), but not while the user is typing.
  useEffect(() => {
    if (timeoutRef.current !== null) {
      return;
    }
    if (inputRef.current && inputRef.current.value.trim() !== currentQuery) {
      inputRef.current.value = currentQuery;
    }
  }, [currentQuery]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function updateParams(
    updates: Record<string, string>,
    method: "push" | "replace" = "push",
  ) {
    const params = new URLSearchParams(window.location.search);

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    if (method === "replace") {
      router.replace(url, { scroll: false });
    } else {
      router.push(url, { scroll: false });
    }
  }

  function handleSearchChange(value: string) {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      updateParams({ q: value.trim() }, "replace");
    }, 400);
  }

  function handleClear() {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    router.push(pathname, { scroll: false });
  }

  const categoryItems = [
    { label: "All", value: "" },
    ...categories.map((category) => ({ label: category, value: category })),
  ];

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="search"
        defaultValue={currentQuery}
        onChange={(event) => handleSearchChange(event.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm"
      />

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