import { NextResponse } from "next/server";
import { createOrder } from "@/lib/orders";
import { orderRequestSchema } from "@/lib/orderSchema";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const parsed = orderRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.map(String).join("."),
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  // Simulate a slow network so the loading state is visible.
  await new Promise((resolve) => setTimeout(resolve, 800));

  const result = createOrder(parsed.data);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  return NextResponse.json({ order: result.order }, { status: 201 });
}