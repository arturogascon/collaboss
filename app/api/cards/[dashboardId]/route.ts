import {query} from '@/app/utils/db/query';
import {RowDataPacket} from 'mysql2';

export async function GET(request: Request, props: {params: Promise<{dashboardId: string}>}) {
  const params = await props.params;

  const {
    dashboardId
  } = params;

  const dashboardData = await query<RowDataPacket[]>('SELECT * FROM cards WHERE dashboard_id = ?;', [dashboardId]);
  return Response.json({data: dashboardData});
}
