// Add a demo product to Supabase: Battery in electronics
// You can run this as a script or add via admin panel
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ieikkehqqaaythpfssif.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaWtrZWhxcWFheXRocGZzc2lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNDE0NTksImV4cCI6MjA2MzgxNzQ1OX0.5Xk6WcoLXAjBuMRSWLx1coYLoq3v1f9_ecTLeKZFczQ"
);

async function addBatteryProduct() {
  const { error } = await supabase.from("products").insert([
    {
      name: "Battery",
      price: 100,
      category: "electronics",
      image: "https://thumbs.dreamstime.com/b/blue-color-rechargeable-volts-batteries-four-grouped-together-one-positioned-separately-isolated-white-background-370135775.jpg",
      description: "Rechargeable 1.5V battery. Was 125, now 100!",
      rating: { rate: 4.7, count: 50 },
    },
  ]);
  if (error) {
    console.error("Error adding Battery product:", error.message);
  } else {
    console.log("Battery product added!");
  }
}

addBatteryProduct();