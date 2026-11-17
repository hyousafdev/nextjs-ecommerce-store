import type { CheckoutFormValues } from "@/lib/checkoutSchema";
import type { OrderRequest } from "@/lib/orderSchema";
import { getAllProducts } from "@/lib/products";

export type OrderItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  lineTotal: number;
};

export type Order = {
  id: string;
  createdAt: string;
  customer: CheckoutFormValues;
  items: OrderItem[];
  total: number;
};

type CreateOrderResult =
  | { ok: true; order: Order }
  | { ok: false; error: string };

// Fake database: lives in server memory only.
const orders: Order[] = [];

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

export function createOrder(request: OrderRequest): CreateOrderResult {
  const products = getAllProducts();
  const items: OrderItem[] = [];

  for (const requested of request.items) {
    const product = products.find((entry) => entry.id === requested.id);

    if (!product) {
      return { ok: false, error: `Product ${requested.id} does not exist.` };
    }

    if (product.stock < requested.quantity) {
      return { ok: false, error: `Not enough stock for ${product.name}.` };
    }

    items.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: requested.quantity,
      lineTotal: round(product.price * requested.quantity),
    });
  }

  const order: Order = {
    id: `ORD-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    customer: request.customer,
    items,
    total: round(items.reduce((sum, item) => sum + item.lineTotal, 0)),
  };

  orders.push(order);

  return { ok: true, order };
}