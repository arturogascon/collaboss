"use client";
import { useState } from "react";
import { TiTimesOutline } from "react-icons/ti";
import { editCard } from "@/app/utils/serverActions/cardActions";
import Button from "@/app/components/buttons/Button";
import ImagePicker from "@/app/components/inputs/imagePicker";
import { useActionState } from "react";
import { CardType } from "@/app/utils/api/cardApi";
import Input from "../inputs/Input";

interface EditCardFormProps {
  onClose: Function;
  dashboardId: number;
  card: CardType | undefined;
}

interface FormValues {
  title: string;
  description: string;
  image: string;
}

const initialState = {
  message: "",
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
  });
  const [state, formAction] = useActionState(editCard, initialState);

  const onValueChange = (field: string, value: string) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const isCardUpdated = state.message === "Success";

  return (
    <div className="absolute z-10 top-0 left-1/2 -translate-x-1/2 bg-green-light w-[98%] pt-6 px-7 pb-8 text-right text-purple rounded-3xl shadow-[0.3rem_0.3rem_1rem_rgba(142,69,176,.35)]">
      <button className="text-purple cursor-pointer" onClick={() => onClose()}>
        <TiTimesOutline size="2em" />
      </button>
      <h3 className="text-lg font-semibold text-left mb-4">
        {isCardUpdated ? "Card Edited Successfully" : "Edit Card"}
      </h3>
      {!isCardUpdated && (
        <form action={formAction} className="flex flex-col text-left">
          <input type="text" name="id" hidden defaultValue={card?.id} />
          <input
            type="text"
            name="dashboardId"
            hidden
            defaultValue={dashboardId}
          />
          <Input
            label="Title:"
            type="text"
            name="title"
            value={formValues.title}
            onChange={(e) => onValueChange("title", e.target.value)}
          />
          <Input
            label="Description:"
            type="text"
            name="description"
            value={formValues.description}
            onChange={(e) => onValueChange("description", e.target.value)}
          />
          <ImagePicker name="card-image" value={formValues.image} />
          <Button type="submit" className="w-fit self-end">
            Edit
          </Button>
        </form>
      )}
    </div>
  );
}
