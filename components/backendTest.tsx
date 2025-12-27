"use client";

import { useEffect } from "react";

export default function BackendTest() {
  useEffect(() => {
    fetch("https://mauve-backend.onrender.com")
      .then((res) => res.json())
      .then((data) => console.log(" Backend says:", data))
      .catch((err) => console.error(" Backend error:", err));
  }, []);

  return null;
}
