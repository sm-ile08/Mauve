"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./cart-context";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalItems, clearCart } =
    useCart();
  const [location, setLocation] = useState("");
  const [showLocationError, setShowLocationError] = useState(false);
  const router = useRouter();

  const handleOrder = () => {
    if (cart.length === 0) return;

    if (!location.trim()) {
      setShowLocationError(true);
      return;
    }

    let message = "Hi Mauve! I'd love to order the following:\n\n";

    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} - ${item.price}\n`;
    });

    message += `\n Delivery Location: ${location}`;

    const whatsappLink = `https://wa.me/2349165386138?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");

    clearCart();
    setLocation("");

    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => router.push("/cart")}
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-light transition-all duration-300 transform hover:scale-110 z-50"
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </>
  );
}

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [location, setLocation] = useState("");
  const [showLocationError, setShowLocationError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const handleOrder = () => {
    if (cart.length === 0) return;

    if (!location.trim()) {
      setShowLocationError(true);
      return;
    }

    let message = "Hi Mauve! I'd love to order the following:\n\n";

    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} - ${item.price}\n`;
    });

    message += `\n Delivery Location: ${location}`;

    const whatsappLink = `https://wa.me/2349165386138?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");

    setShowConfirmation(true);

    setTimeout(() => {
      clearCart();
      setLocation("");
      router.push("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-fade-in">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500"
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
            <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
              Order Sent Successfully!
            </h3>
            <p className="text-gray-600 mb-4">
              Your order has been sent to WhatsApp. We'll respond to you shortly
              with confirmation and delivery details.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting you back to home...
            </p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Continue Shopping
          </button>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Your Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-gray-500 text-xl mb-2">Your cart is empty</p>
            <p className="text-gray-400 mb-6">
              Add some amazing lip glosses to get started!
            </p>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-light transition-all duration-300"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-6 shadow-md flex items-center gap-6"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-serif font-bold text-foreground mb-2">
                      {item.name}
                    </h3>
                    <p className="text-xl md:text-2xl font-bold text-primary mb-4">
                      {item.price}
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors font-semibold"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-bold text-lg">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-2"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-md sticky top-8">
                <h2 className="text-xl font-serif font-bold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Items in cart:</span>
                    <span className="font-semibold">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="location"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Delivery Location <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="location"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setShowLocationError(false);
                    }}
                    placeholder="Enter your full delivery address&#10;e.g., 15 Admiralty Way, Lekki Phase 1, Lagos"
                    rows={3}
                    className={`w-full px-4 py-3 border ${
                      showLocationError ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none`}
                  />
                  {showLocationError && (
                    <p className="text-red-500 text-sm mt-1">
                      Please enter your delivery location
                    </p>
                  )}
                </div>

                <button
                  onClick={handleOrder}
                  className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-primary-light transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Order on WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
