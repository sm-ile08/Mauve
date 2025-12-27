"use client";

import { useState, FormEvent } from "react";

interface Order {
  id: number;
  order_code: string;
  customer_name: string;
  customer_email: string;
  total_amount: string;
  created_at: string;
}

type MessageType = "success" | "error" | "";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  const [orderCode, setOrderCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<MessageType>("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrders, setShowOrders] = useState<boolean>(false);

  const ADMIN_PASSWORD = "MauveAdmin2024";

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleConfirmPayment = async () => {
    if (!orderCode.trim()) {
      setMessage("Please enter an order code");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `https://mauve-backend.onrender.com/api/admin/orders/${orderCode}/confirm-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            verified_by: "Admin",
            notes: "Payment verified and confirmed",
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setMessage(` Payment confirmed successfully! Email sent to customer.`);
        setMessageType("success");
        setOrderCode("");
        if (showOrders) {
          fetchPendingOrders();
        }
      } else {
        setMessage(`Error: ${result.error}`);
        setMessageType("error");
      }
    } catch (error) {
      console.error("Payment confirmation error:", error);
      setMessage("Failed to confirm payment. Please check your connection.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://mauve-backend1..com/api/admin/orders?status=pending_payment&limit=50"
      );
      const result = await response.json();

      if (response.ok) {
        setOrders(result.orders);
        setShowOrders(true);
      } else {
        setMessage("Failed to fetch orders");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Fetch orders error:", error);
      setMessage("Failed to fetch orders");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
              Admin Access
            </h1>
            <p className="text-gray-600">
              Enter password to access admin panel
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-full font-bold text-lg hover:bg-primary-light transition-all duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
              Admin Payment Confirmation
            </h1>
            <p className="text-gray-600">
              Confirm customer payments and send automatic email notifications
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="absolute top-8 right-8 bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Confirm Payment Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Confirm Payment
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Order Code
              </label>
              <input
                type="text"
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value.toUpperCase())}
                placeholder="e.g., MAUVE-L2X9KP3-A1B2C3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleConfirmPayment();
                  }
                }}
              />
            </div>

            <button
              onClick={handleConfirmPayment}
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-full font-bold text-lg hover:bg-primary-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Confirming..." : "Confirm Payment & Send Email"}
            </button>

            {message && (
              <div
                className={`p-4 rounded-lg ${
                  messageType === "success"
                    ? "bg-green-50 border border-green-200 text-green-800"
                    : "bg-red-50 border border-red-200 text-red-800"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              Pending Orders
            </h2>
            <button
              onClick={fetchPendingOrders}
              disabled={loading}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full font-semibold hover:bg-gray-300 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Refresh Orders"}
            </button>
          </div>

          {showOrders && (
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-lg">No pending orders found!</p>
                  <p className="text-sm mt-2">
                    All orders have been processed.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-semibold text-gray-700">
                          Order Code
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-700">
                          Customer
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-700">
                          Amount
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-700">
                          Date
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-700">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="p-3 font-mono text-sm">
                            {order.order_code}
                          </td>
                          <td className="p-3">
                            <div className="text-sm">
                              <p className="font-semibold">
                                {order.customer_name}
                              </p>
                              <p className="text-gray-500 text-xs">
                                {order.customer_email}
                              </p>
                            </div>
                          </td>
                          <td className="p-3 font-bold text-primary">
                            ₦{parseFloat(order.total_amount).toLocaleString()}
                          </td>
                          <td className="p-3 text-sm text-gray-600">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => {
                                setOrderCode(order.order_code);
                                handleConfirmPayment();
                              }}
                              className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary-light transition-all duration-300"
                            >
                              Confirm
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mt-6 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
            <li>
              Customer will receive an order code after placing their order
            </li>
            <li>
              Customer makes bank transfer with the order code as reference
            </li>
            <li>Check your bank account for incoming transfers</li>
            <li>
              Enter the order code above and click "Confirm Payment & Send
              Email"
            </li>
            <li>
              System will automatically send a confirmation email to the
              customer
            </li>
            <li>Order status will be updated to "Paid"</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
