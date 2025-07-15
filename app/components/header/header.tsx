"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import MobileMenu from "@/app/components/header/MobileMenu/MobileMenu";
import HeaderRoutes from "@/app/components/header/HeaderRoutes";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import Link from "next/link";

type Props = {
  session: Session | null;
};

const noAuthRoutes = [
  { name: "Sign Up", url: "/signup" },
  { name: "Log In", url: "/login" },
];

const authRoutes = [
  { name: "Dashboard", url: "/dashboard" },
  { name: "Profile", url: "/profile" },
  { name: "Logout", url: "/logout" },
];

export default function Header({ session }: Props) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    return () => {
      setIsOpenModal(false);
    };
  }, [path]);

  return (
    <>
      {isOpenModal && (
        <HeaderRoutes
          routes={session ? authRoutes : noAuthRoutes}
          onClick={() => setIsOpenModal(false)}
        />
      )}
      <header className="h-14 py-2 px-3 flex flex-row justify-between">
        <Link href="/">
          <Image
            src="/collaboss-logo.png"
            width={60}
            height={38}
            alt="Collaboss Logo"
            className=""
          />
        </Link>
        <MobileMenu handleClick={() => setIsOpenModal(!isOpenModal)} />
      </header>
    </>
  );
}
