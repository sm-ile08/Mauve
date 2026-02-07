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

export default function ConfirmPayments() {
  const [orderCode, setOrderCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<MessageType>("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrders, setShowOrders] = useState<boolean>(false);

  const handleConfirmPayment = async () => {};

  const fetchPendingOrders = async () => {};

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Confirm Payments</h1>
    </div>
  );
}
