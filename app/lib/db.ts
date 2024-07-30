import mysql, {FieldPacket, RowDataPacket} from 'mysql2/promise';
import {unstable_noStore as noStore} from 'next/cache';

async function query<T>(query: string, values?: any): Promise<[T, FieldPacket[]] | string> {
  noStore();
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'arturo',
      password: 'sqlazo',
      database: 'collaboss',
    });

    const [rows, fields] = await connection.execute<T & RowDataPacket[]>(query, values);

    connection.end();

    return [rows, fields];
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export {query};
