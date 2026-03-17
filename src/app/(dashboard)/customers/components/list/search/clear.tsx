'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { CircleX } from 'lucide-react';

export default function CustomersListSearchClear() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchRemove = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('search');
    router.push(`?${params.toString()}`);
  };

  return (
    <Button variant="outline" size="icon" className="cursor-pointer" onClick={() => handleSearchRemove()}>
      <CircleX />
    </Button>
  );
}
