"use client";
import { ChangeEvent, useState } from "react";
import { useActionState } from "react";
import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/inputs/Input";
import Textarea from "@/app/components/inputs/Textarea";
import ColorPicker from "@/app/components/inputs/ColorPicker";
import ErrorBanner from "@/app/components/banners/ErrorBanner";
import {
  createDashboard,
  CreateDashboardState,
} from "@/app/utils/serverActions/dashboardActions";

const initialState: CreateDashboardState = {
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
  const [description, setDescription] = useState<string>("");

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full flex-col gap-[18px] rounded-3xl border-[1.5px] border-brand-border bg-white p-5 shadow-sm sm:max-w-[560px] sm:gap-[22px] sm:p-8 lg:max-w-[640px] lg:gap-6 lg:p-10"
    >
      {state.error && <ErrorBanner message={state.error} />}
      <input type="text" name="userId" hidden defaultValue={userId} />
      <Input
        type="text"
        name="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
        autoComplete="off"
        placeholder="e.g. Marketing Launch"
      />
      <Textarea
        name="description"
        label="Description"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="What's this dashboard for? Add any context your team should know."
      />
      <ColorPicker name="color" label="Color" />
      <div className="flex justify-end">
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}
