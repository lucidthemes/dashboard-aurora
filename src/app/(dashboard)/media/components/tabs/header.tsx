'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Grid2x2, List } from 'lucide-react';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useMediaStore } from '@/store/media-store';

import ListSort from '@/components/list/sort';

import { Separator } from '@/components/ui/separator';

export default function MediaTabsHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onTabClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', value);

    router.push(`?${params.toString()}`);
  };

  const { layout, setLayout } = useMediaStore();

  return (
    <div className="flex justify-between">
      <TabsList>
        <TabsTrigger value="images" className="cursor-pointer" onClick={() => onTabClick('images')}>
          Images
        </TabsTrigger>
        <TabsTrigger value="videos" className="cursor-pointer" onClick={() => onTabClick('videos')}>
          Videos
        </TabsTrigger>
      </TabsList>
      <div className="flex gap-x-5">
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
        <Separator orientation="vertical" className="hidden h-6! self-center lg:block" />
        <ListSort />
      </div>
    </div>
  );
}
