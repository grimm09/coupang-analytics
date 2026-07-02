import { NextRequest, NextResponse } from "next/server";

const REALM = "Coupang Analytics";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
      "Cache-Control": "no-store",
    },
  });
}

export function middleware(request: NextRequest) {
  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPassword = process.env.BASIC_AUTH_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return new NextResponse("Basic Auth is not configured.", {
      status: 503,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return unauthorized();
  }

  const [scheme, encodedCredentials] = authHeader.split(" ");

  if (scheme !== "Basic" || !encodedCredentials) {
    return unauthorized();
  }

  let decodedCredentials = "";

  try {
    decodedCredentials = atob(encodedCredentials);
  } catch {
    return unauthorized();
  }

  const separatorIndex = decodedCredentials.indexOf(":");

  if (separatorIndex === -1) {
    return unauthorized();
  }

  const submittedUser = decodedCredentials.slice(0, separatorIndex);
  const submittedPassword = decodedCredentials.slice(separatorIndex + 1);

  if (
    submittedUser !== expectedUser ||
    submittedPassword !== expectedPassword
  ) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
