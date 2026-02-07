import { defineField, defineType } from "sanity";

export default defineType({
  name: "discountCode",
  title: "Discount Codes",
  type: "document",
  fields: [
    defineField({
      name: "code",
      title: "Discount Code",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "e.g., SAVE20, WELCOME10, FREESHIP",
    }),
    defineField({
      name: "type",
      title: "Discount Type",
      type: "string",
      options: {
        list: [
          { title: "Percentage (%)", value: "percentage" },
          { title: "Fixed Amount (₦)", value: "fixed" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "value",
      title: "Discount Value",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
      description: "e.g., 20 for 20% off OR 5000 for ₦5000 off",
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to disable this code",
    }),
    defineField({
      name: "expiryDate",
      title: "Expiry Date",
      type: "datetime",
      description: "Optional: Code expires after this date",
    }),
    defineField({
      name: "minimumOrderAmount",
      title: "Minimum Order Amount (₦)",
      type: "number",
      description: "Optional: Minimum amount required to use this code",
    }),
    defineField({
      name: "maxUses",
      title: "Maximum Uses",
      type: "number",
      description: "Optional: Limit how many times this code can be used",
    }),
    defineField({
      name: "currentUses",
      title: "Current Uses",
      type: "number",
      initialValue: 0,
      readOnly: true,
      description: "How many times this code has been used",
    }),
  ],
  preview: {
    select: {
      code: "code",
      type: "type",
      value: "value",
      active: "active",
    },
    prepare(selection) {
      const { code, type, value, active } = selection;
      const discount =
        type === "percentage" ? `${value}%` : `₦${value.toLocaleString()}`;
      return {
        title: code,
        subtitle: `${discount} off ${!active ? "(Inactive)" : ""}`,
      };
    },
  },
});
