'use server';
import {query} from '@/app/lib/db';
import {getUser} from '@/app/utils/db/users';
import {hashPassword} from '@/app/utils/hash/bcrypt';
import {RowDataPacket} from 'mysql2';
import {redirect} from 'next/navigation';
import {signIn, signOut} from '@/auth';
import {AuthError} from 'next-auth';

export interface User {
  name: string;
  email: string;
  password: string;
}

export async function signUp(prevState: any, formData: FormData) {
  const newUser: User = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const existentUser = await getUser(newUser.email);

  if (existentUser) {
    return {
      error: 'User email already exists',
    };
  }

  let addedUserData;

  newUser.password = await hashPassword(newUser.password);

  try {
    await query<RowDataPacket[]>(
      `INSERT INTO users (username, email, password) 
      VALUES (?, ?, ?);`,
      [newUser.name, newUser.email, newUser.password]
    );

    addedUserData = await query<RowDataPacket[]>(
      `SELECT id
      FROM users
      WHERE email = ?
      LIMIT 1;`,
      [newUser.email]
    );
  } catch (error) {
    return {
      error: 'Server error. Try again!',
    };
  }

  const addedUserId = (addedUserData as RowDataPacket[])[0][0].id;

  redirect('/user/' + addedUserId);
}

interface LoginData {
  email: string;
  password: string;
}

export async function logIn(prevState: any, formData: FormData) {
  const loginData: LoginData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logOut() {
  await signOut();
}
