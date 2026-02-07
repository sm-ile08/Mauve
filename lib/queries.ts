import { client } from "./sanity";

export interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  description?: string;
  image: any;
  images?: any[];
  category?: string;
  inStock: boolean;
  featured: boolean;
  shade?: string;
  size?: string;
}

export async function getProducts(): Promise<Product[]> {
  return client.fetch(
    `*[_type == "product" && inStock == true] | order(displayOrder asc, _createdAt desc) {
      _id,
      name,
      slug,
      price,
      description,
      image,
      images,
      category,
      inStock,
      featured,
      shade,
      size
    }`,
  );
}
export interface DiscountCode {
  _id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  active: boolean;
  expiryDate?: string;
  minimumOrderAmount?: number;
  maxUses?: number;
  currentUses: number;
}

export async function validateDiscountCode(
  code: string,
): Promise<DiscountCode | null> {
  const now = new Date().toISOString();

  const result = await client.fetch(
    `*[_type == "discountCode" && code == $code && active == true][0] {
      _id,
      code,
      type,
      value,
      active,
      expiryDate,
      minimumOrderAmount,
      maxUses,
      currentUses
    }`,
    { code: code.toUpperCase() },
  );

  if (!result) return null;

  if (result.expiryDate && result.expiryDate < now) return null;

  if (result.maxUses && result.currentUses >= result.maxUses) return null;

  return result;
}
