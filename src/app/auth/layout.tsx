import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) redirect('/');

  return (
    <div className="flex min-h-svh">
      <div className="flex w-full flex-col gap-4 p-6 md:basis-2/3 md:p-10">
        <Link href="https://aurora-sb.vercel.app/" className="w-fit">
          <Image src="/aurora.svg" alt="Aurora logo" width={160} height={20} className="dark:invert" />
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-md flex-col gap-y-10">{children}</div>
        </div>
      </div>
      <div className="hidden basis-1/3 bg-[url(/images/login-side.jpg)] bg-cover bg-center bg-no-repeat md:block"></div>
    </div>
  );
}
