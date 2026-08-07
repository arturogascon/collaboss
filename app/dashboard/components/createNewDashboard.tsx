import Link from "next/link";
import LinkButton from "@/app/components/buttons/LinkButton";
import { LuPlus } from "react-icons/lu";

type CreateNewDashboardProps = {
  variant?: "tile" | "button";
};

export default function CreateNewDashboard({
  variant = "tile",
}: CreateNewDashboardProps) {
  if (variant === "button") {
    return (
      <LinkButton
        href="/dashboard/create"
        icon={<LuPlus className="h-[18px] w-[18px]" />}
      >
        Create Dashboard
      </LinkButton>
    );
  }

  return (
    <Link
      href="/dashboard/create"
      className="flex w-full items-center gap-3.5 rounded-2xl border-[1.5px] border-brand-purple bg-brand-canvas p-4 text-left transition hover:bg-white sm:flex-col sm:items-center sm:justify-center sm:gap-3 sm:p-6 sm:text-center"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-purple sm:h-11 sm:w-11">
        <LuPlus className="h-4 w-4 text-white sm:h-5 sm:w-5" />
      </span>
      <span className="font-heading text-[15px] font-semibold text-brand-purple">
        Create new dashboard
      </span>
    </Link>
  );
}
