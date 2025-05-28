"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase/products";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "view19116@gmail.com";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Check user session
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (!data.user || data.user.email !== ADMIN_EMAIL) {
        router.replace("/");
      }
    });
  }, [router]);

  // Fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch orders
  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase.from("products").select("*").order("id", { ascending: false });
    if (!error) setProducts(data || []);
  }

  async function fetchOrders() {
    const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (!error) setOrders(data || []);
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";
    if (image) {
      const { data: imgData, error: imgError } = await supabase.storage
        .from("product-images")
        .upload(`${Date.now()}-${image.name}`, image);

      if (imgError) {
        alert("Image upload failed");
        setLoading(false);
        return;
      }
      imageUrl = supabase.storage.from("product-images").getPublicUrl(imgData.path).data.publicUrl;
    }

    const { error } = await supabase.from("products").insert([{ name, price: parseFloat(price), image: imageUrl, category }]);
    if (error) alert("Error adding product");
    setName("");
    setPrice("");
    setImage(null);
    setCategory("");
    fetchProducts();
    setLoading(false);
  }

  async function handleDeleteProduct(id: number) {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <form onSubmit={handleAddProduct} className="space-y-4 mb-8">
        <input
          className="border p-2 w-full"
          placeholder="Product Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Price"
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Category (e.g. books, gift cards, deals)"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files?.[0] || null)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <ul>
        {products.map(prod => (
          <li key={prod.id} className="flex items-center justify-between border-b py-2">
            <div>
              <span className="font-medium">{prod.name}</span> - ₹{prod.price}
              {prod.image && (
                <img src={prod.image} alt={prod.name} className="inline-block ml-2 w-12 h-12 object-cover rounded" />
              )}
            </div>
            <button
              className="text-red-600 hover:underline"
              onClick={() => handleDeleteProduct(prod.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-4">Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id} className="border-b py-2">
            <div>
              <span className="font-medium">Order #{order.id}</span> - {order.user_email} - ₹{order.total}
              <div className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString()}</div>
              <details>
                <summary className="cursor-pointer text-blue-600">View Items</summary>
                <ul className="ml-4 list-disc">
                  {order.items && Array.isArray(order.items) && order.items.map((item: any, idx: number) => (
                    <li key={idx}>{item.name || item.title} x {item.quantity} (₹{item.price})</li>
                  ))}
                </ul>
              </details>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
