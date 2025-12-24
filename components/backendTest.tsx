"use client";

import { useEffect } from "react";

export default function BackendTest() {
  useEffect(() => {
    fetch("https://mauve-backend1.onrender.com/api/health")
      .then((res) => res.json())
      .then((data) => console.log(" Backend says:", data))
      .catch((err) => console.error(" Backend error:", err));
  }, []);

  return null;
}
