"use client";
import { useActionState, useState } from "react";
import { LuX } from "react-icons/lu";
import {
  createCard,
  CreateCardState,
} from "@/app/utils/serverActions/cardActions";
import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/inputs/Input";
import Textarea from "@/app/components/inputs/Textarea";
import ColorPicker from "@/app/components/inputs/ColorPicker";
import ImagePicker from "@/app/components/inputs/imagePicker";
import ErrorBanner from "@/app/components/banners/ErrorBanner";

interface CreateCardFormProps {
  onClose: Function;
  dashboardId: string;
}

const initialState: CreateCardState = {};

export default function CreateCardForm({
  onClose,
  dashboardId,
}: CreateCardFormProps) {
  const [state, formAction] = useActionState(createCard, initialState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const isCardCreated = state.success === true;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-brand-ink/50 p-5 sm:p-7 lg:p-10">
      <div className="flex max-h-[90vh] w-full max-w-[350px] flex-col gap-[18px] overflow-y-auto rounded-3xl border-[1.5px] border-brand-border bg-white p-5 shadow-[0_10px_20px_rgba(0,0,0,0.09)] sm:max-w-[560px] sm:gap-[22px] sm:p-8 lg:max-w-[640px] lg:gap-6 lg:p-10">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl font-bold text-brand-ink sm:text-[22px] lg:text-2xl">
            {isCardCreated ? "Card Created" : "Create Card"}
          </h3>
          <button
            type="button"
            onClick={() => onClose()}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition hover:bg-brand-ink/5 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
          >
            <LuX className="h-[18px] w-[18px] text-brand-ink-faint sm:h-5 sm:w-5 lg:h-[22px] lg:w-[22px]" />
          </button>
        </div>
        {!isCardCreated && (
          <form
            action={formAction}
            className="flex flex-col gap-[18px] text-left sm:gap-[22px] lg:gap-6"
          >
            <input
              type="text"
              name="dashboardId"
              hidden
              defaultValue={dashboardId}
            />
            {state.error && <ErrorBanner message={state.error} />}
            <Input
              type="text"
              name="title"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
              placeholder="e.g. Team Kickoff Notes"
            />
            <Textarea
              name="description"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What should this card capture?"
            />
            <ColorPicker name="color" label="Color" />
            <ImagePicker name="card-image" label="Image (optional)" />
            <div className="flex justify-end gap-2.5">
              <Button
                type="button"
                variant="secondary"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button type="submit">Create Card</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
