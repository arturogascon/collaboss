import type { Dashboard } from "@/app/utils/api/dashboardApi";
import PageHeader from "./pageHeader";
import DashboardCard, { DASHBOARD_ICON_COLORS } from "./dashboardCard";
import CreateNewDashboard from "./createNewDashboard";

type DashboardsOverviewProps = {
  dashboards: Dashboard[];
  showCreateTile: boolean;
};

export default function DashboardsOverview({
  dashboards,
  showCreateTile,
}: DashboardsOverviewProps) {
  return (
    <div className="flex flex-col gap-7 sm:gap-8 lg:gap-10">
      <PageHeader
        title="Your Dashboards"
        subtitle="Jump back into a dashboard, or start something new."
      />
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
        {showCreateTile && <CreateNewDashboard variant="tile" />}
      </div>
    </div>
  );
}
