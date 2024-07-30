'use client';
import MainButton from '@/app/components/buttons/MainButton';
import {ChangeEvent, LegacyRef, MutableRefObject, ReactEventHandler, useRef, useState} from 'react';

interface ImagePickerProps {
  name: string;
  label?: string;
  value?: string;
}

export default function ImagePicker({label, name, value}: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string>(value || '');
  const inputFileRef: MutableRefObject<(HTMLInputElement | null) | undefined> = useRef();

  const handleButtonClick = () => {
    inputFileRef?.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (!file) {
      setPickedImage(value || '');
    }

    setPickedImage(file?.name ? file.name : '');
  };

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type='file'
        id={name}
        accept='image/png, image/jpeg, image/webp'
        name={name}
        hidden
        ref={inputFileRef as MutableRefObject<HTMLInputElement | null>}
        onChange={handleImageChange}
      />
      <MainButton type='button' className='py-1 mb-1.5' onClick={handleButtonClick}>
        Pick an image
      </MainButton>
      <p className='pl-1.5 text-sm'>{pickedImage ? pickedImage : 'No picked image'}</p>
    </div>
  );
}
