"use server";
import { revalidatePath } from "next/cache";
import { CreateCardSchema, EditCardSchema } from "@/app/schemas/card.schema";
import { saveCardImage } from "@/app/utils/cards/cardImage";
import { deleteCardById, insertCard, updateCard } from "@/app/utils/db/cards";

export type CreateCardState = {
  error?: string;
  success?: boolean;
};

export async function createCard(
  _prevState: CreateCardState,
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

export type EditCardState = {
  error?: string;
  success?: boolean;
};

export async function editCard(
  _prevState: EditCardState,
  formData: FormData,
): Promise<EditCardState> {
  const rawData = Object.fromEntries(formData.entries());
  const result = EditCardSchema.safeParse(rawData);

  if (!result.success) {
    return {
      error: result.error.issues[0].message,
    };
  }

  const { id, dashboardId, existingImage, title, description, color } =
    result.data;
  const image = formData.get("card-image");

  let imagePath: string | null = existingImage || null;

  if (image instanceof File && image.size > 0) {
    try {
      imagePath = await saveCardImage(image);
    } catch (error) {
      return {
        error: "Server Error: Failed to process the uploaded image",
      };
    }
  }

  try {
    await updateCard({ id, title, description, image: imagePath, color });
  } catch (error) {
    return {
      error: "Server Error: Failed to update card",
    };
  }

  revalidatePath("/dashboard/" + dashboardId);

  return {
    success: true,
  };
}

export type DeleteCardState = {
  error?: string;
  success?: boolean;
};

export async function deleteCard(
  _prevState: DeleteCardState,
  formData: FormData,
): Promise<DeleteCardState> {
  const id = formData.get("id") as string;
  const dashboardId = formData.get("dashboardId") as string;

  if (!id) {
    return {
      error: "Card id is required",
    };
  }

  let wasDeleted: boolean;
  try {
    wasDeleted = await deleteCardById(id);
  } catch (error) {
    return {
      error: "Server Error: Failed to delete card",
    };
  }

  if (!wasDeleted) {
    return {
      error: "Card not found",
    };
  }

  revalidatePath("/dashboard/" + dashboardId);

  return {
    success: true,
  };
}
