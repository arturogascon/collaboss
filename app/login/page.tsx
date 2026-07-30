"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { logIn } from "@/app/utils/serverActions/authActions";
import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/inputs/Input";
import ErrorBanner from "@/app/components/banners/ErrorBanner";
import { validateEmail } from "@/app/utils/string/fieldValidation";
import { useActionState } from "react";

interface LoginProps {}

type FormValues = {
  email: string;
  password: string;
};

export default function Login({}: LoginProps) {
  const [errorMessage, formAction, isPending] = useActionState(
    logIn,
    undefined
  );
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (isValidEmail && formValues.password) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [isValidEmail, formValues.password]);

  const handleValueChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [name]: value });

    if (name === "email") {
      setIsValidEmail(validateEmail(value));
    }
  };
  return (
    <div className="flex min-h-screen justify-center bg-brand-canvas px-5 pt-12 pb-16 md:px-14 md:pb-24 md:pt-[72px] lg:px-[100px] lg:pb-[140px] lg:pt-24">
      <div className="flex w-full flex-col gap-6 rounded-3xl border-2 border-brand-outline bg-white p-10 shadow-[0_10px_20px_rgba(0,0,0,0.094)] md:max-w-[440px] lg:max-w-[460px]">
        <h3 className="text-center font-heading text-[26px] font-bold text-brand-ink">
          Log In
        </h3>
        {errorMessage && <ErrorBanner message={errorMessage as string} />}
        <form action={formAction} className="flex flex-col gap-6">
          <Input
            label="Email:"
            name="email"
            type="email"
            required
            onChange={handleValueChange}
            error={formValues.email && !isValidEmail && "Email is not valid"}
          />
          <Input
            label="Password:"
            name="password"
            type="password"
            required
            onChange={handleValueChange}
          />
          <Button
            className="w-fit self-end"
            type="submit"
            disabled={isSubmitDisabled || isPending}
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
