"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import MobileMenu from "@/app/components/header/MobileMenu/MobileMenu";
import HeaderRoutes from "@/app/components/header/HeaderRoutes";
import NavBar from "@/app/components/header/NavBar";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import Link from "next/link";

type Props = {
  session: Session | null;
};

const noAuthRoutes = [
  { name: "Sign Up", url: "/signup", isPrimary: true },
  { name: "Log In", url: "/login" },
];

const authRoutes = [
  { name: "Dashboard", url: "/dashboard" },
  { name: "Profile", url: "/profile" },
  { name: "Logout", url: "/logout", isPrimary: true },
];

export default function Header({ session }: Props) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    return () => {
      setIsOpenModal(false);
    };
  }, [path]);

  const routes = session ? authRoutes : noAuthRoutes;

  return (
    <>
      {isOpenModal && (
        <HeaderRoutes routes={routes} onClick={() => setIsOpenModal(false)} />
      )}
      <header className="flex flex-row items-center justify-between bg-brand-canvas px-5 py-3.5 md:px-14 md:py-6 lg:px-[100px] lg:py-6">
        <Link href="/" className="flex items-center gap-2 md:gap-2.5">
          <Image
            src="/collaboss-logo.png"
            alt="Collaboss"
            width={42}
            height={42}
            priority
          />
          <span className="font-heading text-xl font-bold text-brand-ink lg:text-[22px]">
            Collaboss
          </span>
        </Link>
        <div className="md:hidden">
          <MobileMenu handleClick={() => setIsOpenModal(!isOpenModal)} />
        </div>
        <NavBar routes={routes} />
      </header>
    </>
  );
}
