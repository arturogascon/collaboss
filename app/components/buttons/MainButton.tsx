import {MouseEventHandler, ReactNode} from 'react';

interface BaseButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'submit' | 'button';
  className?: string;
  disabled?: boolean;
}

export default function MainButton({
  children,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}: BaseButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border-2 border-purple-light border-solid py-2 px-4 
        rounded-lg bg-slate-100 text-purple hover:shadow-md hover:bg-transparent 
        cursor-pointer disabled:bg-transparent disabled:text-slate-300 disabled:border-slate-300 ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
