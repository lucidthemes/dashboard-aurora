'use client';

import { Grid2x2, List } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useMediaStore } from '../../../store/media-store';

export default function MediaTabsHeaderButtons() {
  const { layout, setLayout } = useMediaStore();

  return (
    <div className="flex gap-x-5">
      <Button
        variant="outline"
        size="sm"
        className={layout === 'grid' ? 'h-full cursor-pointer bg-accent' : 'h-full cursor-pointer'}
        onClick={() => setLayout('grid')}
      >
        <Grid2x2 />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={layout === 'list' ? 'h-full cursor-pointer bg-accent' : 'h-full cursor-pointer'}
        onClick={() => setLayout('list')}
      >
        <List />
      </Button>
    </div>
  );
}
