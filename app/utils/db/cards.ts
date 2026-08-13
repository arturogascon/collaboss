import { query } from "@/app/utils/db/query";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export type CardType = {
  id: number;
  dashboardId: number;
  title: string;
  description: string;
  image: string;
  color: string | null;
};

export async function getCardsById(id: number): Promise<Array<CardType>> {
  const [cards] = await query<RowDataPacket[]>(
    "SELECT * FROM cards WHERE dashboard_id = ?;",
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
  await query<RowDataPacket[]>(
    `INSERT INTO cards (dashboard_id, title, description, image, color)
      VALUES (?, ?, ?, ?, ?);`,
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
  await query<RowDataPacket[]>(
    `UPDATE cards
      SET title = ?, description = ?, image = ?, color = ?
      WHERE id = ?;`,
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
  const [result] = await query<ResultSetHeader>(
    `DELETE FROM cards WHERE id = ?;`,
    [id],
  );

  return (result as unknown as ResultSetHeader).affectedRows > 0;
}
