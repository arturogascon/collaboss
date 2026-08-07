"use client";
import { MouseEventHandler, useActionState, useState } from "react";
import type { CardType } from "@/app/utils/db/cards";
import { deleteCard } from "@/app/utils/serverActions/cardActions";
import Image from "next/image";
import { TiTimesOutline, TiPencil } from "react-icons/ti";
import { MdOutlineExpandMore, MdOutlineExpandLess } from "react-icons/md";
import styles from "./card.module.css";

type CardProps = CardType & {
  dashboardId: number;
  onEdit: MouseEventHandler<HTMLButtonElement>;
};

const initialDeleteState = {
  message: "",
};

export default function Card({
  id,
  image,
  title,
  description,
  dashboardId,
  onEdit,
}: CardProps) {
  const [isExpandedImg, setIsExpandedImg] = useState<boolean>(true);
  const [, deleteFormAction] = useActionState(deleteCard, initialDeleteState);

  return (
    <div className="m-3 w-72 h-fit rounded-2xl inline-block border-2 border-solid border-purple-light/15 text-left w-[250px] shadow-lg overflow-hidden text-purple">
      <div
        className={`size-[250px] relative transition-all duration-500 ${
          isExpandedImg ? "" : styles.hide
        }`}
      >
        <Image
          fill
          src={image}
          alt={title}
          className="mx-auto"
          style={{ objectFit: "cover" }}
        />
      </div>
      {image && (
        <button
          className={`w-full flex items-center justify-center text-sm ${
            isExpandedImg ? "" : "mt-1"
          }`}
          onClick={() => setIsExpandedImg(!isExpandedImg)}
        >
          {isExpandedImg ? (
            <>
              <span>Hide</span> <MdOutlineExpandLess size="1.5rem" />
            </>
          ) : (
            <>
              <span>Show</span> <MdOutlineExpandMore size="1.5rem" />
            </>
          )}
        </button>
      )}
      <div className="p-3">
        <h6 className="font-semibold">{title}</h6>
        <p className="mb-1">{description}</p>
        <div className="flex flex-row justify-between">
          <button onClick={onEdit}>
            <TiPencil size="1.5rem" color="inherit" />
          </button>
          <form action={deleteFormAction}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="dashboardId" value={dashboardId} />
            <button type="submit">
              <TiTimesOutline size="2rem" color="inherit" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
