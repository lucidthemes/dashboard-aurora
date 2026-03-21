import { TabsContent } from '@/components/ui/tabs';
import ListControls from '@/components/list/controls';

import getMedia from '../../../data/get-media';
import MediaTabsContentLayout from './content-layout';
import MediaTabsContentEmpty from './empty';

export default async function MediaTabsContent({
  type,
  page,
  limit,
  sort,
}: {
  type: 'images' | 'videos';
  page: number;
  limit: number;
  sort?: string;
}) {
  const { media, totalCount } = await getMedia(type, page, limit, sort);

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
