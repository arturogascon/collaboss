import Link from 'next/link';
import {logOut} from '@/app/utils/serverActions/authActions';

type Route = {
  name: string;
  url: string;
};

type Props = {
  routes: Array<Route>;
};

export default function MenuModal({routes}: Props) {
  return (
    <div className='absolute top-[56px] left-0 w-full divide-y divide-slate-200 divide-solid z-10 text-purple'>
      {routes.map((route) => (
        <div key={route.name} className='px-2.5 py-4 text-center bg-green-light relative'>
          <Link href={route.url}>{route.name}</Link>
        </div>
      ))}
      <form action={logOut} className='px-2.5 py-4 text-center bg-green-light'>
        <button type='submit'>Log Out</button>
      </form>
    </div>
  );
}
