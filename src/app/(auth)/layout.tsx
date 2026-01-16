import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh">
      <div className="flex basis-2/3 flex-col gap-4 p-6 md:p-10">
        <Link href="https://aurora-sb.vercel.app/">
          <Image src="/images/logo.png" alt="Aurora logo" width={160} height={20} />
        </Link>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full max-w-md flex-col gap-y-10">{children}</div>
        </div>
      </div>
      <div className="basis-1/3 bg-[url(/images/login-side.jpg)] bg-cover bg-center bg-no-repeat lg:block"></div>
    </div>
  );
}
