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

      const isOnProtectedRoute = /\/(profile|dashboard)/.test(nextUrl.pathname);
      return isOnProtectedRoute ? !!isLoggedIn : true;
    },
    async redirect({ url, baseUrl }) {
      try {
        const urlObj = new URL(url, baseUrl);
        const callbackUrl = urlObj.searchParams.get("callbackUrl");
        return callbackUrl || baseUrl + "/profile";
      } catch {
        return baseUrl + "/profile";
      }
    },
  },
  providers: [],
  session: {
    maxAge: 3600,
  },
} satisfies NextAuthConfig;
