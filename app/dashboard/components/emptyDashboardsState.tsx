import { LuLayoutDashboard } from "react-icons/lu";
import PageHeader from "./pageHeader";
import CreateNewDashboard from "./createNewDashboard";
import EmptyStatePanel from "@/app/components/emptyState/EmptyStatePanel";

export default function EmptyDashboardsState() {
  return (
    <div className="flex flex-col gap-7 sm:gap-8 lg:gap-10">
      <PageHeader
        title="Your Dashboards"
        subtitle="Create your first dashboard to get started."
      />
      <EmptyStatePanel
        icon={<LuLayoutDashboard className="h-7 w-7 text-white sm:h-10 sm:w-10" />}
        heading="No dashboards yet"
        description="Create a dashboard to start organizing cards with your team."
        action={<CreateNewDashboard variant="button" />}
      />
    </div>
  );
}
