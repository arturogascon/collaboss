import { query } from "@/app/utils/db/query";

export async function GET(
  request: Request,
  props: { params: Promise<{ userId: string }> },
) {
  const params = await props.params;

  const { userId } = params;

  const dashboardsData = await query(
    "SELECT id, user_id, title, created_date FROM dashboards WHERE user_id = $1;",
    [userId],
  );
  return Response.json({ data: dashboardsData });
}
