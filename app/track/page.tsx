"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent } from "react";

export const dynamic = "force-dynamic";

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

export default function TrackOrderPage() {
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

  const trackOrder = async (code: string) => {
    if (!code || !code.trim()) {
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
        setOrderDetails(result);
      } else {
        setError(result.error || "Order not found");
      }
    } catch (error) {
      console.error("Track order error:", error);
      setError("Failed to track order. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    trackOrder(orderCode);
  };

  const getStatusColor = (status: string): string => {
    switch (status as OrderStatus) {
      case "pending_payment":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "paid":
      case "delivered":
        return "bg-green-100 text-green-800 border-green-300";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status: string): JSX.Element | null => {
    switch (status as OrderStatus) {
      case "pending_payment":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "paid":
      case "delivered":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case "processing":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        );
      case "shipped":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            Track Your Order
          </h1>
          <p className="text-gray-600">
            Enter your order code to check your order status
          </p>
        </div>

        {/* Input */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={orderCode}
              onChange={(e) => setOrderCode(e.target.value.toUpperCase())}
              placeholder="e.g., MAUVE-L2X9KP3-A1B2C3"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Searching..." : "Track Order"}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {error}
            </div>
          )}
        </div>

        {/* Order Details */}
        {orderDetails && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Order Status
                </h2>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(
                    orderDetails.status
                  )}`}
                >
                  {getStatusIcon(orderDetails.status)}
                  <span className="font-bold capitalize">
                    {orderDetails.status.replace("_", " ")}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Code</p>
                  <p className="font-mono font-bold text-lg text-primary">
                    {orderDetails.order_code}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Customer Name</p>
                  <p className="font-semibold text-foreground">
                    {orderDetails.customer_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Delivery Location
                  </p>
                  <p className="font-semibold text-foreground">
                    {orderDetails.delivery_location}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Order Date</p>
                  <p className="font-semibold text-foreground">
                    {new Date(orderDetails.created_at).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-2">Delivery Address</p>
                <p className="text-foreground">
                  {orderDetails.delivery_address}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Order Items
              </h2>

              <div className="space-y-4">
                {orderDetails.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        {item.product_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">
                        ₦{parseFloat(item.subtotal).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        ₦{parseFloat(item.price).toLocaleString()} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Products Total:</span>
                  <span className="font-semibold">
                    ₦{parseFloat(orderDetails.products_total).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee:</span>
                  <span className="font-semibold">
                    ₦{parseFloat(orderDetails.delivery_fee).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-bold text-foreground pt-2 border-t">
                  <span>Total Amount:</span>
                  <span className="text-primary">
                    ₦{parseFloat(orderDetails.total_amount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push("/")}
              className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-primary-light transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
