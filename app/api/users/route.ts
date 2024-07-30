/* import {NextResponse} from 'next/server';
import {RowDataPacket} from 'mysql2';
import {query} from '@/app/lib/db';

export async function GET() {
  const [users] = await query<RowDataPacket[]>('SELECT * from users;');

  return NextResponse.json({users});
}
 */
