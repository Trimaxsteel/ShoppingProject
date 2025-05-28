const { createClient } = require("@supabase/supabase-js");

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
    name: "Super Saver Deal - Mixer Grinder",
    price: 2999,
    category: "deals",
    image: "/logo.png",
    description: "Mixer Grinder at a super saver price!",
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
  {
    name: "Battery (Electronics)",
    price: 100,
    category: "electronics",
    image: "/logo.png",
    description: "Rechargeable 1.5V battery. Was 125, now 100!",
    rating: { rate: 4.7, count: 50 },
  },
];

async function main() {
  // Remove all demo products by name to avoid duplicates
  for (const product of demoProducts) {
    await supabase.from("products").delete().eq("name", product.name);
  }
  // Remove any previous battery products by partial match
  await supabase.from("products").delete().ilike("name", "%battery%");
  // Insert fresh demo products
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
