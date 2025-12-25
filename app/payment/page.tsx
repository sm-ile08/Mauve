"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

interface OrderDetails {
  orderCode: string;
  amount: number;
  email: string;
}

export default function PaymentPage() {
  const router = useRouter();

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const orderCode = params.get("order");
    const amount = params.get("amount");
    const email = params.get("email");

    if (!orderCode || !amount) {
      router.replace("/");
      return;
    }

    setOrder({
      orderCode,
      amount: Number(amount),
      email: email ?? "",
    });

    setLoading(false);
  }, [router]);

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard`);
  };

  const completePayment = () => {
    setShowThankYou(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-primary" />
      </div>
    );
  }

  if (showThankYou && order) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">
            Thank You for Shopping with Us
          </h1>

          <div className="bg-primary/5 rounded-lg p-6 mb-6">
            <p className="text-lg mb-2">Your order code:</p>
            <p className="text-2xl font-mono font-bold text-primary mb-2">
              {order.orderCode}
            </p>
            <p className="text-gray-600">Keep this code safe for tracking</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => router.push("/")}
              className="w-full rounded-full bg-primary py-4 font-bold text-white"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => router.push(`/track?order=${order.orderCode}`)}
              className="w-full rounded-full bg-gray-200 py-4 font-semibold"
            >
              Track My Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Complete Your Payment
        </h1>

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <span className="font-semibold">Order Code</span>
            <button
              onClick={() => copyText(order!.orderCode, "Order code")}
              className="font-mono font-bold text-primary"
            >
              {order!.orderCode}
            </button>
          </div>

          <div className="mb-6 rounded-xl bg-primary/10 p-6 text-center">
            <p className="text-sm mb-2">Amount to Pay</p>
            <button
              onClick={() => copyText(order!.amount.toString(), "Amount")}
              className="text-4xl font-bold text-primary"
            >
              ₦{order!.amount.toLocaleString()}
            </button>
          </div>

          {/* Bank Info */}
          <div className="space-y-3 rounded-lg bg-gray-50 p-4">
            <div className="flex justify-between">
              <span>Bank Name</span>
              <span className="font-bold">Moniepoint</span>
            </div>

            <div className="flex justify-between">
              <span>Account Number</span>
              <button
                onClick={() => copyText("6470745840", "Account number")}
                className="font-bold text-primary"
              >
                6470745840
              </button>
            </div>

            <div className="flex justify-between">
              <span>Account Name</span>
              <span className="font-bold">Fabiyi Oluwaferanmi Esther</span>
            </div>
          </div>

          <div className="mt-6 border-l-4 border-yellow-400 bg-yellow-50 p-4">
            Use <strong>{order!.orderCode}</strong> as payment narration.
          </div>
        </div>

        <button
          onClick={completePayment}
          className="w-full rounded-full bg-primary py-4 font-bold text-white"
        >
          I Have Completed the Transfer
        </button>
      </div>
    </div>
  );
}
