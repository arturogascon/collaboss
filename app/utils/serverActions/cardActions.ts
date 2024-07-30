'use server';
import slugify from 'slugify';
import fs from 'node:fs';
import {query} from '@/app/lib/db';
import {RowDataPacket} from 'mysql2';
import {revalidatePath} from 'next/cache';

type Card = {
  dashboardId: string;
  id: string | null;
  title: string;
  description: string;
  image: File | string;
};

const createCardData = async (formData: FormData) => {
  const card: Card = {
    dashboardId: formData.get('dashboardId') as string,
    id: formData.get('id') as string | null,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    image: formData.get('card-image') as File,
  };

  if ((card.image as File).size > 0) {
    let [fileName, extension] = (card.image as File).name.split('.');
    fileName = `${slugify(fileName)}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await(card.image as File).arrayBuffer();

    stream.write(Buffer.from(bufferedImage), (error) => {
      if (error) {
        throw new Error('Saving image failed!');
      }
    });

    card.image = `/images/${fileName}`;
  } else {
    card.image = '';
  }

  return card;
};

export async function createCard(prevState: any, formData: FormData) {
  const card = await createCardData(formData);

  if (card.image) {
    await query<RowDataPacket[]>(
      `INSERT INTO cards (dashboard_id, title, description, image) 
  VALUES (?, ?, ?, ?);`,
      [card.dashboardId, card.title, card.description, card.image]
    );
  } else {
    await query<RowDataPacket[]>(
      `INSERT INTO cards (dashboard_id, title, description) 
  VALUES (?, ?, ?, ?);`,
      [card.dashboardId, card.title, card.description]
    );
  }

  revalidatePath('/dashboard/' + card.dashboardId);

  return {
    message: 'Success',
  };
}

export async function editCard(prevState: any, formData: FormData) {
  const card = await createCardData(formData);

  if (card.image) {
    await query<RowDataPacket[]>(
      `UPDATE cards 
    SET title = ?, description = ?, image = ?
  WHERE id = ?;`,
      [card.title, card.description, card.image, card.id]
    );
  } else {
    await query<RowDataPacket[]>(
      `UPDATE cards 
    SET title = ?, description = ?
  WHERE id = ?;`,
      [card.title, card.description, card.id]
    );
  }

  revalidatePath('/dashboard/' + card.dashboardId);

  return {
    message: 'Success',
  };
}
