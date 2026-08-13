"use client";
import React, { MouseEventHandler } from "react";
import { FiMenu } from "react-icons/fi";

type Props = { handleClick: MouseEventHandler<HTMLButtonElement> };

export default function MobileMenu({ handleClick }: Props) {
  return (
    <button
      className="inline-flex cursor-pointer items-center justify-center text-brand-ink hover:opacity-60"
      onClick={handleClick}
      aria-label="Toggle menu"
    >
      <FiMenu size={22} />
    </button>
  );
}
