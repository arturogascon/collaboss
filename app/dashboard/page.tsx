import { auth } from "@/auth";
import {
  Dashboard as DashboardType,
  getAllDashboardsFromUser,
} from "../utils/api/dashboardApi";
import Link from "next/link";
import slugify from "slugify";
import CreatNewDashboard from "./components/creatNewDashboardForm";

type Props = {};

export default async function Dashboard({}: Props) {
  const session = await auth();

  if (!session?.user?.email) {
    return { error: "Not authenticated", message: "" };
  }
  let dashboards = await getAllDashboardsFromUser(session.user.email);

  if (!dashboards || !dashboards.length) {
    return (
      <div>
        <p>No dashboards created</p>
      </div>
    );
  }

  const { userId } = dashboards[0];

  const maxDashboardsLength = dashboards.length < 6;
  const shouldCreateNewDashboard = maxDashboardsLength && userId;

  return (
    <div>
      <p className="mb-4">Here are your dashboards links:</p>

      <ul className="px-3 mb-4">
        {dashboards.map((dashboard, index) => (
          <li
            key={`${slugify(dashboard.title)}-${index}`}
            className="cursor-pointer font-semibold hover:underline"
          >
            <Link href={"/dashboard/" + dashboard.id}>{dashboard.title}</Link>
          </li>
        ))}
      </ul>

      {shouldCreateNewDashboard && <CreatNewDashboard userId={userId} />}
    </div>
  );
}
