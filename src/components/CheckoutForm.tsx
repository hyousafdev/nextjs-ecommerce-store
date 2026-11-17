"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/components/FormField";
import { checkoutSchema, countries } from "@/lib/checkoutSchema";
import type { CheckoutFormValues } from "@/lib/checkoutSchema";
import { formatPrice } from "@/lib/utils";
import {
  selectCartItems,
  selectCartTotal,
  selectIsCartHydrated,
} from "@/store/cartSlice";
import { useAppSelector } from "@/store/hooks";

const inputClass =
  "w-full rounded-md border border-foreground/20 bg-background px-3 py-2 text-sm aria-invalid:border-red-500";

export default function CheckoutForm() {
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const isHydrated = useAppSelector(selectIsCartHydrated);

  const [isValidated, setIsValidated] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      notes: "",
    },
  });

  function fieldProps(name: keyof CheckoutFormValues) {
    return {
      id: name,
      className: inputClass,
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
      ...register(name),
    };
  }

  async function onSubmit(values: CheckoutFormValues) {
    console.log("Checkout values:", values);
    setIsValidated(true);
  }

  if (!isHydrated) {
    return <p className="mt-10 text-foreground/70">Loading your cart...</p>;
  }

  if (items.length === 0) {
    return (
      <div className="mt-10 text-center">
        <p className="text-lg font-medium">Your cart is empty</p>
        <p className="mt-2 text-foreground/70">
          Add some products before you check out.
        </p>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-3">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-8 lg:col-span-2"
      >
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold">Contact details</legend>

          <FormField id="fullName" label="Full name" error={errors.fullName?.message}>
            <input
              type="text"
              autoComplete="name"
              {...fieldProps("fullName")}
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="email" label="Email" error={errors.email?.message}>
              <input
                type="email"
                autoComplete="email"
                {...fieldProps("email")}
              />
            </FormField>

            <FormField id="phone" label="Phone" error={errors.phone?.message}>
              <input
                type="tel"
                autoComplete="tel"
                {...fieldProps("phone")}
              />
            </FormField>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold">Shipping address</legend>

          <FormField
            id="address"
            label="Street address"
            error={errors.address?.message}
          >
            <input
              type="text"
              autoComplete="street-address"
              {...fieldProps("address")}
            />
          </FormField>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="city" label="City" error={errors.city?.message}>
              <input
                type="text"
                autoComplete="address-level2"
                {...fieldProps("city")}
              />
            </FormField>

            <FormField
              id="postalCode"
              label="Postal code"
              error={errors.postalCode?.message}
            >
              <input
                type="text"
                autoComplete="postal-code"
                {...fieldProps("postalCode")}
              />
            </FormField>
          </div>

          <FormField id="country" label="Country" error={errors.country?.message}>
            <select autoComplete="country-name" {...fieldProps("country")}>
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </FormField>
        </fieldset>

        <FormField
          id="notes"
          label="Order notes (optional)"
          error={errors.notes?.message}
        >
          <textarea rows={3} {...fieldProps("notes")} />
        </FormField>

        {isValidated && (
          <p className="rounded-md border border-foreground/20 p-3 text-sm">
            Your details are valid. Placing the order will be connected in the
            next step.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90 disabled:opacity-50"
        >
          Place Order
        </button>
      </form>

      <aside className="h-fit rounded-lg border border-foreground/10 p-6">
        <h2 className="text-lg font-semibold">Order summary</h2>

        <ul className="mt-4 divide-y divide-foreground/10 text-sm">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4 py-3">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-between border-t border-foreground/10 pt-4 text-lg font-semibold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        <Link href="/cart" className="mt-4 inline-block text-sm underline">
          Edit cart
        </Link>
      </aside>
    </div>
  );
}