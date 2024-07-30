import {query} from '@/app/lib/db';
import {RowDataPacket} from 'mysql2';

export async function GET(request: Request, {params: {dashboardId}}: {params: {dashboardId: string}}) {
  const dashboardData = await query<RowDataPacket[]>('SELECT * FROM cards WHERE dashboard_id = ?;', [dashboardId]);
  return Response.json({data: dashboardData});
}
