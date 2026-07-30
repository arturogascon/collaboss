import { z } from "zod";

export const SignUpBaseSchema = z.object({
  username: z
    .string()
    .min(3, "Username must have at least 3 characters")
    .regex(
      /^\w{3,}$/,
      "Username must only contain alphanumeric characters and underscores",
    ),
  email: z.email("Email is not valid"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{8,}$/,
      "Password must include at least one alphabetic character, one number and one special character",
    ),
  re_password: z.string(),
});

export const SignUpSchema = SignUpBaseSchema.refine(
  (data) => data.password === data.re_password,
  {
    message: "Passwords does not match",
    path: ["re_password"],
  },
);

type SignUpFormValues = z.infer<typeof SignUpBaseSchema>;
export type UserType = Omit<SignUpFormValues, "re_password"> & {
  id: string;
};

export type SignUpFormKey = keyof SignUpFormValues;
export const SIGNUP_FIELD_NAMES = Object.keys(
  SignUpBaseSchema.shape,
) as SignUpFormKey[];

export const UpdateProfileSchema = SignUpBaseSchema.pick({
  username: true,
  email: true,
}).partial();

export type UpdateProfileFormKey = keyof z.infer<typeof UpdateProfileSchema>;
export const UPDATE_PROFILE_FIELD_NAMES = Object.keys(
  UpdateProfileSchema.shape,
) as UpdateProfileFormKey[];

export const UpdatePasswordBaseSchema = z.object({
  current_password: z.string().min(1, "Current password is required"),
  password: SignUpBaseSchema.shape.password,
  re_password: z.string(),
});

export const UpdatePasswordSchema = UpdatePasswordBaseSchema.refine(
  (data) => data.password === data.re_password,
  {
    message: "Passwords do not match",
    path: ["re_password"],
  },
);

export type UpdatePasswordFormKey = keyof z.infer<
  typeof UpdatePasswordBaseSchema
>;
export const UPDATE_PASSWORD_FIELD_NAMES = Object.keys(
  UpdatePasswordBaseSchema.shape,
) as UpdatePasswordFormKey[];
