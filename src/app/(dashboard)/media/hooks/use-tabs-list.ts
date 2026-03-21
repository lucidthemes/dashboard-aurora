'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function useMediaTabsHeaderTabsList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onTabListItemClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', value);
    router.push(`?${params.toString()}`);
  };

  return onTabListItemClick;
}
