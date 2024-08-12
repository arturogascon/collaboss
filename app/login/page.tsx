'use client';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {logIn} from '@/app/utils/serverActions/authActions';
import MainButton from '@/app/components/buttons/MainButton';
import {validateEmail} from '@/app/utils/string/fieldValidation';
import {useFormState} from 'react-dom';

interface LoginProps {}

type FormValues = {
  email: string;
  password: string;
};

export default function Login({}: LoginProps) {
  const [errorMessage, formAction, isPending] = useFormState(logIn, undefined);
  const [formValues, setFormValues] = useState<FormValues>({
    email: '',
    password: '',
  });
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (isValidEmail && formValues.password) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [isValidEmail, formValues.password]);

  const handleValueChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    setFormValues({...formValues, [name]: value});

    if (name === 'email') {
      setIsValidEmail(validateEmail(value));
    }
  };
  return (
    <div className='py-8 px-9 text-purple'>
      <h3 className='text-2xl font-semibold text-center mb-4'>Log In</h3>
      {errorMessage && <p className='text-xs text-red-500 mb-2'>{errorMessage as string}</p>}
      <form action={formAction} className='flex flex-col'>
        <label className='text-sm font-semibold mb-1' htmlFor='email'>
          Email:
        </label>
        <input type='email' id='email' name='email' required onChange={handleValueChange} autoComplete='off' />
        {formValues.email && !isValidEmail && (
          <p className='text-xs -mt-[15px] text-red-500 mb-2'>Email is not valid</p>
        )}
        <label className='text-sm font-semibold mb-1' htmlFor='password'>
          Password:
        </label>
        <input type='password' id='password' name='password' required onChange={handleValueChange} />
        <MainButton className='w-fit self-end' type='submit' disabled={isSubmitDisabled || isPending}>
          Log In
        </MainButton>
      </form>
    </div>
  );
}
