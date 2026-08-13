"use client";
import { useActionState, useState } from "react";
import { LuX } from "react-icons/lu";
import { editCard } from "@/app/utils/serverActions/cardActions";
import Button from "@/app/components/buttons/Button";
import Input from "@/app/components/inputs/Input";
import Textarea from "@/app/components/inputs/Textarea";
import ColorPicker from "@/app/components/inputs/ColorPicker";
import ImagePicker from "@/app/components/inputs/imagePicker";
import ErrorBanner from "@/app/components/banners/ErrorBanner";
import type { CardType } from "@/app/utils/db/cards";

interface EditCardFormProps {
  onClose: Function;
  dashboardId: number;
  card: CardType | undefined;
}

interface FormValues {
  title: string;
  description: string;
  image: string;
  color: string;
}

const initialState = {
  error: "",
  success: false,
};

export default function EditCardForm({
  onClose,
  dashboardId,
  card,
}: EditCardFormProps) {
  const [formValues, setFormValues] = useState<FormValues>({
    title: card?.title || "",
    description: card?.description || "",
    image: card?.image || "",
    color: card?.color || "blue",
  });
  const [state, formAction] = useActionState(editCard, initialState);

  const onValueChange = (field: string, value: string) => {
    setFormValues((previous) => ({ ...previous, [field]: value }));
  };

  const isCardUpdated = state.success === true;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-brand-ink/50 p-5 sm:p-7 lg:p-10">
      <div className="flex max-h-[90vh] w-full max-w-[350px] flex-col gap-[18px] overflow-y-auto rounded-3xl border-[1.5px] border-brand-border bg-white p-5 shadow-[0_10px_20px_rgba(0,0,0,0.09)] sm:max-w-[560px] sm:gap-[22px] sm:p-8 lg:max-w-[640px] lg:gap-6 lg:p-10">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-xl font-bold text-brand-ink sm:text-[22px] lg:text-2xl">
            {isCardUpdated ? "Card Updated" : "Edit Card"}
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
        {!isCardUpdated && (
          <form
            action={formAction}
            className="flex flex-col gap-[18px] text-left sm:gap-[22px] lg:gap-6"
          >
            <input type="hidden" name="id" defaultValue={card?.id} />
            <input
              type="hidden"
              name="dashboardId"
              defaultValue={dashboardId}
            />
            <input
              type="hidden"
              name="existingImage"
              value={formValues.image}
            />
            {state.error && <ErrorBanner message={state.error} />}
            <Input
              type="text"
              name="title"
              label="Title"
              value={formValues.title}
              onChange={(e) => onValueChange("title", e.target.value)}
              autoComplete="off"
              placeholder="e.g. Team Kickoff Notes"
            />
            <Textarea
              name="description"
              label="Description"
              value={formValues.description}
              onChange={(e) => onValueChange("description", e.target.value)}
              placeholder="What should this card capture?"
            />
            <ColorPicker
              name="color"
              label="Color"
              defaultValue={formValues.color}
            />
            <ImagePicker
              name="card-image"
              label="Image (optional)"
              value={formValues.image}
            />
            <div className="flex justify-end gap-2.5">
              <Button
                type="button"
                variant="secondary"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
