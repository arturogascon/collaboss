import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PageHeader from "@/app/dashboard/components/pageHeader";
import CreateNewDashboardForm from "@/app/dashboard/components/createNewDashboardForm";

export default async function CreateDashboardPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-7 sm:gap-8 lg:gap-10">
      <PageHeader
        title="Create Dashboard"
        subtitle="Give your dashboard a title, description, and color so your team can spot it at a glance."
      />
      <CreateNewDashboardForm userId={session.user.id} />
    </div>
  );
}
