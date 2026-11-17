import { z } from "zod";
import { checkoutSchema } from "@/lib/checkoutSchema";

export const orderItemSchema = z.object({
  id: z.number().int().positive(),
  quantity: z.number().int().min(1).max(99),
});

export const orderRequestSchema = z.object({
  customer: checkoutSchema,
  items: z.array(orderItemSchema).min(1, "Your cart is empty"),
});

export type OrderRequest = z.infer<typeof orderRequestSchema>;