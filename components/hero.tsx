"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleShopNow = () => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden pt-20"
    >
      <div className="absolute inset-0">
        <img
          src="/mauve4.jpg"
          alt="Mauve Lip Gloss Collection"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-accent-dark opacity-50" />
      </div>

      <div className="absolute top-10 right-10 w-72 h-72 bg-primary-light rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -bottom-8 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        <div
          className={`text-center ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4 leading-tight drop-shadow-lg">
            Confidence in Every Swipe
          </h1>
          <p className="text-lg md:text-xl text-text-muted mb-8 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
            Subtle, sophisticated, you — made for every shade of beauty.
          </p>
          <button
            onClick={handleShopNow}
            className="px-8 py-3 md:py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary-light shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}
