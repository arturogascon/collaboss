'use server';
import {query} from '@/app/lib/db';
import {hashPassword} from '@/app/utils/hash/bcrypt';
import {error} from 'console';
import {RowDataPacket} from 'mysql2';
import {redirect} from 'next/navigation';

interface User {
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

  const existentUserData = await query<RowDataPacket[]>(
    `SELECT * FROM users
    WHERE email = ?`,
    [newUser.email]
  );

  const existenUsers = existentUserData[0] as RowDataPacket[];
  const doesUserExists = existenUsers.find((user) => user.email === newUser.email);

  if (doesUserExists) {
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

  return {
    message: '',
    error: '',
  };
}
