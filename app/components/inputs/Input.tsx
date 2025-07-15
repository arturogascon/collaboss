import React, { ChangeEvent } from "react";
import slugify from "slugify";

type Props = {
  label: string;
  type: "text" | "checkbox" | "radio" | "password" | "email" | "number";
  name: string;
  value?: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autocomplete?: "on" | "off";
  error?: string | false;
};

const Input = ({
  type,
  name,
  label,
  onChange,
  value,
  required = false,
  autocomplete = "off",
  error,
}: Props) => {
  const id = `${slugify(label)}-${type}`;
  return (
    <>
      <label className="text-sm font-semibold mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autocomplete}
        className="h-9 px-2"
      />
      {error && <p className="text-xs -mt-[15px] text-red-500 mb-2">{error}</p>}
    </>
  );
};

export default Input;
