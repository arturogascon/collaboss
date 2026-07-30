import { ChangeEvent } from "react";

type InputType =
  | "text"
  | "checkbox"
  | "radio"
  | "password"
  | "email"
  | "number";

type Props = {
  label: string;
  type: InputType;
  name: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: "on" | "off";
  error?: string | false;
  wrapperClassName?: string;
};

const inputBaseClassName =
  "rounded-xl bg-brand-canvas px-3.5 py-3 font-body text-[15px] font-medium text-brand-ink outline-none focus:border-brand-purple disabled:cursor-not-allowed disabled:opacity-50";
const getInputClassName = (hasError: boolean) =>
  hasError
    ? `${inputBaseClassName} border-2 border-brand-coral`
    : `${inputBaseClassName} border-[1.5px] border-brand-border`;
const labelClassName =
  "font-body text-[13px] font-semibold text-brand-ink-soft";
const errorClassName = "font-body text-xs font-medium text-[#E4483F]";

export default function Input({
  type,
  name,
  label,
  onChange,
  value,
  defaultValue,
  required = false,
  disabled = false,
  autoComplete = "off",
  error,
  wrapperClassName = "",
}: Props) {
  return (
    <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
      <label className={labelClassName} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={getInputClassName(Boolean(error))}
      />
      {error && <p className={errorClassName}>{error}</p>}
    </div>
  );
}
