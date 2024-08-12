'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';
import MobileMenu from '@/app/components/header/mobile-menu/mobile-menu';
import MenuModal from '@/app/components/header/menu-modal';
import {usePathname} from 'next/navigation';

type Props = {};

const routes = [
  {name: 'Dashboard', url: '/dashboard'},
  {name: 'Profile', url: '/profile'},
];

export default function Header({}: Props) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const path = usePathname();

  useEffect(() => {
    // Temporary validation till we have proper auth logic
    if (path !== '/') {
      setIsAuth(true);
    }
  }, [path]);

  return (
    <>
      {isOpenModal && <MenuModal routes={routes} />}
      <header className='h-14 py-2 px-3 flex flex-row justify-between'>
        <Image
          src='/collaboss-logo.png'
          width={100}
          height={120}
          alt='Collaboss Logo'
          className='inline-block w-auto h-auto'
        />
        {isAuth && <MobileMenu handleClick={() => setIsOpenModal(!isOpenModal)} />}
      </header>
    </>
  );
}
