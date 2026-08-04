import Link from "next/link";
import { LuChevronRight, LuLayoutDashboard } from "react-icons/lu";

export const DASHBOARD_ICON_COLORS = [
  "bg-brand-purple",
  "bg-brand-mint",
  "bg-brand-coral",
  "bg-brand-gold",
  "bg-brand-purple-dark",
];

type DashboardCardProps = {
  id: number;
  title: string;
  colorClassName: string;
};

export default function DashboardCard({
  id,
  title,
  colorClassName,
}: DashboardCardProps) {
  return (
    <Link
      href={`/dashboard/${id}`}
      className="flex items-center gap-3.5 rounded-2xl border-[1.5px] border-brand-border bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-col sm:items-stretch sm:gap-10 sm:p-6"
    >
      <div className="flex items-center gap-3.5 sm:w-full sm:justify-between sm:gap-0">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 sm:rounded-xl ${colorClassName}`}
        >
          <LuLayoutDashboard className="h-[18px] w-[18px] text-white sm:h-5 sm:w-5" />
        </span>
        <LuChevronRight className="hidden h-5 w-5 shrink-0 text-brand-ink-faint sm:block" />
      </div>
      <span className="flex-1 truncate font-heading text-base font-semibold text-brand-ink sm:text-lg">
        {title}
      </span>
      <LuChevronRight className="h-[18px] w-[18px] shrink-0 text-brand-ink-faint sm:hidden" />
    </Link>
  );
}
