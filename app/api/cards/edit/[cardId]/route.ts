import {query} from '@/app/utils/db/query';

export async function PATCH(request: Request, props: {params: Promise<{cardId: string}>}) {
  const params = await props.params;

  const {
    cardId
  } = params;

  let data = await query('SELECT * FROM cards WHERE card_id = $1;', [cardId]);

  console.log(data);

  /* await query(`UPDATE cards
                                SET title = $1, description = $2, image = $3
                                WHERE id = $4;`, [cardId]);

  const response = new Response('OK', {
    status: 200,
    statusText: 'OK',
    headers: {
      'Content-Type': 'text/plain',
    },
  });

  return response; */
}
