import {CardType} from '@/app/utils/api/cardApi';
import {revalidatePath} from 'next/cache';
interface DashBoardData {
  title: string;
  cards: Array<CardType>;
}

export async function getDashboardData(id: number): Promise<DashBoardData | undefined> {
  try {
    const data = await fetch(process.env.BASE_URL + '/api/dashboard/' + id);
    const cards = await getCardsData(id);
    const dashboard = await data.json();
    const {title} = dashboard?.data[0][0];

    revalidatePath('/dashboard/' + id);

    return {
      title,
      cards,
    };
  } catch (error) {
    return undefined;
  }
}

export async function getCardsData(dashboardId: number) {
  try {
    const data = await fetch(process.env.BASE_URL + '/api/cards/' + dashboardId);
    const dashboard = await data.json();
    const cards = dashboard?.data[0];
    return cards;
  } catch (error) {
    return undefined;
  }
}
