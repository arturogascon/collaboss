"use client";
import { MouseEventHandler, useActionState } from "react";
import type { CardType } from "@/app/utils/db/cards";
import { deleteCard } from "@/app/utils/serverActions/cardActions";
import { COLOR_OPTIONS } from "@/app/components/inputs/colorOptions";
import Image from "next/image";
import { LuPencil, LuTrash2 } from "react-icons/lu";

type CardProps = CardType & {
  dashboardId: number;
  color: string | null;
  onEdit: MouseEventHandler<HTMLButtonElement>;
};

const initialDeleteState = {
  error: "",
  success: false,
};

export default function Card({
  id,
  image,
  title,
  description,
  dashboardId,
  color,
  onEdit,
}: CardProps) {
  const [deleteState, deleteFormAction] = useActionState(
    deleteCard,
    initialDeleteState,
  );

  const accentClassName =
    COLOR_OPTIONS.find((option) => option.key === color)?.swatchClassName ??
    COLOR_OPTIONS[0].swatchClassName;

  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border-[1.5px] border-brand-border bg-white shadow-sm transition hover:shadow-md">
      <span className={`h-1.5 w-full shrink-0 ${accentClassName}`} />
      <div className="relative h-[150px] w-auto bg-white">
        {image && (
          <Image src={image} alt={title} fill className="object-contain" />
        )}
      </div>
      <div className="flex flex-col gap-2.5 p-5">
        <h3 className="truncate font-heading text-lg font-bold text-brand-ink">
          {title}
        </h3>
        <p className="h-[63px] overflow-hidden font-body text-sm leading-relaxed text-brand-ink-soft">
          {description}
        </p>
        <div className="flex items-center justify-end gap-1 pt-1">
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit card"
            className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-brand-purple/10"
          >
            <LuPencil className="h-4 w-4 text-brand-purple" />
          </button>
          <form action={deleteFormAction}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="dashboardId" value={dashboardId} />
            <button
              type="submit"
              aria-label="Delete card"
              className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-brand-coral/10"
            >
              <LuTrash2 className="h-4 w-4 text-brand-coral" />
            </button>
          </form>
        </div>
        {deleteState.error && (
          <p className="text-right text-xs text-brand-coral">
            {deleteState.error}
          </p>
        )}
      </div>
    </div>
  );
}
