import { CardType, getCardsById } from "@/app/utils/db/cards";
import { getDashboardTitleById } from "@/app/utils/db/dashboards";
interface DashBoardData {
  title: string;
  cards: Array<CardType>;
}

export async function getDashboardData(
  id: number,
): Promise<DashBoardData | undefined> {
  const [title, cards] = await Promise.all([
    getDashboardTitleById(id),
    getCardsById(id),
  ]);

  if (!title) {
    return undefined;
  }

  return { title, cards };
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
