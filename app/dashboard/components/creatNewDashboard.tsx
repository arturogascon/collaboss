"use client";
import { useState } from "react";
import Button from "@/app/components/buttons/Button";
import { LuPlus, LuX } from "react-icons/lu";
import CreateNewDashboardForm from "./createNewDashboardForm";

type CreatNewDashboardProps = {
  userId: string;
  variant?: "tile" | "button";
};

export default function CreatNewDashboard({
  userId,
  variant = "tile",
}: CreatNewDashboardProps) {
  const [isFormOpened, setIsFormOpened] = useState<boolean>(false);

  const handleClick = () => {
    setIsFormOpened(!isFormOpened);
  };

  return (
    <div className={variant === "tile" ? "flex w-full flex-col" : "flex flex-col items-start"}>
      {variant === "tile" ? (
        <button
          type="button"
          onClick={handleClick}
          className="flex w-full items-center gap-3.5 rounded-2xl border-[1.5px] border-brand-purple bg-brand-canvas p-4 text-left transition hover:bg-white sm:flex-col sm:items-center sm:justify-center sm:gap-3 sm:p-6 sm:text-center"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-purple sm:h-11 sm:w-11">
            {isFormOpened ? (
              <LuX className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            ) : (
              <LuPlus className="h-4 w-4 text-white sm:h-5 sm:w-5" />
            )}
          </span>
          <span className="font-heading text-[15px] font-semibold text-brand-purple">
            {isFormOpened ? "Cancel" : "Create new dashboard"}
          </span>
        </button>
      ) : (
        <Button
          onClick={handleClick}
          icon={
            isFormOpened ? (
              <LuX className="h-[18px] w-[18px]" />
            ) : (
              <LuPlus className="h-[18px] w-[18px]" />
            )
          }
        >
          {isFormOpened ? "Cancel" : "Create Dashboard"}
        </Button>
      )}
      {isFormOpened && <CreateNewDashboardForm userId={userId} />}
    </div>
  );
}
