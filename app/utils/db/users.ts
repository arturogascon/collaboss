import { query } from "@/app/lib/db";
import { UserType } from "@/app/schemas/user.schema";
import { RowDataPacket } from "mysql2";
import { User } from "../types/user.types";

export async function getUserByEmail(email: string): Promise<User | undefined> {
  try {
    const user = await query<RowDataPacket[]>(
      `SELECT * FROM users
            WHERE email = ?`,
      [email],
    );
    return user[0][0] as User;
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

export async function saveNewUser({
  name,
  email,
  password,
}: Omit<UserType, "id">): Promise<string> {
  await query<RowDataPacket[]>(
    `INSERT INTO users (username, email, password) 
      VALUES (?, ?, ?);`,
    [name, email, password],
  );

  const addedUserData = await query<RowDataPacket[]>(
    `SELECT id
      FROM users
      WHERE email = ?
      LIMIT 1;`,
    [email],
  );

  return addedUserData[0][0].id;
}

export async function updateUser({
  id,
  name,
  email,
}: Partial<UserType>): Promise<void> {
  await query<RowDataPacket[]>(
    `UPDATE users
      SET username = ?, email = ?
      WHERE id = ?;`,
    [name, email, id],
  );
}

export async function updatePassword({
  id,
  password,
}: Partial<UserType>): Promise<void> {
  await query<RowDataPacket[]>(
    `UPDATE users
      SET password = ?
      WHERE id = ?;`,
    [password, id],
  );
}
