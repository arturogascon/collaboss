import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/app/utils/db/users";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await getUserByEmail(email as string);

        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password as string,
          user.password,
        );
        if (passwordsMatch) return user;

        return null;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      return session;
    },
  },
});
