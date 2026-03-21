'use client';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';

import useMediaTabsHeaderTabsList from '../../../hooks/use-tabs-list';

export default function MediaTabsHeaderTabsList() {
  const onTabListItemClick = useMediaTabsHeaderTabsList();

  return (
    <TabsList>
      <TabsTrigger value="images" className="cursor-pointer" onClick={() => onTabListItemClick('images')}>
        Images
      </TabsTrigger>
      <TabsTrigger value="videos" className="cursor-pointer" onClick={() => onTabListItemClick('videos')}>
        Videos
      </TabsTrigger>
    </TabsList>
  );
}
