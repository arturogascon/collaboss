"use server";

import { query } from "@/app/utils/db/query";
import { RowDataPacket } from "mysql2";
import { revalidatePath } from "next/cache";

export async function createDashboard(prevState: any, formData: FormData) {
  try {
    const newDashboardValues = {
      userId: formData.get("userId") as string,
      title: formData.get("title") as string,
    };

    await query<RowDataPacket[]>(
      `INSERT INTO dashboards (user_id, title)
    VALUES (?, ?);`,
      [newDashboardValues.userId, newDashboardValues.title]
    );

    revalidatePath("/dashboard");

    return {
      message: "Success",
    };
  } catch (error) {
    return {
      error: "Server Error: Failed to create new dashboard",
    };
  }
}
