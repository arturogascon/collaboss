import {query} from '@/app/utils/db/query';
import {RowDataPacket} from 'mysql2';

export async function PATCH(request: Request, props: {params: Promise<{cardId: string}>}) {
  const params = await props.params;

  const {
    cardId
  } = params;

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
