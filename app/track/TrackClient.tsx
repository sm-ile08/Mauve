"use client";

import { useEffect, useState, KeyboardEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface OrderItem {
  product_name: string;
  quantity: number;
  price: string;
  subtotal: string;
}

interface OrderDetails {
  order_code: string;
  customer_name: string;
  delivery_location: string;
  delivery_address: string;
  created_at: string;
  status: string;
  items: OrderItem[];
  products_total: string;
  delivery_fee: string;
  total_amount: string;
}

type OrderStatus =
  | "pending_payment"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export default function TrackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [orderCode, setOrderCode] = useState<string>("");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const code = searchParams.get("order");
    if (code) {
      setOrderCode(code);
      trackOrder(code);
    }
  }, [searchParams]);

  const trackOrder = async (code: string): Promise<void> => {
    if (!code.trim()) {
      setError("Please enter an order code");
      return;
    }

    setLoading(true);
    setError("");
    setOrderDetails(null);

    try {
      const response = await fetch(
        `https://mauve-backend1.onrender.com/api/orders/track/${code}`
      );
      const result = await response.json();

      if (response.ok) {
        setOrderDetails(result as OrderDetails);
      } else {
        setError(result?.error || "Order not found");
      }
    } catch {
      setError("Failed to track order. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return <div className="min-h-screen bg-background py-8 px-4"></div>;
}
