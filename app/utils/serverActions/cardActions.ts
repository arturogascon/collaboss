"use server";
import { revalidatePath } from "next/cache";
import { CreateCardSchema } from "@/app/schemas/card.schema";
import { saveCardImage } from "@/app/utils/cards/cardImage";
import { deleteCardById, insertCard, updateCard } from "@/app/utils/db/cards";

export type CreateCardState = {
  error?: string;
  success?: boolean;
};

export async function createCard(
  prevState: CreateCardState,
  formData: FormData,
): Promise<CreateCardState> {
  const rawData = Object.fromEntries(formData.entries());
  const result = CreateCardSchema.safeParse(rawData);

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
    };
  }

  const { dashboardId, title, description, color } = result.data;
  const image = formData.get("card-image") as File;

  let imagePath: string;
  try {
    imagePath = await saveCardImage(image);
  } catch (error) {
    return {
      error: "Server Error: Failed to process the uploaded image",
    };
  }

  try {
    await insertCard({
      dashboardId,
      title,
      description,
      image: imagePath || null,
      color,
    });
  } catch (error) {
    return {
      error: "Server Error: Failed to create card",
    };
  }

  revalidatePath("/dashboard/" + dashboardId);

  return {
    success: true,
  };
}

export async function editCard(prevState: any, formData: FormData) {
  const id = formData.get("id") as string;
  const dashboardId = formData.get("dashboardId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const image = formData.get("card-image") as File;

  const imagePath = await saveCardImage(image);

  await updateCard({ id, title, description, image: imagePath || null });

  revalidatePath("/dashboard/" + dashboardId);

  return {
    message: "Success",
  };
}

export async function deleteCard(prevState: any, formData: FormData) {
  const id = formData.get("id") as string;
  const dashboardId = formData.get("dashboardId") as string;

  await deleteCardById(id);

  revalidatePath("/dashboard/" + dashboardId);

  return {
    message: "Success",
  };
}
