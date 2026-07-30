"use client";
import { useState, type ReactNode } from "react";
import { LuX } from "react-icons/lu";

type BannerProps = {
  message: string;
  icon: ReactNode;
  className?: string;
  textClassName?: string;
  closeButtonClassName?: string;
};

export default function Banner({
  message,
  icon,
  className = "",
  textClassName = "",
  closeButtonClassName = "",
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border-[1.5px] px-3.5 py-3 ${className}`}
    >
      {icon}
      <p className={`flex-1 font-body text-xs font-medium ${textClassName}`}>
        {message}
      </p>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        aria-label="Dismiss"
        className={`shrink-0 ${closeButtonClassName}`}
      >
        <LuX className="h-4 w-4" />
      </button>
    </div>
  );
}
