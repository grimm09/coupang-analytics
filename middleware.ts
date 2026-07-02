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

function renderLoginPage(errorMessage = "") {
  const errorHtml = errorMessage
    ? `<p class="error">${escapeHtml(errorMessage)}</p>`
    : "";

  return new NextResponse(
    `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>coupang.JY · Unlock</title>
    <style>
      :root {
        --bg-a: #f7f4ff;
        --bg-b: #eef8ff;
        --panel: rgba(255, 255, 255, 0.86);
        --text: #171827;
        --muted: #6f7285;
        --primary: #6757f3;
        --primary-dark: #5042d8;
        --border: rgba(103, 87, 243, 0.16);
        --danger: #ef4444;
      }

      * {
        box-sizing: border-box;
      }

      html,
      body {
        width: 100%;
        min-height: 100%;
        margin: 0;
      }

      body {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 28px;
        color: var(--text);
        font-family:
          Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          "Segoe UI", "Microsoft YaHei", sans-serif;
        background:
          radial-gradient(circle at 16% 20%, rgba(132, 105, 255, 0.24), transparent 32%),
          radial-gradient(circle at 82% 12%, rgba(75, 216, 221, 0.18), transparent 34%),
          linear-gradient(135deg, var(--bg-a), var(--bg-b));
      }

      .card {
        width: min(420px, 100%);
        padding: 34px;
        border: 1px solid var(--border);
        border-radius: 28px;
        background: var(--panel);
        box-shadow:
          0 24px 70px rgba(41, 38, 88, 0.16),
          inset 0 1px 0 rgba(255, 255, 255, 0.75);
        backdrop-filter: blur(18px);
      }

      .brand {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 24px;
        font-size: 17px;
        font-weight: 800;
        letter-spacing: -0.02em;
      }

      .brand-mark {
        width: 32px;
        height: 32px;
        border-radius: 12px;
        background: linear-gradient(135deg, #7c63ff, #25c5c9);
        box-shadow: 0 10px 24px rgba(103, 87, 243, 0.28);
      }

      h1 {
        margin: 0 0 10px;
        font-size: 28px;
        line-height: 1.18;
        letter-spacing: -0.04em;
      }

      .desc {
        margin: 0 0 26px;
        color: var(--muted);
        font-size: 15px;
        line-height: 1.7;
      }

      label {
        display: block;
        margin: 18px 0 8px;
        color: #3e4053;
        font-size: 13px;
        font-weight: 700;
      }

      input {
        width: 100%;
        height: 48px;
        padding: 0 15px;
        border: 1px solid rgba(23, 24, 39, 0.12);
        border-radius: 15px;
        outline: none;
        background: rgba(255, 255, 255, 0.88);
        color: var(--text);
        font-size: 15px;
        transition: border-color 0.18s ease, box-shadow 0.18s ease;
      }

      input:focus {
        border-color: rgba(103, 87, 243, 0.72);
        box-shadow: 0 0 0 4px rgba(103, 87, 243, 0.12);
      }

      button {
        width: 100%;
        height: 50px;
        margin-top: 24px;
        border: 0;
        border-radius: 16px;
        color: #fff;
        background: linear-gradient(135deg, var(--primary), var(--primary-dark));
        font-size: 15px;
        font-weight: 800;
        cursor: pointer;
        box-shadow: 0 16px 32px rgba(103, 87, 243, 0.26);
      }

      .error {
        margin: 16px 0 0;
        color: var(--danger);
        font-size: 13px;
        font-weight: 700;
      }

      .hint {
        margin: 18px 0 0;
        color: var(--muted);
        font-size: 12px;
        line-height: 1.6;
      }
    </style>
  </head>
  <body>
    <main class="card" aria-label="登录面板">
      <div class="brand">
        <span class="brand-mark" aria-hidden="true"></span>
        <span>coupang.JY</span>
      </div>
      <h1>访问验证</h1>
      <p class="desc">请输入访问凭证。验证通过后才会加载网站数据和水印层。</p>
      <form method="post" action="/__auth">
        <label for="username">用户名</label>
        <input id="username" name="username" autocomplete="username" required autofocus />
        <label for="password">密码</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required />
        <button type="submit">解锁网站</button>
      </form>
      ${errorHtml}
      <p class="hint">如果刚修改过 Vercel 环境变量，请重新 Redeploy 后再登录。</p>
    </main>
  </body>
</html>`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function middleware(request: NextRequest) {
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

  const expectedToken = await createAuthToken(expectedUser, expectedPassword);
  const currentToken = request.cookies.get(COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  if (currentToken === expectedToken && pathname !== "/__auth") {
    return NextResponse.next();
  }

  if (pathname === "/__auth" && request.method === "POST") {
    const formData = await request.formData();
    const submittedUser = String(formData.get("username") ?? "");
    const submittedPassword = String(formData.get("password") ?? "");

    if (
      submittedUser === expectedUser &&
      submittedPassword === expectedPassword
    ) {
      const redirectUrl = new URL("/", request.url);
      const response = NextResponse.redirect(redirectUrl);

      response.cookies.set(COOKIE_NAME, expectedToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: COOKIE_MAX_AGE_SECONDS,
      });

      return response;
    }

    return renderLoginPage("密码错误，请检查用户名和密码。");
  }

  if (pathname === "/__auth") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return renderLoginPage();
}

export const config = {
  matcher: ["/:path*"],
};
