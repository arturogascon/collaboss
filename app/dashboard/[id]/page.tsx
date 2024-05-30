import Card from '@/app/components/card/card';
import React from 'react';

type Props = {};

const cards = [
  {
    image: '/images/bread.webp',
    title: 'Francisca',
    description: 'I will bring bread',
  },
  {
    image: '/images/fruit.webp',
    title: 'Roxana',
    description: 'I will bring fruit',
  },
  {
    image: '/images/yogurt.png',
    title: 'Benito',
    description: 'I will bring yogurt',
  },
];

export default function Page({params}: {params: {id: string}}) {
  return (
    <div className='text-center'>
      <h2 className='text-2xl font-bold mb-4 text-purple'>Benito&apos;s Picnic</h2>
      <button className='m-5 border-2 border-purple-light border-solid py-2 px-4 rounded-lg bg-slate-100 text-purple hover:shadow-md hover:bg-transparent'>
        Create New Card
      </button>
      <div className='flex flex-row flex-wrap items-center justify-center'>
        {cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}
