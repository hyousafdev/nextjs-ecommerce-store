import { z } from "zod";

export const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "India",
  "Pakistan",
  "United Arab Emirates",
] as const;

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s-]{7,15}$/, "Please enter a valid phone number"),
  address: z.string().trim().min(5, "Please enter your street address"),
  city: z.string().trim().min(2, "Please enter your city"),
  postalCode: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9\s-]{3,10}$/, "Please enter a valid postal code"),
  country: z.string().min(1, "Please select a country"),
  notes: z.string().trim().max(200, "Notes can be at most 200 characters"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;