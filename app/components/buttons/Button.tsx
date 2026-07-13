import type { MouseEventHandler, ReactNode } from "react";
import { buttonBaseClassName, IconPosition } from "@/app/components/buttons/buttonStyles";

type ButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "button";
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  icon,
  iconPosition = "right",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${buttonBaseClassName} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </button>
  );
}
