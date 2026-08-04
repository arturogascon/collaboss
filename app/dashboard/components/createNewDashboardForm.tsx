"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useActionState } from "react";
import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/inputs/Input";
import { createDashboard } from "@/app/utils/serverActions/dashboardActions";

const initialState = {
  message: "",
  error: undefined,
};

type CreateNewDashboardFormProps = {
  userId: string;
};

export default function CreateNewDashboardForm({
  userId,
}: CreateNewDashboardFormProps) {
  const [state, formAction] = useActionState(createDashboard, initialState);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (state.message) {
      setTitle("");
    }

    return () => {
      setTitle("");
    };
  }, [state]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form
      action={formAction}
      className="mt-4 flex w-full flex-col gap-3 rounded-2xl border-[1.5px] border-brand-border bg-white p-4"
    >
      {state.error && (
        <p className="font-body text-xs font-medium text-brand-coral">
          {state.error}
        </p>
      )}
      <input type="text" name="userId" hidden defaultValue={userId} />
      <Input
        type="text"
        name="title"
        label="Title"
        value={title}
        onChange={handleChange}
        autoComplete="off"
      />
      <Button type="submit" className="self-end">
        Create
      </Button>
    </form>
  );
}
