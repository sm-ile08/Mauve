"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface DiscountCode {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minimumOrderAmount?: number;
  maxUses?: number;
  currentUses?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  discountCode: DiscountCode | null;
  applyDiscountCode: (
    code: string,
  ) => Promise<{ success: boolean; message: string }>;
  removeDiscountCode: () => void;
  calculateDiscount: (subtotal: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<DiscountCode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("mauve-cart");
    const savedDiscount = localStorage.getItem("mauve-discount");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }

    if (savedDiscount) {
      try {
        setDiscountCode(JSON.parse(savedDiscount));
      } catch (error) {
        console.error("Error loading discount:", error);
      }
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("mauve-cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      if (discountCode) {
        localStorage.setItem("mauve-discount", JSON.stringify(discountCode));
      } else {
        localStorage.removeItem("mauve-discount");
      }
    }
  }, [discountCode, isInitialized]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
    setDiscountCode(null);
    localStorage.removeItem("mauve-cart");
    localStorage.removeItem("mauve-discount");
  };

  const applyDiscountCode = async (
    code: string,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      // Import the validation function
      const { validateDiscountCode } = await import("@/lib/queries");

      const discount = await validateDiscountCode(code);

      if (!discount) {
        return {
          success: false,
          message: "Invalid or expired discount code",
        };
      }

      setDiscountCode(discount);

      const discountText =
        discount.type === "percentage"
          ? `${discount.value}%`
          : `₦${discount.value.toLocaleString()}`;

      return {
        success: true,
        message: `Discount code applied! ${discountText} off`,
      };
    } catch (error) {
      console.error("Error validating discount code:", error);
      return {
        success: false,
        message: "Error validating discount code",
      };
    }
  };

  const removeDiscountCode = () => {
    setDiscountCode(null);
  };

  const calculateDiscount = (subtotal: number): number => {
    if (!discountCode) return 0;

    if (
      discountCode.minimumOrderAmount &&
      subtotal < discountCode.minimumOrderAmount
    ) {
      return 0;
    }

    if (discountCode.type === "percentage") {
      return Math.round((subtotal * discountCode.value) / 100);
    } else {
      return Math.min(discountCode.value, subtotal);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        discountCode,
        applyDiscountCode,
        removeDiscountCode,
        calculateDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
