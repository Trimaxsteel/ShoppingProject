"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase/products";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (!user) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_email", user.email)
        .order("created_at", { ascending: false });
      if (!error) setOrders(data || []);
      setLoading(false);
    };
    fetchUserAndOrders();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading orders...</div>;
  if (!user) return <div className="p-10 text-center">Please sign in to view your orders.</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="text-gray-600">No orders found.</div>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id} className="border-b py-4">
              <div>
                <span className="font-medium">Order #{order.id}</span> - ₹{order.total}
                <div className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString()}</div>
                <details>
                  <summary className="cursor-pointer text-blue-600">View Items</summary>
                  <ul className="ml-4 list-disc">
                    {order.items && Array.isArray(order.items) && order.items.map((item: any, idx: number) => (
                      <li key={idx}>
                        {item.name} x {item.quantity} - ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
