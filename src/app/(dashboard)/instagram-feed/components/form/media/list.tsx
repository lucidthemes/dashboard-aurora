'use client';

import { LoadingSpinner } from '@/components/loading';

import useInstagramFeedFormMedia from '../../../hooks/use-form-media';
import InstagramFeedFormMediaListItem from './item';
import InstagramFeedFormMediaListLoadButton from './load-button';
import InstagramFeedFormMediaListEmpty from './empty';

export default function InstagramFeedFormMediaList() {
  const feedFormMediaQuery = useInstagramFeedFormMedia();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = feedFormMediaQuery;

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {data && data.pages[0] !== undefined ? (
        <div className="flex flex-col gap-y-4">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {data.pages.flatMap((page) =>
              page?.items.map((image) => <InstagramFeedFormMediaListItem key={image.id} item={image} />),
            )}
          </ul>
          {hasNextPage && (
            <InstagramFeedFormMediaListLoadButton
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </div>
      ) : (
        <InstagramFeedFormMediaListEmpty />
      )}
    </>
  );
}
