'use client';
import React, {useState} from 'react';
import slugify from 'slugify';
import Card from '@/app/components/card/card';
import CreateCardButton from '@/app/components/forms/createCardButton';
import EditCardForm from '@/app/components/forms/editCardForm';
import {CardType} from '@/app/utils/api/cardApi';

interface CardsAndFormsProps {
  cards: Array<CardType>;
  dashboardId: number;
}

export default function CardsAndForms({cards, dashboardId}: CardsAndFormsProps) {
  const [editFormCardId, setEditFormCardId] = useState<undefined | number>(undefined);

  const currentCardData = cards.find((card) => card.id === editFormCardId);

  const handleEdit = (cardId: number) => {
    setEditFormCardId(cardId);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <CreateCardButton />
      {editFormCardId && (
        <EditCardForm dashboardId={dashboardId} card={currentCardData} onClose={() => setEditFormCardId(undefined)} />
      )}
      <div className='flex flex-row flex-wrap items-center justify-center'>
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <Card
              key={`${slugify(card.title)}-${index}`}
              {...card}
              onEdit={() => handleEdit(card.id)}
              dashboardId={dashboardId}
            />
          ))
        ) : (
          <h3>There are no cards in this dashboard</h3>
        )}
      </div>
    </>
  );
}
