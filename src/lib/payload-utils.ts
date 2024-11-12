import { User } from "@/payload-types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";

export const getServerSideUser = async (
  cookies: NextRequest["cookies"] | ReadonlyRequestCookies
) => {
  const token = cookies.get("JWTSession")?.value;
  

  const meRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000"}/api/users/me`,
    {
      headers: {
        Authorization: `JWT ${token}`,
      },
    }
  );
  
  const { user } = (await meRes.json()) as { user: User | null };

  return { user };
};
