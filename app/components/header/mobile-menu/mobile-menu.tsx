'use client';
import React, {MouseEventHandler} from 'react';
import {TiThMenu} from 'react-icons/ti';

type Props = {handleClick: MouseEventHandler<HTMLButtonElement>};

export default function MobileMenu({handleClick}: Props) {
  return (
    <button
      className='lg:hidden inline-block text-purple size-8 bg-contain bg-no-repeat bg-center cursor-pointer hover:translate-y-0.5 hover:-translate-x-0.5'
      onClick={handleClick}
    >
      <TiThMenu size='2rem' color='inherit' />
    </button>
  );
}
