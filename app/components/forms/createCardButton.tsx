'use client';
import MainButton from '@/app/components/buttons/MainButton';
import CreateCardForm from '@/app/components/forms/createCardForm';
import {useState} from 'react';
import {useParams} from 'next/navigation';

export default function CreateCardButton() {
  const [shouldShowForm, setShouldShowForm] = useState<boolean>(false);
  const params = useParams();

  return (
    <>
      {shouldShowForm && (
        <CreateCardForm dashboardId={params.id as string} onClose={() => setShouldShowForm(!shouldShowForm)} />
      )}
      <MainButton onClick={() => setShouldShowForm(!shouldShowForm)} className='m-5'>
        Create New Card
      </MainButton>
    </>
  );
}
