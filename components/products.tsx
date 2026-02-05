"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "./product-card";

const products = [
  {
    id: 1,
    name: "Glass Shine",
    description: "Soft clear with subtle shimmer for an effortless glow",
    price: "₦4,500",
    originalPrice: 4500,
    image: "/mauve6.jpeg",
  },
  {
    id: 2,
    name: "Soft Crush",
    description: "pink with velvety finish for timeless elegance",
    price: "₦4,500",
    originalPrice: 4500,
    image: "/mauve7.jpeg",
  },
  {
    id: 3,
    name: "Toffee Glow",
    description: "Nude gloss with high-shine finish",
    price: "₦4,500",
    originalPrice: 4500,
    image: "/mauve8.jpeg",
  },
  {
    id: 4,
    name: "Mauve Balm",
    description:
      "A rich, glossy balm that keeps your lips soft, smooth, and glow-ready all day.",
    price: "₦3,000",
    originalPrice: 3000,
    image: "/mauvebalm.jpeg",
  },
];

export default function Products() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-16 md:py-24 bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 md:mb-16 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Our Collection
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Discover our curated selection of luxury lip glosses, each crafted
            with care and quality
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${
            isVisible ? "animate-stagger" : "opacity-0"
          }`}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// "use client";

// import { useEffect, useRef, useState } from "react";
// import ProductCard from "./product-card";

// const products = [
//   {
//     id: 1,
//     name: "Glass Shine",
//     description: "Soft clear with subtle shimmer for an effortless glow",
//     price: "₦4,500",
//     originalPrice: 4500,
//     image: "/mauve6.jpeg",
//   },
//   {
//     id: 2,
//     name: "Soft Crush",
//     description: "pink with velvety finish for timeless elegance",
//     price: "₦4,500",
//     originalPrice: 4500,
//     image: "/mauve7.jpeg",
//   },
//   {
//     id: 3,
//     name: "Toffee Glow",
//     description: "Nude gloss with high-shine finish",
//     price: "₦4,500",
//     originalPrice: 4500,
//     image: "/mauve8.jpeg",
//   },
//   {
//     id: 4,
//     name: "Mauve Balm",
//     description:
//       "A rich, glossy balm that keeps your lips soft, smooth, and glow-ready all day.",
//     price: "₦3,000",
//     originalPrice: 3000,
//     image: "/mauvebalm.jpeg",
//   },
// ];

// export default function Products() {
//   const [isVisible, setIsVisible] = useState(true);
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(entry.target);
//         }
//       },
//       { threshold: 0.1 },
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section
//       id="products"
//       ref={sectionRef}
//       className="py-16 md:py-24 bg-background"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div
//           className={`text-center mb-12 md:mb-16 ${
//             isVisible ? "animate-fade-in" : "opacity-0"
//           }`}
//         >
//           <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
//             Our Collection
//           </h2>
//           <p className="text-lg text-text-muted max-w-2xl mx-auto">
//             Discover our curated selection of luxury lip glosses, each crafted
//             with care and quality
//           </p>

//           <div className="mt-6 inline-block bg-green-100 text-green-800 px-6 py-3 rounded-full font-bold text-lg shadow-md">
//             20% OFF All Products!
//           </div>
//         </div>

//         <div
//           className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${
//             isVisible ? "animate-stagger" : "opacity-0"
//           }`}
//         >
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
