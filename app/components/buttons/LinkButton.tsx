import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";

interface LinkButtonProps {
  children: ReactNode;
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  disabled?: boolean;
  disableText?: string;
}

export default function LinkButton({
  children,
  onClick,
  href,
  className = "",
  disabled = false,
  disableText = "",
}: LinkButtonProps) {
  return disabled ? (
    <button
      className={`border-2 border-slate-300 border-solid py-2 px-4 
        rounded-lg bg-transparent text-slate-300
        cursor-not-allowed ${className}`}
      disabled
    >
      {disableText}
    </button>
  ) : (
    <Link
      href={href}
      onClick={onClick}
      className={`border-2 border-purple-light border-solid py-2 px-4 
      rounded-lg bg-slate-100 text-purple hover:shadow-md hover:bg-transparent 
      cursor-pointer ${className}`}
    >
      {children}
    </Link>
  );
}
