import { TabsContent } from '@/components/ui/tabs';
import { ListControlItemsPerPage, ListControlPagination } from '@/components/list-controls';
import getMedia from '@/lib/media/get-media';

import MediaTabsContentLayout from './tabs-content-layout';
import MediaEmpty from './empty';

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

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <>
      <TabsContent value={type} className="flex flex-col gap-y-5">
        {media && media.length > 0 ? (
          <>
            <MediaTabsContentLayout media={media} type={type} />
            <div className="grid grid-cols-1 items-center gap-y-5 self-center sm:grid-cols-2 sm:self-auto lg:grid-cols-[1fr_auto_1fr]">
              <ListControlPagination
                currentPage={page}
                totalPages={totalPages}
                className="justify-self-center sm:justify-self-start lg:col-start-2 lg:justify-self-center"
              />
              <ListControlItemsPerPage currentValue={limit} className="justify-self-end lg:col-start-3" />
            </div>
          </>
        ) : (
          <MediaEmpty type={type} />
        )}
      </TabsContent>
    </>
  );
}
