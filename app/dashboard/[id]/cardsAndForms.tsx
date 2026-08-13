"use client";
import React, { useState } from "react";
import slugify from "slugify";
import { LuLayoutGrid, LuPencil } from "react-icons/lu";
import Card from "@/app/components/card/card";
import CreateCardButton from "@/app/components/forms/createCardButton";
import EditCardForm from "@/app/components/forms/editCardForm";
import DashboardPageHeader from "@/app/dashboard/components/dashboardPageHeader";
import EmptyStatePanel from "@/app/components/emptyState/EmptyStatePanel";
import type { CardType } from "@/app/utils/db/cards";

interface CardsAndFormsProps {
  cards: Array<CardType>;
  dashboardId: number;
  title: string;
  description: string | null;
}

export default function CardsAndForms({
  cards,
  dashboardId,
  title,
  description,
}: CardsAndFormsProps) {
  const [editFormCardId, setEditFormCardId] = useState<undefined | number>(
    undefined,
  );

  const currentCardData = cards.find((card) => card.id === editFormCardId);

  const handleEdit = (cardId: number) => {
    setEditFormCardId(cardId);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col gap-7 sm:gap-8 lg:gap-10">
      {editFormCardId && (
        <EditCardForm
          dashboardId={dashboardId}
          card={currentCardData}
          onClose={() => setEditFormCardId(undefined)}
        />
      )}
      <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <DashboardPageHeader
          title={title}
          subtitle={description ?? undefined}
          action={
            <button
              type="button"
              aria-label="Edit dashboard"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 transition hover:bg-brand-purple/20 sm:h-10 sm:w-10 lg:h-11 lg:w-11"
            >
              <LuPencil className="h-4 w-4 text-brand-purple sm:h-[18px] sm:w-[18px] lg:h-5 lg:w-5" />
            </button>
          }
        />
        {cards.length > 0 && <CreateCardButton className="w-full sm:w-auto" />}
      </div>
      {cards.length === 0 ? (
        <EmptyStatePanel
          icon={<LuLayoutGrid className="h-7 w-7 text-white sm:h-10 sm:w-10" />}
          heading="No cards yet"
          description="Add your first card to start building this dashboard."
          action={<CreateCardButton />}
        />
      ) : (
        <div className="flex flex-col gap-3.5 sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {cards.map((card, index) => (
            <Card
              key={`${slugify(card.title)}-${index}`}
              {...card}
              onEdit={() => handleEdit(card.id)}
              dashboardId={dashboardId}
              color={card.color}
            />
          ))}
        </div>
      )}
    </div>
  );
}
