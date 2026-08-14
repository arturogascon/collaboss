import { query } from "@/app/utils/db/query";

export type NewDashboard = {
  userId: string;
  title: string;
  description: string | null;
  color: string | null;
};

export type DashboardDetails = {
  title: string;
  description: string | null;
  color: string | null;
};

export type DashboardSummary = {
  id: string;
  title: string;
};

export async function getDashboardsByUserId(
  userId: string,
): Promise<Array<DashboardSummary>> {
  const [rows] = await query(
    `SELECT id, title FROM dashboards WHERE user_id = $1;`,
    [userId],
  );

  return rows as unknown as Array<DashboardSummary>;
}

export async function getDashboardById(
  id: number,
): Promise<DashboardDetails | undefined> {
  const [rows] = await query(
    `SELECT title, description, color FROM dashboards
      WHERE id = $1
      LIMIT 1;`,
    [id],
  );

  return rows[0] as DashboardDetails | undefined;
}

export async function doesDashboardTitleExists(
  userId: string,
  title: string,
): Promise<boolean> {
  const result = await query(
    `SELECT EXISTS(
        SELECT 1 FROM dashboards WHERE user_id = $1 AND title = $2
      ) AS title_exists;`,
    [userId, title],
  );

  return Boolean(result[0][0].titleExists);
}

export async function insertDashboard(
  newDashboard: NewDashboard,
): Promise<void> {
  await query(
    `INSERT INTO dashboards (user_id, title, description, color)
      VALUES ($1, $2, $3, $4);`,
    [
      newDashboard.userId,
      newDashboard.title,
      newDashboard.description,
      newDashboard.color,
    ],
  );
}

export type UpdatedDashboard = {
  id: string;
  title: string;
  description: string | null;
};

export async function updateDashboard(
  updatedDashboard: UpdatedDashboard,
): Promise<boolean> {
  const [, rowCount] = await query(
    `UPDATE dashboards
      SET title = $1, description = $2
      WHERE id = $3;`,
    [updatedDashboard.title, updatedDashboard.description, updatedDashboard.id],
  );

  return rowCount > 0;
}
