"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

interface OrderDetails {
  orderCode: string;
  amount: number;
  email: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const orderCode = searchParams.get("order");
    const amount = searchParams.get("amount");
    const customerEmail = searchParams.get("email");

    if (orderCode && amount) {
      setOrderDetails({
        orderCode,
        amount: parseFloat(amount),
        email: customerEmail ?? "",
      });
      setLoading(false);
    } else {
      router.push("/");
    }
  }, [mounted, searchParams, router]);

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText("6470745840");
    alert("Account number copied to clipboard!");
  };

  const handleCopyAmount = () => {
    if (!orderDetails) return;
    navigator.clipboard.writeText(orderDetails.amount.toString());
    alert("Amount copied to clipboard!");
  };

  const handleCopyOrderCode = () => {
    if (!orderDetails) return;
    navigator.clipboard.writeText(orderDetails.orderCode);
    alert("Order code copied to clipboard!");
  };

  const handlePaymentCompleted = () => {
    setShowThankYou(true);
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary" />
      </div>
    );
  }

  if (showThankYou && orderDetails) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Thank You for Shopping with Us!
          </h1>

          <div className="bg-primary/5 rounded-lg p-6 mb-6">
            <p className="text-lg mb-2">Your order code is:</p>
            <p className="text-2xl font-mono font-bold text-primary mb-4">
              {orderDetails.orderCode}
            </p>
            <p className="text-gray-600">
              Keep this code safe for tracking your order
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => router.push("/")}
              className="w-full bg-primary text-white py-4 rounded-full font-bold"
            >
              Continue Shopping
            </button>
            <button
              onClick={() =>
                router.push(`/track?order=${orderDetails.orderCode}`)
              }
              className="w-full bg-gray-200 py-4 rounded-full font-semibold"
            >
              Track My Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Complete Your Payment
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4 border-b pb-4">
            <span className="font-semibold">Order Code:</span>
            <button
              onClick={handleCopyOrderCode}
              className="font-mono font-bold text-primary"
            >
              {orderDetails?.orderCode}
            </button>
          </div>

          <div className="bg-primary/10 rounded-xl p-6 mb-6">
            <p className="text-sm mb-2">Amount to Pay:</p>
            <button
              onClick={handleCopyAmount}
              className="text-4xl font-bold text-primary"
            >
              ₦{orderDetails && orderDetails.amount.toLocaleString()}
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span>Bank Name:</span>
              <span className="font-bold">Moniepoint</span>
            </div>
            <div className="flex justify-between">
              <span>Account Number:</span>
              <button
                onClick={handleCopyAccountNumber}
                className="font-bold text-primary"
              >
                6470745840
              </button>
            </div>
            <div className="flex justify-between">
              <span>Account Name:</span>
              <span className="font-bold">Fabiyi Oluwaferanmi Esther</span>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
            Use <strong>{orderDetails?.orderCode}</strong> as payment narration.
          </div>
        </div>

        <button
          onClick={handlePaymentCompleted}
          className="w-full bg-primary text-white py-4 rounded-full font-bold"
        >
          I Have Completed the Transfer
        </button>
      </div>
    </div>
  );
}
