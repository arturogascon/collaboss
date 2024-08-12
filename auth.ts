import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import {getUser} from '@/app/utils/db/users';

export const {auth, signIn, signOut} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const {email, password} = credentials;
        const user = await getUser(email as string);

        if (!user) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password as string, user.password);
        if (passwordsMatch) return user;

        console.log('Invalid credentials!');
        return null;
      },
    }),
  ],
});
