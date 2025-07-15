"use client";
import React, { MouseEventHandler } from "react";
import { TiThMenu } from "react-icons/ti";

type Props = { handleClick: MouseEventHandler<HTMLButtonElement> };

export default function MobileMenu({ handleClick }: Props) {
  return (
    <button
      className="lg:hidden inline-block text-purple size-8 bg-contain bg-no-repeat bg-center cursor-pointer hover:opacity-50"
      onClick={handleClick}
    >
      <TiThMenu size="2rem" color="inherit" />
    </button>
  );
}
