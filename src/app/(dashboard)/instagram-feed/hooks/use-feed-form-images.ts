import { useQuery } from '@tanstack/react-query';

import { getInstagramFeedFormImages } from '@/lib/instagram-feed';
import type { InstagramFeedFormImages } from '@/schemas/instagram-feed.schema';

export default function useInstagramFeedFormImages(type?: 'create' | 'edit', feedId?: string | null) {
  const feedFormImagesQuery = useQuery<InstagramFeedFormImages[]>({
    queryKey: ['feedFormExistingMedia', type, feedId],
    queryFn: () => getInstagramFeedFormImages(feedId ?? null),
    enabled: type === 'edit' && !!feedId,
  });

  return feedFormImagesQuery;
}
