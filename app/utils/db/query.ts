import mysql, { FieldPacket, RowDataPacket } from "mysql2/promise";
import { unstable_noStore as noStore } from "next/cache";
import camelcaseKeys, { CamelCaseKeys } from "camelcase-keys";

async function query<T>(
  query: string,
  values?: any,
): Promise<[CamelCaseKeys<T & RowDataPacket[], true>, FieldPacket[]]> {
  noStore();
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "collaboss",
    });

    connection.config.namedPlaceholders = true;
    const [rows, fields] = await connection.execute<T & RowDataPacket[]>(
      query,
      values,
    );

    connection.end();

    const camelCasedRows = camelcaseKeys(rows, { deep: true }) as CamelCaseKeys<
      T & RowDataPacket[],
      true
    >;

    return [camelCasedRows, fields];
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export { query };
