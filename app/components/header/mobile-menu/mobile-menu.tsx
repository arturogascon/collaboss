'use client';
import React, {MouseEventHandler} from 'react';

type Props = {handleClick: MouseEventHandler<HTMLDivElement>};

export default function MobileMenu({handleClick}: Props) {
  return (
    <div
      className='lg:hidden inline-block size-8 bg-contain bg-no-repeat bg-center cursor-pointer hover:translate-y-0.5 hover:-translate-x-0.5'
      style={{backgroundImage: 'url(/common/mobile-menu.svg)'}}
      onClick={handleClick}
    ></div>
  );
}
