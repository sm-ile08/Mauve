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
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);

  useEffect(() => {
    const orderCode = searchParams.get("order");
    const amount = searchParams.get("amount");
    const customerEmail = searchParams.get("email");

    if (orderCode && amount) {
      setOrderDetails({
        orderCode,
        amount: parseFloat(amount),
        email: customerEmail || "",
      });
      setLoading(false);
    } else {
      router.push("/");
    }
  }, [searchParams, router]);

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText("6470745840");
    alert("Account number copied to clipboard!");
  };

  const handleCopyAmount = () => {
    if (orderDetails) {
      navigator.clipboard.writeText(orderDetails.amount.toString());
      alert("Amount copied to clipboard!");
    }
  };

  const handleCopyOrderCode = () => {
    if (orderDetails) {
      navigator.clipboard.writeText(orderDetails.orderCode);
      alert("Order code copied to clipboard!");
    }
  };

  const handlePaymentCompleted = () => {
    setShowThankYou(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-500"
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
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Thank You for Shopping with Us!
          </h1>

          <div className="bg-primary/5 rounded-lg p-6 mb-6">
            <p className="text-lg text-gray-700 mb-2">Your order code is:</p>
            <p className="text-2xl font-mono font-bold text-primary mb-4">
              {orderDetails?.orderCode}
            </p>
            <p className="text-gray-600">
              Keep this code safe for tracking your order
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
            <p className="text-sm text-yellow-800">
              <strong>Email Confirmation:</strong> An email will be sent to{" "}
              <strong>{orderDetails?.email}</strong> after your payment has been
              confirmed by our team. This usually takes 1-2 hours during
              business hours.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => router.push("/")}
              className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-primary-light transition-all duration-300"
            >
              Continue Shopping
            </button>
            <button
              onClick={() =>
                router.push(`/track?order=${orderDetails?.orderCode}`)
              }
              className="w-full bg-gray-200 text-gray-700 py-4 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300"
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
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
            Complete Your Payment
          </h1>
          <p className="text-gray-600">
            Order placed successfully! Please transfer the exact amount below.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <span className="text-gray-600 font-semibold">Order Code:</span>
            <button
              onClick={handleCopyOrderCode}
              className="flex items-center gap-2 text-primary hover:text-primary-light font-mono font-bold text-lg"
            >
              {orderDetails?.orderCode}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>

          <div className="bg-primary/10 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Amount to Pay:</p>
            <button
              onClick={handleCopyAmount}
              className="flex items-center gap-3 text-4xl md:text-5xl font-bold text-primary hover:text-primary-light"
            >
              ₦{orderDetails?.amount.toLocaleString()}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
            <p className="text-xs text-gray-500 mt-2">Click to copy amount</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Bank Transfer Details:
            </h3>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600">Bank Name:</span>
                <span className="font-bold text-foreground">Moniepoint</span>
              </div>

              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-600">Account Number:</span>
                <button
                  onClick={handleCopyAccountNumber}
                  className="flex items-center gap-2 font-bold text-primary hover:text-primary-light text-lg"
                >
                  6470745840
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Account Name:</span>
                <span className="font-bold text-foreground">
                  Fabiyi Oluwaferanmi Esther
                </span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Please use your order code{" "}
              <span className="font-mono font-bold">
                {orderDetails?.orderCode}
              </span>{" "}
              as the transfer reference/narration.
            </p>
          </div>
        </div>

        <button
          onClick={handlePaymentCompleted}
          className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-primary-light transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          I Have Completed the Transfer
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          By clicking above, you confirm that you have made the payment
        </p>
      </div>
    </div>
  );
}
