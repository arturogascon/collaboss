"use client";
import { useState, ChangeEvent } from "react";
import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/inputs/Input";
import { useActionState } from "react";
import { LuCircleAlert } from "react-icons/lu";
import { signUp } from "@/app/utils/serverActions/authActions";
import { initialState } from "@/app/utils/types/serverActions.types";
import {
  SignUpFormKey,
  SignUpBaseSchema,
  SIGNUP_FIELD_NAMES,
} from "../schemas/user.schema";

export default function SignUp() {
  const [state, formAction, isPending] = useActionState(signUp, initialState);
  const [liveErrors, setLiveErrors] = useState<
    Partial<Record<SignUpFormKey, string>>
  >({});
  const [touched, setTouched] = useState<
    Partial<Record<SignUpFormKey, string>>
  >({});
  const [password, setPassword] = useState<string>("");
  const [doesPasswordsMatch, setDoesPasswordsMatch] = useState<boolean>(true);
  const isFormEnabled =
    SIGNUP_FIELD_NAMES.every((field) => touched[field] && !liveErrors[field]) &&
    doesPasswordsMatch &&
    !isPending;

  const serverError = state.error;

  const isValidPassword = password && !liveErrors.password;

  const isFormField = (name: string): name is SignUpFormKey =>
    name in SignUpBaseSchema.shape;

  const handleValueChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (!isFormField(name)) return;

    const fieldSchema = SignUpBaseSchema.shape[name];
    const result = fieldSchema.safeParse(value);

    setTouched((prev) => ({ ...prev, [name]: value.trim() !== "" }));

    if (name === "password") {
      setPassword(value);
    }

    if (name === "re_password") {
      setDoesPasswordsMatch(value === password);
    }

    setLiveErrors((prev) => ({
      ...prev,
      [name]: result.success ? "" : result.error.issues[0].message,
    }));
  };

  const errorClassName = "font-body text-xs font-medium text-[#E4483F]";

  return (
    <div className="flex min-h-screen justify-center bg-brand-canvas px-5 pt-12 pb-16 md:px-14 md:pb-24 md:pt-[72px] lg:px-[100px] lg:pb-[140px] lg:pt-24">
      <div className="flex w-full flex-col gap-6 rounded-3xl border-2 border-brand-outline bg-white p-10 shadow-[0_10px_20px_rgba(0,0,0,0.094)] md:max-w-[440px] lg:max-w-[460px]">
        <h3 className="text-center font-heading text-[26px] font-bold text-brand-ink">
          Sign Up
        </h3>
        {serverError && (
          <div className="flex items-center gap-2.5 rounded-xl border-[1.5px] border-brand-coral bg-[#FF6B6B14] px-3.5 py-3">
            <LuCircleAlert className="h-[18px] w-[18px] shrink-0 text-[#E4483F]" />
            <p className={errorClassName}>{serverError}</p>
          </div>
        )}
        <form action={formAction} className="flex flex-col gap-6">
          <Input
            label="Username:"
            type="text"
            name="username"
            required
            onChange={handleValueChange}
            error={liveErrors.username}
          />

          <Input
            label="Email:"
            type="email"
            name="email"
            required
            onChange={handleValueChange}
            error={liveErrors.email}
          />

          <Input
            label="Create Password:"
            type="password"
            name="password"
            required
            onChange={handleValueChange}
            error={liveErrors.password}
          />

          <Input
            label="Retype Password:"
            type="password"
            name="re_password"
            required
            onChange={handleValueChange}
            disabled={!isValidPassword}
            error={!doesPasswordsMatch && "Passwords does not match"}
          />

          <Button
            className="w-fit self-end"
            type="submit"
            disabled={!isFormEnabled}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
