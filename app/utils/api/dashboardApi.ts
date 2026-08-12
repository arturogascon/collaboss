import { CardType, getCardsById } from "@/app/utils/db/cards";
import { getDashboardById } from "@/app/utils/db/dashboards";
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

export interface Dashboard {
  id: number;
  userId: number;
  title: string;
  created_date: string;
}

export async function getAllDashboardsFromUser(
  userId: string,
): Promise<Array<Dashboard> | undefined> {
  try {
    const dashboardsResponse = await fetch(
      process.env.BASE_URL + "/api/dashboard/user/" + userId,
    );

    if (!dashboardsResponse.ok) {
      const errorText = await dashboardsResponse.text();
      console.error(
        "Dashboard API error:",
        dashboardsResponse.status,
        errorText,
      );
      throw new Error("Failed to fetch dashboards");
    }

    const dashboardsData = await dashboardsResponse.json();

    return dashboardsData.data[0];
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
