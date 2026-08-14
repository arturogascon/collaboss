'use client';
import {ChangeEvent, useRef, useState} from 'react';
import {LuImagePlus} from 'react-icons/lu';

interface ImagePickerProps {
  name: string;
  label?: string;
  value?: string;
}

export default function ImagePicker({label, name, value}: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string>(value || '');
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputFileRef.current?.click();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (!file) {
      setPickedImage(value || '');
    }

    setPickedImage(file?.name ? file.name : '');
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="font-body text-[13px] font-semibold text-brand-ink-soft">
          {label}
        </span>
      )}
      <input
        type="file"
        id={name}
        accept="image/png, image/jpeg, image/webp"
        name={name}
        hidden
        ref={inputFileRef}
        onChange={handleImageChange}
      />
      <button
        type="button"
        onClick={handleButtonClick}
        aria-label={label || 'Upload an image'}
        className="flex flex-col items-center justify-center gap-2 rounded-xl border-[1.5px] border-brand-border bg-brand-canvas px-4 py-6 text-center transition hover:border-brand-purple sm:py-7 lg:py-8"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-purple/10 sm:h-[42px] sm:w-[42px] lg:h-12 lg:w-12">
          <LuImagePlus className="h-[18px] w-[18px] text-brand-purple sm:h-[22px] sm:w-[22px] lg:h-6 lg:w-6" />
        </span>
        <span className="font-body text-sm font-semibold text-brand-ink sm:text-[15px]">
          {pickedImage ? 'Change image' : 'Click to upload an image'}
        </span>
        <span className="font-body text-xs font-medium text-brand-ink-faint sm:text-[13px]">
          {pickedImage || 'PNG, JPG or WEBP'}
        </span>
      </button>
    </div>
  );
}
