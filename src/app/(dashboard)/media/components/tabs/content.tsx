import { TabsContent } from '@/components/ui/tabs';
import getMedia from '@/lib/media/get-media';

import ListControls from '@/components/list/controls';

import MediaTabsContentLayout from './content-layout';
import MediaTabsContentEmpty from './content-empty';

export default async function MediaTabsContent({
  type,
  page,
  limit,
}: {
  type: 'images' | 'videos';
  page: number;
  limit: number;
}) {
  const { media, totalCount } = await getMedia(type, page, limit);

  return (
    <>
      <TabsContent value={type} className="flex flex-col gap-y-5">
        {media && media.length > 0 ? (
          <>
            <MediaTabsContentLayout media={media} type={type} />
            <ListControls page={page} limit={limit} totalCount={totalCount} />
          </>
        ) : (
          <MediaTabsContentEmpty type={type} />
        )}
      </TabsContent>
    </>
  );
}
