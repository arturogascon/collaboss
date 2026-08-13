import { z } from "zod";
import { COLOR_OPTIONS } from "@/app/components/inputs/colorOptions";

const DASHBOARD_COLOR_KEYS = COLOR_OPTIONS.map((color) => color.key) as [
  string,
  ...string[],
];

export const CreateDashboardSchema = z.object({
  userId: z.string().min(1, "User is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be at most 255 characters"),
  description: z
    .string()
    .max(2000, "Description must be at most 2000 characters")
    .optional()
    .transform((value) => (value ? value : null)),
  color: z
    .preprocess(
      (value) => (value === "" ? undefined : value),
      z.enum(DASHBOARD_COLOR_KEYS).optional(),
    )
    .transform((value) => value ?? null),
});

export type CreateDashboardFormValues = z.infer<typeof CreateDashboardSchema>;

export const EditDashboardSchema = z.object({
  id: z.string().min(1, "Dashboard id is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be at most 255 characters"),
  description: z
    .string()
    .max(2000, "Description must be at most 2000 characters")
    .optional()
    .transform((value) => (value ? value : null)),
});

export type EditDashboardFormValues = z.infer<typeof EditDashboardSchema>;
