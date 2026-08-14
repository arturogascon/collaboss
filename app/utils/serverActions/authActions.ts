"use server";
import {
  getUserByEmail,
  saveNewUser,
  updatePassword,
  updateUser,
} from "@/app/utils/db/users";
import { comparePasswords, hashPassword } from "@/app/utils/hash/bcrypt";
import { redirect } from "next/navigation";
import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import {
  SignUpSchema,
  UpdatePasswordSchema,
  UpdateProfileSchema,
} from "@/app/schemas/user.schema";
import { revalidatePath } from "next/cache";
import { ServerActionState } from "../types/serverActions.types";

export async function signUp(
  _prevState: ServerActionState,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData.entries());
  const result = SignUpSchema.safeParse(rawData);

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
      message: "",
    };
  }

  const newUser = {
    username: result.data.username,
    email: result.data.email,
    password: result.data.password,
  };

  try {
    const existentUser = await getUserByEmail(newUser.email);

    if (existentUser) {
      return { error: "This email is already registered", message: "" };
    }
  } catch (error) {
    return {
      error: "Server error. Try again!",
      message: "",
    };
  }

  newUser.password = await hashPassword(newUser.password);

  let addedUserId;

  try {
    addedUserId = await saveNewUser(newUser);
  } catch (error) {
    return {
      message: "",
      error: "Server error. Try again!",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error:
          "Account created, but automatic login failed. Please sign in manually.",
        message: "",
      };
    }
    throw error;
  }

  redirect("/dashboard");
}

export async function logIn(_prevState: any, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function logOut() {
  await signOut({ redirect: false });
  redirect("/login");
}

export async function updateProfile(
  _prevState: ServerActionState,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData.entries());
  const result = UpdateProfileSchema.safeParse(rawData);

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
      message: "",
    };
  }

  if (!result.data.username && !result.data.email) {
    return { error: "No changes to update", message: "" };
  }

  const session = await auth();

  if (!session?.user?.id || !session.user.email || !session.user.username) {
    return { error: "Not authenticated", message: "" };
  }

  if (result.data.email && result.data.email !== session.user.email) {
    const emailTaken = await getUserByEmail(result.data.email);
    if (emailTaken) {
      return { error: "Email already in use", message: "" };
    }
  }

  const updateUserData = {
    id: session.user.id,
    username: result.data.username ?? session.user.username,
    email: result.data.email ?? session.user.email,
  };

  try {
    await updateUser(updateUserData);
  } catch (error) {
    return {
      error: "Server error. Try again!",
      message: "",
    };
  }

  revalidatePath("/profile");
  return { error: "", message: "Profile updated successfully" };
}

export async function changePassword(
  _prevState: ServerActionState,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData.entries());
  const result = UpdatePasswordSchema.safeParse(rawData);

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
      message: "",
    };
  }

  const session = await auth();

  if (!session?.user?.id || !session?.user?.email) {
    return { error: "Not authenticated", message: "" };
  }

  try {
    const existingUser = await getUserByEmail(session.user.email);
    if (!existingUser) {
      return { error: "Existing user not found", message: "" };
    }

    const isCurrentPasswordValid = await comparePasswords(
      result.data.current_password,
      existingUser.password,
    );
    if (!isCurrentPasswordValid) {
      return { error: "Current password is incorrect", message: "" };
    }
  } catch (error) {
    return {
      error: "Server error. Try again!",
      message: "",
    };
  }

  const hashedPassword = await hashPassword(result.data.password);

  const updateUserData = {
    id: session.user.id,
    password: hashedPassword,
  };

  try {
    await updatePassword(updateUserData);
  } catch (error) {
    console.log(error);
    return {
      error: "Server error. Try again!",
      message: "",
    };
  }

  revalidatePath("/profile");
  return { error: "", message: "Password updated successfully" };
}
