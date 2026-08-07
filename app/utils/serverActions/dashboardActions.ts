"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateDashboardSchema } from "@/app/schemas/dashboard.schema";
import {
  doesDashboardTitleExists,
  insertDashboard,
} from "@/app/utils/db/dashboards";

export type CreateDashboardState = {
  error?: string;
};

export async function createDashboard(
  _prevState: CreateDashboardState,
  formData: FormData,
): Promise<CreateDashboardState> {
  const rawData = Object.fromEntries(formData.entries());
  const result = CreateDashboardSchema.safeParse(rawData);

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
    };
  }

  const newDashboardValues = result.data;

  try {
    const titleAlreadyExists = await doesDashboardTitleExists(
      newDashboardValues.userId,
      newDashboardValues.title,
    );

    if (titleAlreadyExists) {
      return {
        error: "You already have a dashboard with this title",
      };
    }
  } catch (error) {
    return {
      error: "Server Error: Failed to create new dashboard",
    };
  }

  try {
    await insertDashboard(newDashboardValues);
  } catch (error) {
    return {
      error: "Server Error: Failed to create new dashboard",
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
