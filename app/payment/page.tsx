// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export const dynamic = "force-dynamic";

// interface OrderDetails {
//   orderCode: string;
//   amount: number;
//   email: string;
// }

// export default function PaymentPage() {
//   const router = useRouter();

//   const [order, setOrder] = useState<OrderDetails | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [showThankYou, setShowThankYou] = useState(false);

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);

//     const orderCode = params.get("order");
//     const amount = params.get("amount");
//     const email = params.get("email");

//     if (!orderCode || !amount) {
//       router.replace("/");
//       return;
//     }

//     setOrder({
//       orderCode,
//       amount: Number(amount),
//       email: email ?? "",
//     });

//     setLoading(false);
//   }, [router]);

//   const copyText = (text: string, label: string) => {
//     navigator.clipboard.writeText(text);
//     alert(`${label} copied to clipboard`);
//   };

//   const completePayment = () => {
//     setShowThankYou(true);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-primary" />
//       </div>
//     );
//   }

//   if (showThankYou && order) {
//     return (
//       <div className="min-h-screen flex justify-center p-4 pt-12 bg-background">
//         <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl text-center">
//           <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-8 w-8 text-green-500"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </div>

//           <h1 className="text-2xl font-serif font-bold mb-3">
//             Thank You for Shopping with Us
//           </h1>

//           <div className="bg-primary/5 rounded-lg p-4 mb-6">
//             <p className="text-sm mb-1 text-gray-600">Your order code:</p>
//             <p className="text-xl font-mono font-bold text-primary mb-1">
//               {order.orderCode}
//             </p>
//             <p className="text-sm text-gray-600">
//               Keep this code safe for tracking
//             </p>
//           </div>

//           <div className="space-y-3">
//             <button
//               onClick={() => router.push(`/track?order=${order.orderCode}`)}
//               className="w-full rounded-full bg-primary py-3 font-bold text-white hover:bg-primary-light transition-all duration-300 shadow-lg"
//             >
//               Track Your Order
//             </button>

//             <button
//               onClick={() => router.push("/")}
//               className="w-full rounded-full bg-gray-800 py-3 font-semibold text-white hover:bg-gray-900 transition-all duration-300 shadow-lg"
//             >
//               Done
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background px-4 py-8">
//       <div className="mx-auto max-w-2xl">
//         <h1 className="mb-6 text-center text-3xl font-bold">
//           Complete Your Payment
//         </h1>

//         <div className="mb-6 rounded-2xl bg-white p-6 shadow-lg">
//           <div className="flex items-center justify-between border-b pb-4 mb-4">
//             <span className="font-semibold">Order Code</span>
//             <button
//               onClick={() => copyText(order!.orderCode, "Order code")}
//               className="font-mono font-bold text-primary"
//             >
//               {order!.orderCode}
//             </button>
//           </div>

//           <div className="mb-6 rounded-xl bg-primary/10 p-6 text-center">
//             <p className="text-sm mb-2">Amount to Pay</p>
//             <button
//               onClick={() => copyText(order!.amount.toString(), "Amount")}
//               className="text-4xl font-bold text-primary"
//             >
//               ₦{order!.amount.toLocaleString()}
//             </button>
//           </div>

//           <div className="space-y-3 rounded-lg bg-gray-50 p-4">
//             <div className="flex justify-between">
//               <span>Bank Name</span>
//               <span className="font-bold">Moniepoint</span>
//             </div>

//             <div className="flex justify-between">
//               <span>Account Number</span>
//               <button
//                 onClick={() => copyText("6470745840", "Account number")}
//                 className="font-bold text-primary"
//               >
//                 6470745840
//               </button>
//             </div>

//             <div className="flex justify-between">
//               <span>Account Name</span>
//               <span className="font-bold">Fabiyi Oluwaferanmi Esther</span>
//             </div>
//           </div>

//           <div className="mt-6 border-l-4 border-yellow-400 bg-yellow-50 p-4">
//             Use <strong>{order!.orderCode}</strong> as payment narration.
//           </div>
//         </div>

//         <button
//           onClick={completePayment}
//           className="w-full rounded-full bg-primary py-4 font-bold text-white"
//         >
//           I Have Completed the Transfer
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

interface OrderDetails {
  orderCode: string;
  amount: number;
  email: string;
}

