import { ChangeEvent } from "react";

type Props = {
  label: string;
  name: string;
  value?: string;
  defaultValue?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  error?: string | false;
  wrapperClassName?: string;
};

const textareaBaseClassName =
  "resize-none rounded-xl bg-brand-canvas px-3.5 py-3 font-body text-[15px] font-medium text-brand-ink outline-none focus:border-brand-purple disabled:cursor-not-allowed disabled:opacity-50";
const getTextareaClassName = (hasError: boolean) =>
  hasError
    ? `${textareaBaseClassName} border-2 border-brand-coral`
    : `${textareaBaseClassName} border-[1.5px] border-brand-border`;
const labelClassName =
  "font-body text-[13px] font-semibold text-brand-ink-soft";
const errorClassName = "font-body text-xs font-medium text-[#E4483F]";

export default function Textarea({
  name,
  label,
  onChange,
  value,
  defaultValue,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
  error,
  wrapperClassName = "",
}: Props) {
  return (
    <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
      <label className={labelClassName} htmlFor={name}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={getTextareaClassName(Boolean(error))}
      />
      {error && <p className={errorClassName}>{error}</p>}
    </div>
  );
}
