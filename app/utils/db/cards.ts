import { query } from "@/app/utils/db/query";
import { RowDataPacket } from "mysql2";

export type CardType = {
  id: number;
  dashboardId: number;
  title: string;
  description: string;
  image: string;
};

export async function getCardsById(id: number): Promise<Array<CardType>> {
  const [cards] = await query<RowDataPacket[]>(
    "SELECT * FROM cards WHERE id = ?;",
    [id],
  );

  return cards as unknown as Array<CardType>;
}
