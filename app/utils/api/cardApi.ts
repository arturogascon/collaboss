import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';

export type CardType = {
  id: number;
  dashboard_id: number;
  title: string;
  description: string;
  image: string;
};

export async function deleteCard(cardId: number, dashboardId: number) {
  try {
    await fetch('/api/cards/delete/' + cardId, {
      method: 'DELETE',
    });
    revalidatePath('/dashboard/' + dashboardId);
  } catch (error) {
    return undefined;
  }
}
/* 
export async function getCardData(cardId: number, dashboardId: number) {
  try {
    await fetch('/api/cards/edit/' + cardId, {
      method: 'PATCH',
    });
    revalidatePath('/dashboard/' + dashboardId);
  } catch (error) {
    return undefined;
  }
} */