import { query } from "@/app/utils/db/query";
import { RowDataPacket } from "mysql2";

export async function GET(
  request: Request,
  props: { params: Promise<{ userId: string }> },
) {
  const params = await props.params;

  const { userId } = params;

  const dashboardsData = await query<RowDataPacket[]>(
    "SELECT id, user_id, title, created_date FROM dashboards WHERE user_id = ?;",
    [userId],
  );
  return Response.json({ data: dashboardsData });
}
