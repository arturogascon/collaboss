import {query} from '@/app/lib/db';
import {RowDataPacket} from 'mysql2';

export async function GET(request: Request, {params: {id}}: {params: {id: string}}) {
  const dashboardData = await query<RowDataPacket[]>('SELECT * FROM dashboards WHERE id = ?;', [id]);
  return Response.json({data: dashboardData});
}

export const dynamic = 'force-dynamic';
