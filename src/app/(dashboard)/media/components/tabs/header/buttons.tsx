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
        title="Grid view"
      >
        <Grid2x2 />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={layout === 'list' ? 'h-full cursor-pointer bg-accent' : 'h-full cursor-pointer'}
        onClick={() => setLayout('list')}
        title="List view"
      >
        <List />
      </Button>
    </div>
  );
}
