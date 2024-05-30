'use client';
import {useState} from 'react';
import Image from 'next/image';
import MobileMenu from '@/app/components/header/mobile-menu/mobile-menu';
import MenuModal from '@/app/components/header/menu-modal';

type Props = {};

const routes = [
  {name: 'Dashboard', url: '/dashboard'},
  {name: 'Profile', url: '/profile'},
  {name: 'Logout', url: '/url'},
];

export default function Header({}: Props) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  return (
    <>
      {isOpenModal && <MenuModal routes={routes} />}
      <header className='h-14 py-1.5 px-3 flex flex-row justify-between'>
        <Image
          src='/collaboss-logo.png'
          width={100}
          height={120}
          alt='Collaboss Logo'
          className='inline-block w-auto h-auto'
        />
        <MobileMenu handleClick={() => setIsOpenModal(!isOpenModal)} />
      </header>
    </>
  );
}
