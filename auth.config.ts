import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isRootRoute = nextUrl.pathname === "/";
      const isUnloggedUserRoute = /^\/(login|signup)/.test(nextUrl.pathname);

      if (isLoggedIn && (isUnloggedUserRoute || isRootRoute)) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      const isOnProtectedRoute = /^\/(profile|dashboard)/.test(
        nextUrl.pathname,
      );
      return isOnProtectedRoute ? !!isLoggedIn : true;
    },
    async redirect({ url, baseUrl }) {
      try {
        const urlObj = new URL(url, baseUrl);
        const callbackUrl = urlObj.searchParams.get("callbackUrl");

        if (callbackUrl) {
          const callbackUrlObj = new URL(callbackUrl, baseUrl);
          if (callbackUrlObj.origin === baseUrl) {
            return callbackUrlObj.toString();
          }
        }
        return baseUrl + "/dashboard";
      } catch {
        return baseUrl + "/dashboard";
      }
    },
  },
  providers: [],
  session: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
} satisfies NextAuthConfig;
