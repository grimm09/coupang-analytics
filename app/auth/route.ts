import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "coupang_dashboard_auth";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 12;

async function createAuthToken(user: string, password: string) {
  const input = `${user}:${password}`;
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: NextRequest) {
  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPassword = process.env.BASIC_AUTH_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return new NextResponse("Auth is not configured on Vercel.", {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  const formData = await request.formData();
  const submittedUser = String(formData.get("username") ?? "");
  const submittedPassword = String(formData.get("password") ?? "");

  if (
    submittedUser !== expectedUser ||
    submittedPassword !== expectedPassword
  ) {
    return NextResponse.redirect(new URL("/?auth=failed", request.url));
  }

  const token = await createAuthToken(expectedUser, expectedPassword);
  const response = NextResponse.redirect(new URL("/", request.url));

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });

  return response;
}

export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
}
