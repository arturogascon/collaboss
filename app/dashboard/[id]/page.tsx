import CardsAndForms from "@/app/dashboard/[id]/cardsAndForms";
import { getDashboardData } from "@/app/utils/api/dashboardApi";
import { notFound } from "next/navigation";

export default async function Dashboard(props: {
  params: Promise<{ id: number }>;
}) {
  const params = await props.params;

  const { id } = params;

  const dashboard = await getDashboardData(id);

  if (!dashboard) {
    notFound();
  }

  const { cards, title, description } = dashboard;

  return (
    <CardsAndForms
      dashboardId={id}
      title={title}
      description={description}
      cards={cards}
    />
  );
}
