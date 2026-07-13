import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { logOut } from "@/app/utils/serverActions/authActions";
import LinkButton from "@/app/components/buttons/LinkButton";
import Button from "@/app/components/buttons/Button";

type Route = {
  name: string;
  url: string;
  isPrimary?: boolean;
};

type Props = {
  routes: Array<Route>;
};

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
            <Button type="submit">{primary.name}</Button>
          </form>
        ) : (
          <LinkButton
            href={primary.url}
            icon={<FiArrowRight size={16} />}
            iconPosition="right"
          >
            {primary.name}
          </LinkButton>
        ))}
    </nav>
  );
}
