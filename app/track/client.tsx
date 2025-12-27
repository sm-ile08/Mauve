"use client";

import { useEffect, useState, KeyboardEvent, Suspense } from "react";
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

function TrackContent() {
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
        `https://mauve-backend.onrender.com/api/orders/track/${code}`
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

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      trackOrder(orderCode);
    }
  };

  const getStatusColor = (status: OrderStatus): string => {
    const colors: Record<OrderStatus, string> = {
      pending_payment: "bg-yellow-100 text-yellow-800 border-yellow-300",
      paid: "bg-green-100 text-green-800 border-green-300",
      processing: "bg-blue-100 text-blue-800 border-blue-300",
      shipped: "bg-purple-100 text-purple-800 border-purple-300",
      delivered: "bg-green-100 text-green-800 border-green-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getStatusText = (status: string): string => {
    return status.replace("_", " ").toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            Track Your Order
          </h1>
          <p className="text-gray-600">
            Enter your order code to check the status of your order
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Order Code
              </label>
              <input
                type="text"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value.toUpperCase())}
                onKeyPress={handleKeyPress}
                placeholder="e.g., MAUVE-L2X9KP3-A1B2C3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono"
              />
            </div>

            <button
              onClick={() => trackOrder(orderCode)}
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-primary-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Tracking..." : "Track Order"}
            </button>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Order Details */}
        {orderDetails && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
            {/* Status Badge */}
            <div className="text-center">
              <span
                className={`inline-block px-6 py-3 rounded-full font-bold text-lg border-2 ${getStatusColor(
                  orderDetails.status as OrderStatus
                )}`}
              >
                {getStatusText(orderDetails.status)}
              </span>
            </div>

            {/* Order Info */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Order Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order Code</p>
                  <p className="font-mono font-bold text-primary">
                    {orderDetails.order_code}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer Name</p>
                  <p className="font-semibold">{orderDetails.customer_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold">
                    {new Date(orderDetails.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Delivery Location</p>
                  <p className="font-semibold">
                    {orderDetails.delivery_location}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Delivery Address</p>
                <p className="font-semibold">{orderDetails.delivery_address}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Order Items
              </h2>
              <div className="space-y-3">
                {orderDetails.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{item.product_name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity} × ₦
                        {parseFloat(item.price).toLocaleString()}
                      </p>
                    </div>
                    <p className="font-bold text-primary">
                      ₦{parseFloat(item.subtotal).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Products Total</span>
                  <span className="font-semibold">
                    ₦{parseFloat(orderDetails.products_total).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">
                    ₦{parseFloat(orderDetails.delivery_fee).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                  <span className="text-xl font-bold">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">
                    ₦{parseFloat(orderDetails.total_amount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Instructions for Pending Orders */}
            {orderDetails.status === "pending_payment" && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                <h3 className="font-bold text-yellow-900 mb-2">
                  ⚠️ Payment Pending
                </h3>
                <p className="text-sm text-yellow-800 mb-3">
                  Please complete your payment to process your order.
                </p>
                <div className="text-sm text-yellow-800">
                  <p className="font-bold">Transfer Details:</p>
                  <p>Bank: Access Bank</p>
                  <p>Account Number: 1234567890</p>
                  <p>Account Name: Mauve Beauty</p>
                  <p className="mt-2">
                    <strong>Reference:</strong> {orderDetails.order_code}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <TrackContent />
    </Suspense>
  );
}
