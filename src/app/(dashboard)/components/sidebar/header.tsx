'use client';

import Link from 'next/link';
import Image from 'next/image';

import { SidebarHeader } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function DashboardSidebarHeader() {
  const databaseUsed = process.env.NEXT_PUBLIC_DATABASE ?? 'unknown';

  return (
    <SidebarHeader className="flex h-16 flex-row items-center justify-center gap-x-4 border-b-1">
      <Link href="/">
        <Image src="/aurora.svg" width={100} height={12.5} alt="Aurora" className="h-fit dark:invert" />
      </Link>
      <Separator orientation="vertical" className="max-h-4" />
      <Badge variant="outline" className="capitalize">
        {databaseUsed}
      </Badge>
    </SidebarHeader>
  );
}
