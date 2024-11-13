import { HTMLConverterFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { CollectionConfig } from "payload";

// Make a unique slug from the title string
function slugify(title: string) {
  return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

export const Causes: CollectionConfig = {
  slug: "causes",
  access: {
    read: ({ req }) => req.user?.role === "admin",
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  admin: {
    hidden: ({ user }) => user?.role === "user",
  },
  fields: [
    {
      name: "creator",
      type: "relationship",
      admin: {
        condition: () => false,
      },
      relationTo: "users",
      required: true,
      hasMany: false,
    },
    {
      name: "title", 
      label: "Title", 
      type: "text", 
      required: true 
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        hidden: true
      },
    },
    {
      name: "description",
      label: "Description",
      required: true,
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // The HTMLConverter Feature is the feature which manages the HTML serializers.
          // If you do not pass any arguments to it, it will use the default serializers.
          HTMLConverterFeature({}),
        ],
      }),
    },
    // useeful to parse description into html after creating new cause
    // lexicalHTML('description', { name: 'description_html' }),
    {
      name: "target",
      label: "Target in Naira",
      min: 50,
      type: "number",
      required: true,
    },
    {
      name: "raisedAmount",
      type: "number",
      defaultValue: 0,
      required: true,
      admin: {
        hidden: true,
      },
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
    },
    {
      name: "approved",
      label: "Donation approval status",
      type: "select",
      defaultValue: "pending",
      access: {
        create: ({ req }) => req.user?.role === "admin",
        read: ({ req }) => req.user?.role === "admin",
        update: ({ req }) => req.user?.role === "admin",
      },
      options: [
        {
          label: "Pending Approval",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
      ],
    },
    {
      name: "priceId",
      admin: {
        hidden: true,
      },
      type: "text",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
    },
    {
      name: "paystackId",
      admin: {
        hidden: true,
      },
      type: "text",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
    },
    {
      name: "images",
      label: "Cause Images",
      type: "array",
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: "Image",
        plural: "Images",
      },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create" || operation === "update") {
          if (data.title) {
            data.slug = slugify(data.title);
          }
        }
        return data;
      },
    ],
  },
};
