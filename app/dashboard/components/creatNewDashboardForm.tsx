"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useActionState } from "react";
import MainButton from "@/app/components/buttons/MainButton";
import { createDashboard } from "@/app/utils/serverActions/dashboardActions";
import { TiPlus, TiMinus } from "react-icons/ti";

type UserIdProps = {
  userId: number;
};

export default function CreatNewDashboard({ userId }: UserIdProps) {
  const [isFormOpened, setIsFormOpened] = useState<boolean>(false);

  const handleClick = () => {
    setIsFormOpened(!isFormOpened);
  };
  return (
    <div className="px-3">
      <button className="flex items-center mb-2" onClick={handleClick}>
        {isFormOpened ? <TiMinus /> : <TiPlus />}
        <span className="ml-1">Create new dashboard</span>
      </button>
      {isFormOpened && <CreateNewDashboardForm userId={userId} />}
    </div>
  );
}

const initialState = {
  message: "",
  error: undefined,
};

function CreateNewDashboardForm({ userId }: UserIdProps) {
  const [state, formAction] = useActionState(createDashboard, initialState);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (state.message) {
      setTitle("");
    }

    return () => {
      setTitle("");
    };
  }, [state]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      {state.error && (
        <p className="text-xs text-red-500 mb-2">{state.error}</p>
      )}
      <form
        action={formAction}
        className="flex flex-col text-left card-form px-4"
      >
        <input type="text" name="userId" hidden defaultValue={userId} />
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          className="inline-block px-2 placeholder:text-purple placeholder:opacity-75"
          autoComplete="off"
          aria-label="title"
          placeholder="Title"
        />
        <MainButton type="submit" className="w-fit self-end">
          Create
        </MainButton>
      </form>
    </div>
  );
}
