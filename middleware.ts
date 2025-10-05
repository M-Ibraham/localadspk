import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const getUserFromAPI = async (token: string) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Check if API URL is available
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      return { user: null, isAuthenticated: false };
    }

    const res = await fetch(`${apiUrl}/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // ✅ prevent caching user info
    });

    if (!res.ok) {
      console.error("API request failed:", res.status, res.statusText);
      return { user: null, isAuthenticated: false };
    }

    const data = await res.json();
    return { user: data.user, isAuthenticated: true };
  } catch (error) {
    console.error("Error in getUserFromAPI:", error);
    return { user: null, isAuthenticated: false };
  }
};

const redirectToDashboard = (role: string, request: NextRequest) => {
  switch (role) {
    case "role":
      return NextResponse.redirect(new URL("/role", request.url));
    case "driver":
      return NextResponse.redirect(new URL("/dashboard/driver", request.url));
    case "admin":
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    case "business":
      return NextResponse.redirect(new URL("/dashboard/business", request.url));
    default:
      return NextResponse.redirect(new URL("/", request.url));
  }
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  let userRole: string | null = null;
  let isAuthenticated = false;

  if (token) {
    const result = await getUserFromAPI(token);
    isAuthenticated = result.isAuthenticated;
    userRole = result.user?.role || null;
  }

  // Redirect authenticated users away from login/register
  if (
    (pathname === "/login" || pathname === "/register") &&
    isAuthenticated &&
    !userRole
  ) {
    return redirectToDashboard("role", request);
  }

  // // Redirect authenticated users away from login/register
  // if ((pathname === "/login" || pathname === "/register") && isAuthenticated) {
  //   return redirectToDashboard(userRole!, request);
  // }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard") && isAuthenticated && !userRole) {
    return NextResponse.redirect(new URL("/role", request.url));
  }

  // Role-specific rule: user dont allow another role
  if (
    userRole &&
    isAuthenticated &&
    !pathname.startsWith(`/dashboard/${userRole}`)
  ) {
    return NextResponse.redirect(
      new URL(`/dashboard/${userRole}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
