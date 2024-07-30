'use client';
import {TiTimesOutline} from 'react-icons/ti';
import {createCard} from '@/app/utils/serverActions/cardActions';
import MainButton from '@/app/components/buttons/MainButton';
import ImagePicker from '@/app/components/inputs/imagePicker';
import {useFormState} from 'react-dom';

interface CreateCardFormProps {
  onClose: Function;
  dashboardId: string;
}

const initialState = {
  message: '',
};

export default function CreateCardForm({onClose, dashboardId}: CreateCardFormProps) {
  const [state, formAction] = useFormState(createCard, initialState);
  const isCardCreated = state.message === 'Success';

  return (
    <div className='absolute z-10 top-0 left-1/2 -translate-x-1/2 bg-green-light w-[98%] pt-6 px-7 pb-8 text-right text-purple rounded-3xl shadow-[0.3rem_0.3rem_1rem_rgba(142,69,176,.35)]'>
      <button className='text-purple cursor-pointer' onClick={() => onClose()}>
        <TiTimesOutline size='2em' />
      </button>
      <h3 className='text-lg font-semibold text-left mb-4'>
        {isCardCreated ? 'Card Created Successfully' : 'Create New Card'}
      </h3>
      {!isCardCreated && (
        <form action={formAction} className='flex flex-col text-left card-form'>
          <input type='text' name='dashboardId' hidden defaultValue={dashboardId} />
          <label htmlFor='title'>Title:</label>
          <input id='title' type='text' name='title' className='inline-block' />
          <label htmlFor='description'>Description:</label>
          <input id='description' type='text' name='description' className='inline-block' />
          <ImagePicker name='card-image' />
          <MainButton type='submit' className='w-fit self-end'>
            Create
          </MainButton>
        </form>
      )}
    </div>
  );
}
