"use client";

import { useState } from "react";
import { useCart } from "./cart-context";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart, cart } = useCart();

  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (isInCart) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      return;
    }
    addToCart(product);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div
      className="product-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-border relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showNotification && (
        <div className="absolute top-4 left-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-10 animate-fade-in text-center text-sm font-semibold">
          {isInCart ? "Already in cart! " : "Added to cart! "}
        </div>
      )}

      <div className="relative h-64 md:h-72 overflow-hidden bg-neutral">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-serif font-bold text-foreground mb-2">
          {product.name}
        </h3>
        <p className="text-sm md:text-base text-text-muted mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl md:text-2xl font-bold text-primary">
            {product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 ${
              isInCart
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary-light hover:scale-105"
            } text-white rounded-full text-sm font-semibold transition-all duration-300 transform`}
          >
            {isInCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { useCart } from "./cart-context";

// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: string;
//   originalPrice?: number;
//   image: string;
// }

// interface ProductCardProps {
//   product: Product;
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [showNotification, setShowNotification] = useState(false);
//   const { addToCart, cart } = useCart();

//   const isInCart = cart.some((item) => item.id === product.id);

//   const originalPrice =
//     product.originalPrice || parseFloat(product.price.replace(/[₦,]/g, ""));
//   const discountedPrice = originalPrice * 0.8;

//   const handleAddToCart = () => {
//     if (isInCart) {
//       setShowNotification(true);
//       setTimeout(() => setShowNotification(false), 2000);
//       return;
//     }
//     addToCart(product);
//     setShowNotification(true);
//     setTimeout(() => setShowNotification(false), 2000);
//   };

//   return (
//     <div
//       className="product-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl border border-border relative"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {showNotification && (
//         <div className="absolute top-4 left-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-10 animate-fade-in text-center text-sm font-semibold">
//           {isInCart ? "Already in cart! " : "Added to cart! "}
//         </div>
//       )}

//       <div className="absolute top-4 right-4 z-10 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
//         20% OFF
//       </div>

//       <div className="relative h-64 md:h-72 overflow-hidden bg-neutral">
//         <img
//           src={product.image || "/placeholder.svg"}
//           alt={product.name}
//           className={`w-full h-full object-cover transition-transform duration-500 ${
//             isHovered ? "scale-110" : "scale-100"
//           }`}
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
//       </div>

//       <div className="p-5 md:p-6">
//         <h3 className="text-lg md:text-xl font-serif font-bold text-foreground mb-2">
//           {product.name}
//         </h3>
//         <p className="text-sm md:text-base text-text-muted mb-4 line-clamp-2">
//           {product.description}
//         </p>

//         <div className="flex items-center justify-between">
//           <div className="flex flex-col">
//             <span className="text-sm text-gray-400 line-through">
//               ₦{originalPrice.toLocaleString()}
//             </span>
//             <span className="text-xl md:text-2xl font-bold text-primary">
//               ₦{discountedPrice.toLocaleString()}
//             </span>
//           </div>
//           <button
//             onClick={handleAddToCart}
//             className={`px-4 py-2 ${
//               isInCart
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-primary hover:bg-primary-light hover:scale-105"
//             } text-white rounded-full text-sm font-semibold transition-all duration-300 transform`}
//           >
//             {isInCart ? "In Cart" : "Add to Cart"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
