// scripts/populateDemoProducts.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ieikkehqqaaythpfssif.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaWtrZWhxcWFheXRocGZzc2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDE0NTksImV4cCI6MjA2MzgxNzQ1OX0.5Xk6WcoLXAjBuMRSWLx1coYLoq3v1f9_ecTLeKZFczQ"
);

const demoProducts = [
  {
    name: "The Great Book",
    price: 499,
    category: "books",
    image: "/logo.png",
    description: "A thrilling adventure novel.",
    rating: { rate: 4.5, count: 120 },
  },
  {
    name: "Amazon Gift Card",
    price: 1000,
    category: "gift cards",
    image: "/logo.png",
    description: "Gift happiness to your loved ones.",
    rating: { rate: 5, count: 50 },
  },
  {
    name: "Fresh Apples",
    price: 199,
    category: "fresh",
    image: "/logo.png",
    description: "Crisp and juicy apples.",
    rating: { rate: 4.2, count: 30 },
  },
  {
    name: "Super Saver Deal",
    price: 299,
    category: "deals",
    image: "/logo.png",
    description: "Limited time offer!",
    rating: { rate: 4.8, count: 80 },
  },
  {
    name: "AmazonBasics USB Cable",
    price: 149,
    category: "amazonbasics",
    image: "/logo.png",
    description: "Durable and fast charging.",
    rating: { rate: 4.6, count: 200 },
  },
];

async function main() {
  for (const product of demoProducts) {
    const { error } = await supabase.from("products").insert([
      {
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        description: product.description,
        rating: product.rating,
      },
    ]);
    if (error) {
      console.error(`Error adding product ${product.name}:`, error.message);
    } else {
      console.log(`Added product: ${product.name}`);
    }
  }
  console.log("Demo products added.");
}

main();
