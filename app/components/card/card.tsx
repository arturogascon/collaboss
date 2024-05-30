import Image from 'next/image';

type Props = {
  image: string;
  title: string;
  description: string;
};

export default function Card({image, title, description}: Props) {
  return (
    <div className='m-3 w-72 h-96 rounded-2xl inline-block border-2 border-solid border-purple-light/15 text-left w-[300px] shadow-lg overflow-hidden'>
      <Image height={300} width={300} src={image} alt={title} className='mx-auto mb-2' />
      <div className='p-3'>
        <h6>{title}</h6>
        <p>{description}</p>
      </div>
    </div>
  );
}
