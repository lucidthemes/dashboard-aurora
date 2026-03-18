'use client';

import { useSearchParams } from 'next/navigation';

import ListFilterClearAll from './clear-all';

export default function ListFilters({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();

  const activeFilters = searchParams.toString().includes('filter_');

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      {children}
      {activeFilters && <ListFilterClearAll />}
    </div>
  );
}
