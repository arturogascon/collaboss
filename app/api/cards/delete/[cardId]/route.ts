import {query} from '@/app/lib/db';
import {RowDataPacket} from 'mysql2';

export async function DELETE(request: Request, {params: {cardId}}: {params: {cardId: string}}) {
  await query<RowDataPacket[]>(`DELETE FROM cards WHERE id = ?;`, [cardId]);

  const response = new Response('OK', {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'text/plain',
    },
  });

  return response;
}
