import { auth } from "@/auth";
import { getAllDashboardsFromUser } from "../utils/api/dashboardApi";
import { redirect } from "next/navigation";
import DashboardsOverview from "./components/dashboardsOverview";
import EmptyDashboardsState from "./components/emptyDashboardsState";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }
  const dashboards = await getAllDashboardsFromUser(session.user.id);

  if (!dashboards) {
    throw new Error("Failed to fetch dashboards");
  }

  const MAX_DASHBOARDS = 6;
  const shouldCreateNewDashboard = dashboards.length < MAX_DASHBOARDS;

  return dashboards.length === 0 ? (
    <EmptyDashboardsState />
  ) : (
    <DashboardsOverview
      dashboards={dashboards}
      showCreateTile={shouldCreateNewDashboard}
    />
  );
}
