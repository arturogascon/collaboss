import { LuLayoutDashboard } from "react-icons/lu";
import DashboardPageHeader from "./dashboardPageHeader";
import CreatNewDashboard from "./creatNewDashboard";

type EmptyDashboardsStateProps = {
  userId: string;
};

export default function EmptyDashboardsState({
  userId,
}: EmptyDashboardsStateProps) {
  return (
    <div className="flex flex-col gap-7 sm:gap-8 lg:gap-10">
      <DashboardPageHeader subtitle="Create your first dashboard to get started." />
      <div className="flex justify-center pt-4 sm:pt-6 lg:pt-10">
        <div className="flex w-full max-w-xl flex-col items-center gap-4 rounded-3xl border-[1.5px] border-brand-border px-6 py-10 text-center sm:gap-6 sm:px-14 sm:py-16">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-purple sm:h-[88px] sm:w-[88px]">
            <LuLayoutDashboard className="h-7 w-7 text-white sm:h-10 sm:w-10" />
          </span>
          <div className="flex flex-col items-center gap-1.5 sm:gap-2">
            <h2 className="font-heading text-lg font-bold text-brand-ink sm:text-[22px]">
              No dashboards yet
            </h2>
            <p className="font-body text-sm font-medium text-brand-ink-soft">
              Create a dashboard to start organizing cards with your team.
            </p>
          </div>
          <CreatNewDashboard userId={userId} variant="button" />
        </div>
      </div>
    </div>
  );
}
