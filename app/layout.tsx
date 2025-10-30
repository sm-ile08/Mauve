import type React from "react";
import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CartProvider } from "../components/cart-context";
import Cart from "../components/cart";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Mauve - Luxury Lip Glosses",
  description:
    "Luxury, shine, and care — made for every shade of beauty. Nigerian beauty brand with natural lip glosses.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta
          name="google-site-verification"
          content="XLo1sCVg0cYZRdtWOUKVKH3L1WFob7wbvfvwk3UW4fo"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${playfairDisplay.variable} ${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        <CartProvider>
          {children}
          <Cart />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
