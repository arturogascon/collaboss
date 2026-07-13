import Link from "next/link";
import type { ReactNode } from "react";
import { buttonBaseClassName, IconPosition } from "@/app/components/buttons/buttonStyles";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  className?: string;
};

export default function LinkButton({
  href,
  children,
  icon,
  iconPosition = "right",
  className = "",
}: LinkButtonProps) {
  return (
    <Link href={href} className={`${buttonBaseClassName} ${className}`}>
      {icon && iconPosition === "left" && icon}
      {children}
      {icon && iconPosition === "right" && icon}
    </Link>
  );
}
