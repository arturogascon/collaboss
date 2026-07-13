import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { logOut } from "@/app/utils/serverActions/authActions";

type Route = {
  name: string;
  url: string;
  isPrimary?: boolean;
};

type Props = {
  routes: Array<Route>;
};

const primaryClassName =
  "flex items-center gap-2 rounded-bl-[28px] rounded-br-[8px] rounded-tl-[8px] rounded-tr-[28px] border-2 border-brand-outline bg-gradient-to-br from-brand-purple to-brand-purple-dark px-6 py-[11px] font-heading text-[15px] font-semibold text-white shadow-lg shadow-brand-purple/25 lg:px-[22px] lg:py-[10px] lg:text-[14px]";

export default function NavBar({ routes }: Props) {
  const primary = routes.find((route) => route.isPrimary);
  const links = routes.filter((route) => !route.isPrimary);

  return (
    <nav className="hidden items-center gap-7 md:flex lg:gap-6">
      {links.map((route) => (
        <Link
          key={route.name}
          href={route.url}
          className="font-body text-base font-medium text-brand-ink-soft hover:text-brand-ink lg:text-[15px]"
        >
          {route.name}
        </Link>
      ))}
      {primary &&
        (/logout/i.test(primary.name) ? (
          <form action={logOut}>
            <button type="submit" className={primaryClassName}>
              {primary.name}
            </button>
          </form>
        ) : (
          <Link href={primary.url} className={primaryClassName}>
            {primary.name}
            <FiArrowRight size={16} />
          </Link>
        ))}
    </nav>
  );
}
