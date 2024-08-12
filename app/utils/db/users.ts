import {query} from '@/app/lib/db';
import {User} from '@/app/utils/serverActions/authActions';
import {RowDataPacket} from 'mysql2';

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await query<RowDataPacket[]>(
      `SELECT * FROM users
            WHERE email = ?`,
      [email]
    );
    return user[0][0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
