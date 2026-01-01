"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Products from "@/components/products";
import About from "@/components/about";
import Testimonials from "@/components/testimonials";
import Footer from "@/components/footer";
// import WhatsAppButton from "@/components/whatsapp-button";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <Products />
      <About />
      <Testimonials />
      <Footer />
      {/* <WhatsAppButton /> */}
    </main>
  );
}
