import { CardType, getCardsById } from "@/app/utils/db/cards";
import {
  DashboardSummary,
  getDashboardById,
  getDashboardsByUserId,
} from "@/app/utils/db/dashboards";
import { GetDashboardsByUserIdSchema } from "@/app/schemas/dashboard.schema";

interface DashBoardData {
  title: string;
  description: string | null;
  color: string | null;
  cards: Array<CardType>;
}

export async function getDashboardData(
  id: number,
): Promise<DashBoardData | undefined> {
  const [dashboard, cards] = await Promise.all([
    getDashboardById(id),
    getCardsById(id),
  ]);

  if (!dashboard) {
    return undefined;
  }

  return { ...dashboard, cards };
}

export type Dashboard = DashboardSummary;

export async function getAllDashboardsFromUser(
  userId: string,
): Promise<Array<Dashboard>> {
  const result = GetDashboardsByUserIdSchema.safeParse({ userId });

  if (!result.success) {
    throw new Error(result.error.issues[0].message);
  }

  return getDashboardsByUserId(result.data.userId);
}
