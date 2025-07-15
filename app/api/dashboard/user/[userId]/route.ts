import {query} from '@/app/lib/db';
import {RowDataPacket} from 'mysql2';

export async function GET(request: Request, props: {params: Promise<{userId: string}>}) {
  const params = await props.params;

  const {
    userId
  } = params;

  const dashboardsData = await query<RowDataPacket[]>('SELECT * FROM dashboards WHERE userId = ?;', [userId]);
  return Response.json({data: dashboardsData});
}