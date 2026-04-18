import type { FetchNextPageOptions, InfiniteQueryObserverResult, InfiniteData } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import type { EditorMedia } from '../../schemas/media/media.schema';

export default function EditorMediaListLoadButton({
  fetchNextPage,
  isFetchingNextPage,
}: {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<EditorMedia | undefined, unknown>, Error>>;
  isFetchingNextPage: boolean;
}) {
  return (
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
  );
}
