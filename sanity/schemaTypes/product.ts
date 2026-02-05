import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Products",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: 'Click "Generate" to auto-create from product name',
    }),
    defineField({
      name: "image",
      title: "Main Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Additional Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Add more product images (optional)",
    }),
    defineField({
      name: "price",
      title: "Price (in Naira)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Product description for customers",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Lip Gloss", value: "lip-gloss" },
          { title: "Lipstick", value: "lipstick" },
          { title: "Lip Balm", value: "lip-balm" },
          { title: "Lip Liner", value: "lip-liner" },
          { title: "Makeup", value: "makeup" },
          { title: "Skincare", value: "skincare" },
          { title: "Accessories", value: "accessories" },
        ],
      },
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
      description: "Uncheck if product is out of stock",
    }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
      description: "Show on homepage as featured product",
    }),
    defineField({
      name: "displayOrder",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first (1 = first, 2 = second, etc.)",
      validation: (Rule) => Rule.integer().positive().min(1),
      initialValue: 999,
    }),
    defineField({
      name: "shade",
      title: "Shade/Color",
      type: "string",
      description: "e.g., Nude, Pink, Red, Berry",
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      description: "e.g., 5ml, 10ml, 15ml",
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients",
      type: "text",
      rows: 3,
      description: "List of ingredients (optional)",
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [{ type: "string" }],
      description: "Key benefits (e.g., Long-lasting, Moisturizing)",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      price: "price",
      inStock: "inStock",
      displayOrder: "displayOrder",
    },
    prepare(selection) {
      const { title, media, price, inStock, displayOrder } = selection;
      return {
        title,
        subtitle: `#${displayOrder || "?"} - ₦${price?.toLocaleString() || 0} ${!inStock ? "(Out of Stock)" : ""}`,
        media,
      };
    },
  },
});
