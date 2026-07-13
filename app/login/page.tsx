"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { logIn } from "@/app/utils/serverActions/authActions";
import Button from "@/app/components/buttons/Button";
import { validateEmail } from "@/app/utils/string/fieldValidation";
import { useActionState } from "react";
import Input from "../components/inputs/Input";

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
    <div className="py-8 px-9 text-purple">
      <h3 className="text-2xl font-semibold text-center mb-4">Log In</h3>
      {errorMessage && (
        <p className="text-xs text-red-500 mb-2">{errorMessage as string}</p>
      )}
      <form action={formAction} className="flex flex-col">
        <Input
          label="Email:"
          name="email"
          type="email"
          required
          onChange={handleValueChange}
          error={formValues.email && !isValidEmail && "Email is not valid"}
        />
        <Input
          label="Password::"
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
  );
}
