import { query } from "@/app/utils/db/query";
import { UserType } from "@/app/schemas/user.schema";
import { User } from "../types/user.types";

export async function getUserById(id: string): Promise<User | undefined> {
  try {
    const user = await query(
      `SELECT * FROM users
            WHERE id = $1`,
      [id],
    );
    return user[0][0] as User;
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  try {
    const user = await query(
      `SELECT * FROM users
            WHERE email = $1`,
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
  await query(
    `INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3);`,
    [username, email, password],
  );

  const addedUserData = await query(
    `SELECT id
      FROM users
      WHERE email = $1
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
  await query(
    `UPDATE users
      SET username = $1, email = $2
      WHERE id = $3;`,
    [username, email, id],
  );
}

export async function updatePassword({
  id,
  password,
}: Pick<UserType, "id" | "password">): Promise<void> {
  await query(
    `UPDATE users
      SET password = $1
      WHERE id = $2;`,
    [password, id],
  );
}
