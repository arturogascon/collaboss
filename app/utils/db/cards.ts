import { query } from "@/app/utils/db/query";

export type CardType = {
  id: number;
  dashboardId: number;
  title: string;
  description: string;
  image: string;
  color: string | null;
};

export async function getCardsById(id: number): Promise<Array<CardType>> {
  const [cards] = await query(
    "SELECT * FROM cards WHERE dashboard_id = $1;",
    [id],
  );

  return cards as unknown as Array<CardType>;
}

export type NewCard = {
  dashboardId: string;
  title: string;
  description: string;
  image: string | null;
  color: string;
};

export async function insertCard(newCard: NewCard): Promise<void> {
  await query(
    `INSERT INTO cards (dashboard_id, title, description, image, color)
      VALUES ($1, $2, $3, $4, $5);`,
    [
      newCard.dashboardId,
      newCard.title,
      newCard.description,
      newCard.image,
      newCard.color,
    ],
  );
}

export type UpdatedCard = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  color: string;
};

export async function updateCard(updatedCard: UpdatedCard): Promise<void> {
  await query(
    `UPDATE cards
      SET title = $1, description = $2, image = $3, color = $4
      WHERE id = $5;`,
    [
      updatedCard.title,
      updatedCard.description,
      updatedCard.image,
      updatedCard.color,
      updatedCard.id,
    ],
  );
}

export async function deleteCardById(id: string): Promise<boolean> {
  const [, rowCount] = await query(`DELETE FROM cards WHERE id = $1;`, [id]);

  return rowCount > 0;
}
