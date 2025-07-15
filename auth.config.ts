import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isUnloggedUserRoute = /\/(login|signup)/.test(nextUrl.pathname);

      if (isLoggedIn && isUnloggedUserRoute) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // when adding dashboard id's, consider adding \/(create|list)
      const isOnProtectedRoute = /\/(profile|dashboard)/.test(nextUrl.pathname);
      return isOnProtectedRoute ? !!isLoggedIn : true;
    },
    async redirect({ url, baseUrl }) {
      const searchParams = new URLSearchParams(url);
      const callbackUrl = searchParams.get("callbackUrl");

      if (callbackUrl) {
        return callbackUrl;
      } else {
        return baseUrl + "/profile";
      }
    },
  },
  providers: [], // Add providers with an empty array for now
  session: {
    maxAge: 3600,
  },
} satisfies NextAuthConfig;
