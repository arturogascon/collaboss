import { query } from "@/app/utils/db/query";
import { RowDataPacket } from "mysql2";

export type NewDashboard = {
  userId: string;
  title: string;
  description: string | null;
  color: string | null;
};

export async function getDashboardTitleById(
  id: number,
): Promise<string | undefined> {
  const [rows] = await query<RowDataPacket[]>(
    `SELECT title FROM dashboards
      WHERE id = ?
      LIMIT 1;`,
    [id],
  );

  return rows[0]?.title;
}

export async function doesDashboardTitleExists(
  userId: string,
  title: string,
): Promise<boolean> {
  const result = await query<RowDataPacket[]>(
    `SELECT EXISTS(
        SELECT 1 FROM dashboards WHERE user_id = ? AND title = ?
      ) AS titleExists;`,
    [userId, title],
  );

  return Boolean(result[0][0].titleExists);
}

export async function insertDashboard(
  newDashboard: NewDashboard,
): Promise<void> {
  await query<RowDataPacket[]>(
    `INSERT INTO dashboards (user_id, title, description, color)
      VALUES (?, ?, ?, ?);`,
    [
      newDashboard.userId,
      newDashboard.title,
      newDashboard.description,
      newDashboard.color,
    ],
  );
}
