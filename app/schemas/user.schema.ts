import { z } from "zod";

export const SignUpBaseSchema = z.object({
  name: z.string().regex(/^\w{3,}$/, "Name must have at least 3 characters"),
  email: z.email("Email is not valid"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{8,}$/,
      "Password must be 8 characters long and include at least one alphabetic character, one number and one special character",
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
  name: true,
  email: true,
}).partial();

export const UpdatePasswordSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    password: SignUpBaseSchema.shape.password,
    re_password: z.string(),
  })
  .refine((data) => data.password === data.re_password, {
    message: "Passwords do not match",
    path: ["re_password"],
  });
