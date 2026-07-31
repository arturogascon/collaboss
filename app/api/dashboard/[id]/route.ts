import {query} from '@/app/utils/db/query';
import {RowDataPacket} from 'mysql2';

export async function GET(request: Request, props: {params: Promise<{id: string}>}) {
  const params = await props.params;

  const {
    id
  } = params;

  const dashboardData = await query<RowDataPacket[]>('SELECT * FROM dashboards WHERE id = ?;', [id]);
  return Response.json({data: dashboardData});
}

export const dynamic = 'force-dynamic';
