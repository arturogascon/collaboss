import { Client, QueryResultRow } from "pg";
import { unstable_noStore as noStore } from "next/cache";
import camelcaseKeys, { CamelCaseKeys } from "camelcase-keys";

async function query<T extends QueryResultRow = any>(
  text: string,
  values?: any[],
): Promise<[CamelCaseKeys<T[], true>, number]> {
  noStore();
  try {
    const client = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "collaboss",
    });

    await client.connect();
    const { rows, rowCount } = await client.query<T>(text, values);

    await client.end();

    const camelCasedRows = camelcaseKeys(rows, {
      deep: true,
    }) as CamelCaseKeys<T[], true>;

    return [camelCasedRows, rowCount ?? 0];
  } catch (error) {
    console.error("DB query error:", error);
    throw error;
  }
}

export { query };
