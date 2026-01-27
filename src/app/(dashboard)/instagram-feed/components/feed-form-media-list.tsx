import { Check, Image as ImageIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { LoadingSpinner } from '@/components/loading';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

import { useInstagramFeedStore } from '@/store/instagram-feed-store';

import useInstagramFeedFormMedia from '../hooks/use-feed-form-media';

export default function InstagramFeedFormMediaList() {
  const { selectedImages, addSelectedImage, removeSelectedImage } = useInstagramFeedStore();

  const feedFormMediaQuery = useInstagramFeedFormMedia();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = feedFormMediaQuery;

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {data && data.pages[0] !== undefined ? (
        <div className="flex flex-col gap-y-4">
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {data.pages.flatMap((page) =>
              page?.items.map((image) => {
                const publicMediaUrl = `/temp/${image.storage_path}`;

                const imageIsSelected = selectedImages.some((selected) => selected.media.id === image.id);

                return (
                  <li
                    key={image.id}
                    className="relative h-full w-full cursor-pointer overflow-hidden rounded-md"
                    onClick={() => {
                      if (!imageIsSelected) {
                        addSelectedImage(image);
                      } else {
                        removeSelectedImage(image.id);
                      }
                    }}
                  >
                    <img src={publicMediaUrl} alt={image.alt_text} className="aspect-square object-cover" />
                    {imageIsSelected && (
                      <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-muted">
                        <Check />
                      </div>
                    )}
                  </li>
                );
              }),
            )}
          </ul>
          {hasNextPage && (
            <Button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="flex cursor-pointer self-center"
            >
              {isFetchingNextPage ? (
                <span className="flex items-center gap-1">
                  <Spinner data-icon="inline-start" />
                  Loading...
                </span>
              ) : (
                'Load more'
              )}
            </Button>
          )}
        </div>
      ) : (
        <Empty className="">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ImageIcon />
            </EmptyMedia>
            <EmptyTitle>No media found</EmptyTitle>
          </EmptyHeader>
        </Empty>
      )}
    </>
  );
}
