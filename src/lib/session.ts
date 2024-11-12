import { cookies } from "next/headers";

export async function getJWTSession() {
  const session = (await cookies()).get("JWTSession")?.value;
  if (!session) return null;
  return session;
}

export async function setJWTSession(token: any) {
  const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
  (await cookies()).set("JWTSession", token, {
    expires: expiresInOneDay,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}