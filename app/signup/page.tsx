"use client";
import { useState, ChangeEvent } from "react";
import Button from "@/app/components/buttons/Button";
import { useActionState } from "react";
import { LuCircleAlert } from "react-icons/lu";
import { initialState, signUp } from "@/app/utils/serverActions/authActions";
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

  const inputBaseClassName =
    "rounded-xl bg-brand-canvas px-3.5 py-3 font-body text-[15px] font-medium text-brand-ink outline-none focus:border-brand-purple disabled:cursor-not-allowed disabled:opacity-50";
  const getInputClassName = (hasError: boolean) =>
    hasError
      ? `${inputBaseClassName} border-2 border-brand-coral`
      : `${inputBaseClassName} border-[1.5px] border-brand-border`;
  const labelClassName =
    "font-body text-[13px] font-semibold text-brand-ink-soft";
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
          <div className="flex flex-col gap-1.5">
            <label className={labelClassName} htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              onChange={handleValueChange}
              autoComplete="off"
              className={getInputClassName(Boolean(liveErrors.name))}
            />
            {liveErrors.name && (
              <p className={errorClassName}>{liveErrors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClassName} htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleValueChange}
              autoComplete="off"
              className={getInputClassName(Boolean(liveErrors.email))}
            />
            {liveErrors.email && (
              <p className={errorClassName}>{liveErrors.email}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClassName} htmlFor="password">
              Create Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={handleValueChange}
              className={getInputClassName(Boolean(liveErrors.password))}
            />
            {liveErrors.password && (
              <p className={errorClassName}>{liveErrors.password}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClassName} htmlFor="re_password">
              Retype Password:
            </label>
            <input
              type="password"
              id="re_password"
              name="re_password"
              required
              onChange={handleValueChange}
              disabled={!isValidPassword}
              className={getInputClassName(!doesPasswordsMatch)}
            />
            {!doesPasswordsMatch && (
              <p className={errorClassName}>Passwords does not match</p>
            )}
          </div>

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
