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

  const { cards, title } = dashboard;

  return (
    <div className="text-center text-purple">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <CardsAndForms dashboardId={id} cards={cards} />
    </div>
  );
}
