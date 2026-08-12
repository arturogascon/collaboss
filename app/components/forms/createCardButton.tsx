'use client';
import Button from '@/app/components/buttons/Button';
import CreateCardForm from '@/app/components/forms/createCardForm';
import {useState} from 'react';
import {useParams} from 'next/navigation';
import {LuPlus} from 'react-icons/lu';

type CreateCardButtonProps = {
  className?: string;
};

export default function CreateCardButton({className = ''}: CreateCardButtonProps) {
  const [shouldShowForm, setShouldShowForm] = useState<boolean>(false);
  const params = useParams();

  return (
    <>
      {shouldShowForm && (
        <CreateCardForm dashboardId={params.id as string} onClose={() => setShouldShowForm(!shouldShowForm)} />
      )}
      <Button
        onClick={() => setShouldShowForm(!shouldShowForm)}
        icon={<LuPlus className="h-[18px] w-[18px]" />}
        className={`justify-center ${className}`}
      >
        Create Card
      </Button>
    </>
  );
}
