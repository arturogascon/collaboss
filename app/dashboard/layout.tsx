import Header from '@/app/components/header/header';
import React from 'react';

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Header />
      <main className='p-5'>{children}</main>
    </>
  );
}
