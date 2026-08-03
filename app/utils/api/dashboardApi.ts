import { CardType, getCardsData } from "@/app/utils/api/cardApi";
import { getUserByEmail } from "../db/users";
interface DashBoardData {
  title: string;
  cards: Array<CardType>;
}

export async function getDashboardData(
  id: number,
): Promise<DashBoardData | undefined> {
  try {
    const dashboardData = await fetch(
      process.env.BASE_URL + "/api/dashboard/" + id,
    );
    const cards = await getCardsData(id);
    const dashboard = await dashboardData.json();

    if (!dashboard || !dashboard.data || !dashboard.data[0][0]) {
      return undefined;
    }

    const { title } = dashboard?.data[0][0];

    return {
      title,
      cards,
    };
  } catch (error) {
    return undefined;
  }
}

export interface Dashboard {
  id: number;
  userId: number;
  title: string;
  date: string;
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
