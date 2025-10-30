"use client"

import { useEffect, useRef, useState } from "react"
import ProductCard from "./product-card"

const products = [
  {
    id: 1,
    name: "Mauve Glow",
    description: "Soft mauve with subtle shimmer for an effortless glow",
    price: "₦7,500",
    image: "/mauve-lip-gloss-tube-luxury.jpg",
  },
  {
    id: 2,
    name: "Velvet Nude",
    description: "Creamy nude with velvety finish for timeless elegance",
    price: "₦7,000",
    image: "/nude-lip-gloss-luxury-product.jpg",
  },
  {
    id: 3,
    name: "Glass Shine",
    description: "Crystal-clear gloss with high-shine finish and plumping effect",
    price: "₦8,000",
    image: "/clear-glass-lip-gloss-luxury.jpg",
  },
  {
    id: 4,
    name: "Rosy Tint",
    description: "Delicate rose with natural tint for a fresh, dewy look",
    price: "₦7,500",
    image: "/rose-pink-lip-gloss-luxury.jpg",
  },
  {
    id: 5,
    name: "Peach Pop",
    description: "Vibrant peach with warm undertones for a bold statement",
    price: "₦7,500",
    image: "/peach-lip-gloss-luxury-product.jpg",
  },
  {
    id: 6,
    name: "Clear Dream",
    description: "Transparent with holographic sparkle for magical shimmer",
    price: "₦8,000",
    image: "/holographic-clear-lip-gloss.jpg",
  },
]

export default function Products() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="products" ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 md:mb-16 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">Our Collection</h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Discover our curated selection of luxury lip glosses, each crafted with care and quality
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${isVisible ? "animate-stagger" : "opacity-0"}`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
