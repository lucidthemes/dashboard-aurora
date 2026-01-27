import { useInfiniteQuery } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';

import { getInstagramFeedFormMedia } from '@/lib/instagram-feed';
import type { InstagramFeedFormMedia } from '@/schemas/instagram-feed.schema';

export default function useInstagramFeedFormMedia() {
  const feedFormMediaQuery = useInfiniteQuery<
    InstagramFeedFormMedia | undefined,
    Error,
    InfiniteData<InstagramFeedFormMedia | undefined>,
    ['feedFormAllMedia'],
    number
  >({
    queryKey: ['feedFormAllMedia'],
    queryFn: ({ pageParam }) => getInstagramFeedFormMedia(pageParam),

    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  return feedFormMediaQuery;
}
