"use client";

import { useState, useEffect } from "react";
import { useCart } from "./cart-context";

export default function DiscountPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { applyDiscountCode, discountCode } = useCart();

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("discount-popup-seen");
    const hasDiscount = discountCode !== null;

    if (!hasSeenPopup && !hasDiscount) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [discountCode]);

  const handleYes = () => {
    setShowCodeInput(true);
  };

  const handleNo = () => {
    sessionStorage.setItem("discount-popup-seen", "true");
    setShowPopup(false);
  };

  const handleApplyCode = async () => {
    if (!code.trim()) {
      setMessage("Please enter a discount code");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const result = await applyDiscountCode(code.toUpperCase());

    setIsLoading(false);

    if (result.success) {
      setMessage(result.message);
      sessionStorage.setItem("discount-popup-seen", "true");

      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } else {
      setMessage(result.message);
    }
  };

  const handleClose = () => {
    sessionStorage.setItem("discount-popup-seen", "true");
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-fade-in">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {!showCodeInput ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Welcome to Mauve!
            </h2>
            <p className="text-gray-600 mb-6">
              Do you have a discount code you'd like to use?
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleYes}
                className="flex-1 bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-light transition-all duration-300 shadow-lg"
              >
                Yes, I have a code
              </button>
              <button
                onClick={handleNo}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                No, thanks
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Enter Your Discount Code
            </h2>
            <p className="text-gray-600 mb-6">
              Enter your code below to unlock your discount
            </p>

            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ENTER CODE"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-3 text-center font-bold text-lg uppercase"
              onKeyPress={(e) => e.key === "Enter" && handleApplyCode()}
              disabled={isLoading}
            />

            {message && (
              <p
                className={`text-sm mb-4 ${
                  message.includes("applied")
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={handleApplyCode}
                disabled={isLoading}
                className="flex-1 bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-light transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Validating..." : "Apply Code"}
              </button>
              <button
                onClick={handleNo}
                disabled={isLoading}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                Skip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
