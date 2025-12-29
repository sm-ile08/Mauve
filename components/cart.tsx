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
        className="fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-light transition-all duration-300 z-50 slow-bounce"
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("Akure");
  const [showNameError, setShowNameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);
  const [showAddressError, setShowAddressError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const getDeliveryFee = () => {
    const loc = location.toLowerCase();

    if (loc.includes("futa")) return 0;
    if (loc.includes("akure")) return 1000;
    if (loc.includes("ondo")) return 2000;
    if (loc.includes("ekiti")) return 3000;
    if (loc.includes("osun")) return 4000;
    if (loc.includes("oyo") || loc.includes("ibadan")) return 4500;
    if (loc.includes("ogun")) return 5000;
    if (loc.includes("lagos")) return 6000;
    if (loc.includes("edo")) return 6000;
    if (loc.includes("delta")) return 7000;
    if (loc.includes("rivers")) return 8000;
    if (loc.includes("bayelsa")) return 8000;
    if (loc.includes("akwa ibom")) return 8500;
    if (loc.includes("cross river")) return 9000;
    if (loc.includes("anambra")) return 7000;
    if (loc.includes("enugu")) return 7500;
    if (loc.includes("ebonyi")) return 7500;
    if (loc.includes("imo")) return 8000;
    if (loc.includes("abia")) return 8000;
    if (loc.includes("kogi")) return 6000;
    if (loc.includes("kwara")) return 5000;
    if (loc.includes("abuja") || loc.includes("fct")) return 8000;
    if (loc.includes("nasarawa")) return 8500;
    if (loc.includes("benue")) return 9000;
    if (loc.includes("plateau")) return 9000;
    if (loc.includes("niger")) return 8000;
    if (loc.includes("kaduna")) return 10000;
    if (loc.includes("kano")) return 12000;
    if (loc.includes("katsina")) return 12000;
    if (loc.includes("sokoto")) return 12000;
    if (loc.includes("zamfara")) return 11000;
    if (loc.includes("kebbi")) return 12000;
    if (loc.includes("jigawa")) return 12000;
    if (loc.includes("bauchi")) return 10000;
    if (loc.includes("gombe")) return 11000;
    if (loc.includes("taraba")) return 11000;
    if (loc.includes("adamawa")) return 12000;
    if (loc.includes("borno")) return 13000;
    if (loc.includes("yobe")) return 13000;

    return 8000;
  };

  const calculateProductsTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[₦,]/g, "")) || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const productsTotal = calculateProductsTotal();
  const deliveryFee = getDeliveryFee();
  const grandTotal = productsTotal + deliveryFee;

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    if (!name.trim()) {
      setShowNameError(true);
      return;
    }

    let message = "Hi Mauve! I'd love to order the following:\n\n";

    cart.forEach((item) => {
      message += `• ${item.name} x${item.quantity} - ${item.price}\n`;
    });

    message += `\n Name: ${name}`;
    message += `\n Delivery Location: ${location}`;

    const whatsappLink = `https://wa.me/2349165386138?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");

    setShowConfirmation(true);

    setTimeout(() => {
      clearCart();
      setName("");
      setLocation("");
      router.push("/");
    }, 3000);
  };

  const handleBankTransferOrder = async () => {
    if (cart.length === 0) return;

    let hasError = false;
    if (!name.trim()) {
      setShowNameError(true);
      hasError = true;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setShowEmailError(true);
      hasError = true;
    }
    if (!phone.trim()) {
      setShowPhoneError(true);
      hasError = true;
    }
    if (!address.trim()) {
      setShowAddressError(true);
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      const orderData = {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        delivery_address: address,
        delivery_location: location,
        items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await fetch(
        "https://mauve-backend.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        clearCart();
        router.push(
          `/payment?order=${result.order.order_code}&amount=${result.order.total_amount}&email=${email}`
        );
      } else {
        alert(`Error: ${result.error || "Failed to create order"}`);
      }
    } catch (error) {
      console.error("Order submission error:", error);
      alert(
        "Failed to submit order. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText("1234567890");
    alert("Account number copied!");
  };

  const handleCopyOrderCode = () => {
    navigator.clipboard.writeText(orderCode);
    alert("Order code copied!");
  };

  return (
    <div className="min-h-screen bg-background py-8">
      {/* Success Confirmation Modal */}
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

      {showBankDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="text-center mb-6">
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
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                Complete Your Payment
              </h3>
              <p className="text-gray-600 text-sm">
                Order Created Successfully!
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Order Code:</span>
                <button
                  onClick={handleCopyOrderCode}
                  className="flex items-center gap-1 text-primary hover:text-primary-light"
                >
                  <span className="font-mono font-bold">{orderCode}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-700">
                  Total Amount:
                </span>
                <span className="font-bold text-primary text-2xl">
                  ₦{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6 bg-primary/5 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-3">Transfer to:</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank:</span>
                  <span className="font-semibold">Moniepoint</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Account Number:</span>
                  <button
                    onClick={handleCopyAccountNumber}
                    className="flex items-center gap-2 text-primary hover:text-primary-light font-bold"
                  >
                    6470745840
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
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
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Name:</span>
                  <span className="font-semibold">
                    Fabiyi Oluwaferanmi Esther
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Important:</strong> Use your order code{" "}
                <span className="font-mono font-bold">{orderCode}</span> as
                reference when making payment.
              </p>
            </div>

            <p className="text-sm text-gray-600 text-center mb-4">
              A confirmation email has been sent to <strong>{email}</strong>
            </p>

            <div className="space-y-3">
              <button
                onClick={() => {
                  clearCart();
                  setShowBankDetails(false);
                  router.push("/");
                }}
                className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-light transition-all duration-300"
              >
                Done
              </button>
              <button
                onClick={() => router.push(`/track?order=${orderCode}`)}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                Track Order
              </button>
            </div>
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
                  <div className="flex justify-between text-gray-600">
                    <span>Products Total:</span>
                    <span className="font-semibold">
                      ₦{productsTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee:</span>
                    <span className="font-semibold">
                      ₦{deliveryFee.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-foreground pt-3 border-t">
                    <span>Grand Total:</span>
                    <span className="text-primary">
                      ₦{grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setShowNameError(false);
                      }}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 border ${
                        showNameError ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {showNameError && (
                      <p className="text-red-500 text-sm mt-1">
                        Please enter your name
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setShowEmailError(false);
                      }}
                      placeholder="john@example.com"
                      className={`w-full px-4 py-3 border ${
                        showEmailError ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {showEmailError && (
                      <p className="text-red-500 text-sm mt-1">
                        Please enter a valid email
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setShowPhoneError(false);
                      }}
                      placeholder="08012345678"
                      className={`w-full px-4 py-3 border ${
                        showPhoneError ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary`}
                    />
                    {showPhoneError && (
                      <p className="text-red-500 text-sm mt-1">
                        Please enter your phone number
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setShowAddressError(false);
                      }}
                      placeholder="15 Admiralty Way, Lekki Phase 1"
                      rows={2}
                      className={`w-full px-4 py-3 border ${
                        showAddressError ? "border-red-500" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
                    />
                    {showAddressError && (
                      <p className="text-red-500 text-sm mt-1">
                        Please enter your address
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Delivery Location <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <optgroup label=" Campus">
                        <option value="FUTA">FUTA (Free Delivery)</option>
                      </optgroup>

                      <optgroup label=" Ondo State">
                        <option value="Akure">Akure (₦1,000)</option>
                        <option value="Ondo">Ondo (₦2,000)</option>
                      </optgroup>

                      <optgroup label=" South West">
                        <option value="Ekiti">Ekiti (₦3,000)</option>
                        <option value="Osun">Osun (₦4,000)</option>
                        <option value="Oyo">Oyo/Ibadan (₦4,500)</option>
                        <option value="Ogun">Ogun (₦5,000)</option>
                        <option value="Lagos">Lagos (₦6,000)</option>
                        <option value="Kwara">Kwara (₦5,000)</option>
                      </optgroup>

                      <optgroup label=" South South">
                        <option value="Edo">Edo (₦6,000)</option>
                        <option value="Delta">Delta (₦7,000)</option>
                        <option value="Rivers">Rivers (₦8,000)</option>
                        <option value="Bayelsa">Bayelsa (₦8,000)</option>
                        <option value="Akwa Ibom">Akwa Ibom (₦8,500)</option>
                        <option value="Cross River">
                          Cross River (₦9,000)
                        </option>
                      </optgroup>

                      <optgroup label=" South East">
                        <option value="Anambra">Anambra (₦7,000)</option>
                        <option value="Enugu">Enugu (₦7,500)</option>
                        <option value="Ebonyi">Ebonyi (₦7,500)</option>
                        <option value="Imo">Imo (₦8,000)</option>
                        <option value="Abia">Abia (₦8,000)</option>
                      </optgroup>

                      <optgroup label=" North Central">
                        <option value="Kogi">Kogi (₦6,000)</option>
                        <option value="Niger">Niger (₦8,000)</option>
                        <option value="Abuja">Abuja/FCT (₦8,000)</option>
                        <option value="Nasarawa">Nasarawa (₦8,500)</option>
                        <option value="Benue">Benue (₦9,000)</option>
                        <option value="Plateau">Plateau (₦9,000)</option>
                      </optgroup>

                      <optgroup label=" North West">
                        <option value="Kaduna">Kaduna (₦10,000)</option>
                        <option value="Zamfara">Zamfara (₦11,000)</option>
                        <option value="Kano">Kano (₦12,000)</option>
                        <option value="Katsina">Katsina (₦12,000)</option>
                        <option value="Sokoto">Sokoto (₦12,000)</option>
                        <option value="Kebbi">Kebbi (₦12,000)</option>
                        <option value="Jigawa">Jigawa (₦12,000)</option>
                      </optgroup>

                      <optgroup label=" North East">
                        <option value="Bauchi">Bauchi (₦10,000)</option>
                        <option value="Gombe">Gombe (₦11,000)</option>
                        <option value="Taraba">Taraba (₦11,000)</option>
                        <option value="Adamawa">Adamawa (₦12,000)</option>
                        <option value="Borno">Borno (₦13,000)</option>
                        <option value="Yobe">Yobe (₦13,000)</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleBankTransferOrder}
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-primary-light transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Processing..." : "Pay via Bank Transfer"}
                  </button>

                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-600 text-white py-4 rounded-full font-bold text-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Order on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
