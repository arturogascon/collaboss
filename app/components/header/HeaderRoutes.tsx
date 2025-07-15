import Link from "next/link";
import { logOut } from "@/app/utils/serverActions/authActions";
import { auth } from "@/auth";

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
    <div className="absolute top-[56px] left-0 w-full  z-10 text-purple">
      <form
        action={logOut}
        className="text-center bg-green-light divide-y-2 divide-slate-200 divide-solid"
      >
        {routes.map((route) => (
          <div
            key={route.name}
            className="h-12 text-center bg-green-light hover:bg-green-dark"
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
                className="cursor-pointer bl
                ock h-full w-full leading-[3rem]"
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
