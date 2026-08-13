import { query } from "@/app/utils/db/query";
import { UserType } from "@/app/schemas/user.schema";
import { RowDataPacket } from "mysql2";
import { User } from "../types/user.types";

export async function getUserById(id: string): Promise<User | undefined> {
  try {
    const user = await query<RowDataPacket[]>(
      `SELECT * FROM users
            WHERE id = ?`,
      [id],
    );
    return user[0][0] as User;
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

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
  username,
  email,
  password,
}: Omit<UserType, "id">): Promise<string> {
  await query<RowDataPacket[]>(
    `INSERT INTO users (username, email, password) 
      VALUES (?, ?, ?);`,
    [username, email, password],
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
  username,
  email,
}: Partial<UserType>): Promise<void> {
  await query<RowDataPacket[]>(
    `UPDATE users
      SET username = ?, email = ?
      WHERE id = ?;`,
    [username, email, id],
  );
}

export async function updatePassword({
  id,
  password,
}: Pick<UserType, "id" | "password">): Promise<void> {
  await query<RowDataPacket[]>(
    `UPDATE users
      SET password = ?
      WHERE id = ?;`,
    [password, id],
  );
}
