import { revalidatePath } from "next/cache";

export type CardType = {
  id: number;
  dashboardId: number;
  title: string;
  description: string;
  image: string;
};

export async function deleteCard(cardId: number, dashboardId: number) {
  try {
    await fetch("/api/cards/delete/" + cardId, {
      method: "DELETE",
    });
    revalidatePath("/dashboard/" + dashboardId);
  } catch (error) {
    return undefined;
  }
}

export async function getCardsData(dashboardId: number) {
  try {
    const data = await fetch(
      process.env.BASE_URL + "/api/cards/" + dashboardId,
    );
    const dashboard = await data.json();
    const cards = dashboard?.data[0];
    return cards;
  } catch (error) {
    return undefined;
  }
}
