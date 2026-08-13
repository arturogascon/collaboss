import Link from "next/link";
import { logOut } from "@/app/utils/serverActions/authActions";

type Route = {
  name: string;
  url: string;
};

type Props = {
  routes: Array<Route>;
  onClick: Function;
};

export default function HeaderRoutes({ routes, onClick }: Props) {
  return (
    <div className="absolute left-0 top-[56px] z-10 w-full text-brand-ink">
      <form
        action={logOut}
        className="divide-y divide-brand-border bg-white text-center shadow-lg"
      >
        {routes.map((route) => (
          <div
            key={route.name}
            className="h-12 bg-white text-center hover:bg-brand-canvas"
          >
            {!/logout/i.test(route.name) ? (
              <Link
                className="block h-full leading-[3rem]"
                key={route.name}
                onClick={() => onClick()}
                href={route.url}
              >
                {route.name}
              </Link>
            ) : (
              <button
                type="submit"
                className="block h-full w-full cursor-pointer leading-[3rem]"
              >
                Log Out
              </button>
            )}
          </div>
        ))}
      </form>
    </div>
  );
}
