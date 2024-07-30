import {query} from '@/app/lib/db';
import {RowDataPacket} from 'mysql2';

export async function PATCH(request: Request, {params: {cardId}}: {params: {cardId: string}}) {
  let data = await query<RowDataPacket[]>('SELECT * FROM cards WHERE card_id = ?;', [cardId]);

  console.log(data);

  /* await query<RowDataPacket[]>(`UPDATE cards
                                SET title = ?, description = ?, image = ?
                                WHERE id = ?;`, [cardId]);

  const response = new Response('OK', {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'text/plain',
    },
  });

  return response; */
}