export default function PaymentPage() {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const orderCode = params.get("order");
    const amount = params.get("amount");
    const email = params.get("email");

    if (!orderCode || !amount) {
      window.location.href = "/";
      return;
    }

    setOrder({
      orderCode,
      amount: Number(amount),
      email: email ?? "",
    });

    setLoading(false);
  }, []);

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} copied to clipboard`);
  };

  const completePayment = () => {
    setShowThankYou(true);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            border: "4px solid #73648C",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (showThankYou && order) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          padding: "16px",
          paddingTop: "48px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "512px",
            borderRadius: "16px",
            backgroundColor: "white",
            padding: "24px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              backgroundColor: "#d4edda",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "32px", height: "32px", color: "#28a745" }}
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

          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "12px",
            }}
          >
            Thank You for Shopping with Us
          </h1>

          <div
            style={{
              backgroundColor: "#f0e6f6",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "24px",
            }}
          >
            <p style={{ fontSize: "14px", marginBottom: "4px", color: "#666" }}>
              Your order code:
            </p>
            <p
              style={{
                fontSize: "20px",
                fontFamily: "monospace",
                fontWeight: "bold",
                color: "#73648C",
                marginBottom: "4px",
              }}
            >
              {order.orderCode}
            </p>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Keep this code safe for tracking
            </p>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <button
              onClick={() =>
                (window.location.href = `/track?order=${order.orderCode}`)
              }
              style={{
                width: "100%",
                borderRadius: "9999px",
                backgroundColor: "#73648C",
                padding: "12px",
                fontWeight: "bold",
                color: "white",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "all 0.3s",
              }}
            >
              Track Your Order
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              style={{
                width: "100%",
                borderRadius: "9999px",
                backgroundColor: "#333",
                padding: "12px",
                fontWeight: "600",
                color: "white",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                transition: "all 0.3s",
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "16px 16px 32px",
      }}
    >
      <div style={{ maxWidth: "672px", margin: "0 auto" }}>
        <h1
          style={{
            marginBottom: "24px",
            textAlign: "center",
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          Complete Your Payment
        </h1>

        <div
          style={{
            marginBottom: "24px",
            borderRadius: "16px",
            backgroundColor: "white",
            padding: "24px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #e5e5e5",
              paddingBottom: "16px",
              marginBottom: "16px",
            }}
          >
            <span style={{ fontWeight: "600" }}>Order Code</span>
            <button
              onClick={() => copyText(order.orderCode, "Order code")}
              style={{
                fontFamily: "monospace",
                fontWeight: "bold",
                color: "#73648C",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {order.orderCode}
            </button>
          </div>

          <div
            style={{
              marginBottom: "24px",
              borderRadius: "12px",
              backgroundColor: "#f0e6f6",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "14px", marginBottom: "8px", color: "#666" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#28a745",
                  backgroundColor: "#d4edda",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  marginRight: "8px",
                }}
              >
                20% OFF ALL PRODUCTS
              </span>
            </p>
            <p style={{ fontSize: "14px", marginBottom: "8px" }}>
              Amount to Pay
            </p>
            <button
              onClick={() => copyText(order.amount.toString(), "Amount")}
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#73648C",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              ₦{order.amount.toLocaleString()}
            </button>
            <p
              style={{
                fontSize: "12px",
                color: "#28a745",
                marginTop: "8px",
                fontStyle: "italic",
              }}
            >
              *Discount applied to products only
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Bank Name</span>
              <span style={{ fontWeight: "bold" }}>Moniepoint</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Account Number</span>
              <button
                onClick={() => copyText("6470745840", "Account number")}
                style={{
                  fontWeight: "bold",
                  color: "#73648C",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                6470745840
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Account Name</span>
              <span style={{ fontWeight: "bold" }}>
                Fabiyi Oluwaferanmi Esther
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: "24px",
              borderLeft: "4px solid #ffc107",
              backgroundColor: "#fff3cd",
              padding: "16px",
            }}
          >
            Use <strong>{order.orderCode}</strong> as payment narration.
          </div>
        </div>

        <button
          onClick={completePayment}
          style={{
            width: "100%",
            borderRadius: "9999px",
            backgroundColor: "#73648C",
            padding: "16px",
            fontWeight: "bold",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          I Have Completed the Transfer
        </button>
      </div>
    </div>
  );
}
