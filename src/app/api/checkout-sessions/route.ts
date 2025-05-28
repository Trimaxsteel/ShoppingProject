import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

const stripe = require(`stripe`)(process.env.NEXT_PUBLIC_STRIP_SECRET_KEY);
const supabase = createClient(
  "https://ieikkehqqaaythpfssif.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaWtrZWhxcWFheXRocGZzc2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDE0NTksImV4cCI6MjA2MzgxNzQ1OX0.5Xk6WcoLXAjBuMRSWLx1coYLoq3v1f9_ecTLeKZFczQ"
);

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { items, email } = body;
  console.log(items, email);

  const arrangeItems = items.map((item: any) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.name || item.title,
        images: [item.image],
      },
      unit_amount: Math.floor(item.price * 100), // Stripe expects price in paise
    },
    quantity: item.quantity,
  }));

  // Calculate total
  const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  // Save order to Supabase with timeout and error handling
  try {
    await Promise.race([
      supabase.from("orders").insert([
        {
          user_email: email,
          items: items,
          total: total,
          created_at: new Date().toISOString(),
        },
      ]),
      new Promise((_, reject) => setTimeout(() => reject(new Error("Supabase insert timeout")), 4000)),
    ]);
  } catch (err) {
    console.error("Order save error:", err);
    // Optionally, you can return a warning in the response or continue
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["IN", "US", "GB", "CA"],
    },
    line_items: arrangeItems,
    mode: "payment",
    success_url: "https://amazon-clone-k6cdb9a6e-itmejayesh.vercel.app/",
    cancel_url: "https://amazon-clone-k6cdb9a6e-itmejayesh.vercel.app/checkout",
    metadata: {
      email,
      images: JSON.stringify(items.map((item: any) => item.image)),
    },
  });

  return NextResponse.json({
    id: session.id,
  });
}
