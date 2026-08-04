import type { Dashboard } from "@/app/utils/api/dashboardApi";
import DashboardPageHeader from "./dashboardPageHeader";
import DashboardCard, { DASHBOARD_ICON_COLORS } from "./dashboardCard";
import CreatNewDashboard from "./creatNewDashboard";

type DashboardsOverviewProps = {
  dashboards: Dashboard[];
  userId: string;
  showCreateTile: boolean;
};

export default function DashboardsOverview({
  dashboards,
  userId,
  showCreateTile,
}: DashboardsOverviewProps) {
  return (
    <div className="flex flex-col gap-7 sm:gap-8 lg:gap-10">
      <DashboardPageHeader subtitle="Jump back into a dashboard, or start something new." />
      <div className="flex flex-col gap-3.5 sm:grid sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {dashboards.map((dashboard, index) => (
          <DashboardCard
            key={dashboard.id}
            id={dashboard.id}
            title={dashboard.title}
            colorClassName={
              DASHBOARD_ICON_COLORS[index % DASHBOARD_ICON_COLORS.length]
            }
          />
        ))}
        {showCreateTile && <CreatNewDashboard userId={userId} variant="tile" />}
      </div>
    </div>
  );
}
