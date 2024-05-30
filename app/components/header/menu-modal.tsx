import Link from 'next/link';

type Route = {
  name: string;
  url: string;
};

type Props = {
  routes: Array<Route>;
};

export default function MenuModal({routes}: Props) {
  return (
    <div className='absolute top-[56px] left-0 w-full divide-y divide-slate-200 divide-solid'>
      {routes.map((route) => (
        <div key={route.name} className='px-2.5 py-4 text-center bg-green-light'>
          <Link href={route.url}>{route.name}</Link>
        </div>
      ))}
    </div>
  );
}
