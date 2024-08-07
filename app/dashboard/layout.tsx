import React from 'react';

export default function Layout({children}: {children: React.ReactNode}) {
  return <main className='p-5 relative'>{children}</main>;
}
