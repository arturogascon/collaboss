import { z } from "zod";
import { COLOR_OPTIONS } from "@/app/components/inputs/colorOptions";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export const CreateCardSchema = z.object({
  dashboardId: z.string().min(1, "Dashboard is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be at most 255 characters"),
  description: z
    .string()
    .max(2000, "Description must be at most 2000 characters")
    .optional()
    .transform((value) => value ?? ""),
  color: z
    .preprocess(
      (value) => (value === "" ? undefined : value),
      z
        .enum(COLOR_OPTIONS.map((color) => color.key) as [string, ...string[]])
        .optional(),
    )
    .transform((value) => value ?? COLOR_OPTIONS[0].key),
  "card-image": z
    .instanceof(File)
    .refine(
      (file) => file.size === 0 || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Image must be a PNG, JPG, or WEBP file",
    )
    .refine(
      (file) => file.size <= MAX_IMAGE_SIZE_BYTES,
      "Image must be smaller than 5MB",
    )
    .optional(),
});

export type CreateCardFormValues = z.infer<typeof CreateCardSchema>;
