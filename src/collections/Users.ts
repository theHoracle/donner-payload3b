import { Access, CollectionConfig } from "payload";


const adminsAndUser: Access = ({ req: { user } }) => {
  if (user && user.email === "admin") return true;

  return {
    id: {
      equals: user?.id,
    },
  };
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      generateEmailHTML: ({ token, user }) => {
        // Use the token provided to allow your user to verify their account
        const url = `${process.env.NEXT_PUBLIC_APP_URL}?token=${token}`

        return `Hey ${user.email}, verify your email by clicking here: ${url}`
      },
    },
  },
  access: {
    read: adminsAndUser,
    create: () => true,
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin",
  },
  admin: {
    hidden: ({ user }) => user?.role !== "admin",
    // defaultColumns: ["id"],
  },
  fields: [
    {
      name: "role",
      label: "Role",
      required: true,
      defaultValue: "user",
      admin: {},
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Volunteer", value: "volunteer" },
        { label: "User", value: "user" },
      ],
    },
  ],
};
