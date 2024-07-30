'use client';
import {useState, ChangeEvent, useEffect} from 'react';
import MainButton from '@/app/components/buttons/MainButton';
import {useFormState} from 'react-dom';
import {signUp} from '@/app/utils/serverActions/authActions';
import {validateEmail} from '@/app/utils/string/fieldValidation';

interface SignUpProps {}

const initialState = {
  error: '',
  message: '',
};

type FormValues = {
  name: string;
  email: string;
  password: string;
  re_password: string;
};

export default function SignUp({}: SignUpProps) {
  const [state, formAction] = useFormState(signUp, initialState);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    password: '',
    re_password: '',
  });
  const [isValidName, setIsValidName] = useState<boolean>(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  const [doesPasswordsMatch, setDoesPasswordsMatch] = useState<boolean>(false);
  const serverError = state.error;

  useEffect(() => {
    if (isValidEmail && isValidName && isValidPassword && doesPasswordsMatch && isValidPassword) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [isValidName, isValidEmail, isValidPassword, doesPasswordsMatch]);

  const handleValueChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    setFormValues({...formValues, [name]: value});

    if (name === 'name' && value) {
      const testName = /^\w{2,}$/.test(value);
      setIsValidName(testName);
    }

    if (name === 'email') {
      setIsValidEmail(validateEmail(value));
    }

    if (name === 'password' && value) {
      const testPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{8,}$/.test(value);
      setIsValidPassword(testPassword);
    }

    if (name === 're_password') {
      setDoesPasswordsMatch(value === formValues.password);
    }
  };

  return (
    <div className='py-8 px-9 text-purple'>
      <h3 className='text-2xl font-semibold text-center mb-4'>Sign Up</h3>
      {serverError && <p className='text-xs text-red-500 mb-2'>{serverError}</p>}
      <form action={formAction} className='flex flex-col'>
        <label className='text-sm font-semibold mb-1' htmlFor='name'>
          Name:
        </label>
        <input type='text' id='name' name='name' required onChange={handleValueChange} autoComplete='off' />
        {formValues.name && !isValidName && (
          <p className='text-xs -mt-[15px] text-red-500 mb-2'>Name must have at least two characters</p>
        )}
        <label className='text-sm font-semibold mb-1' htmlFor='email'>
          Email:
        </label>
        <input type='email' id='email' name='email' required onChange={handleValueChange} autoComplete='off' />
        {formValues.email && !isValidEmail && (
          <p className='text-xs -mt-[15px] text-red-500 mb-2'>Email is not valid</p>
        )}
        <label className='text-sm font-semibold mb-1' htmlFor='password'>
          Create Password:
        </label>
        <input type='password' id='password' name='password' required onChange={handleValueChange} />
        {formValues.password && !isValidPassword && (
          <p className='text-xs -mt-[15px] text-red-500 mb-2'>
            Password must be 8 characters long an include at least one alphabetic character, one number and one special
            character
          </p>
        )}
        <label className='text-sm font-semibold mb-1' htmlFor='re_password'>
          Retype Password:
        </label>
        <input
          type='password'
          id='re_password'
          name='re_password'
          required
          onChange={handleValueChange}
          disabled={!!!isValidPassword}
        />
        {formValues.re_password && !doesPasswordsMatch && (
          <p className='text-xs -mt-[15px] text-red-500'>Passwords does not match</p>
        )}
        <MainButton className='w-fit self-end' type='submit' disabled={isSubmitDisabled}>
          Sign Up
        </MainButton>
      </form>
    </div>
  );
}
