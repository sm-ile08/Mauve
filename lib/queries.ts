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
    `*[_type == "product" && inStock == true] | order(_createdAt desc) {
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
