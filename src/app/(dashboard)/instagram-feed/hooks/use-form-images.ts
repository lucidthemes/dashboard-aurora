import { useQuery } from '@tanstack/react-query';

import { getInstagramFeedFormImages } from '../data/get-form-images';
import type { InstagramFeedFormImages } from '../schemas/form.schema';

export default function useInstagramFeedFormImages(formType?: 'create' | 'edit', feedId?: string | null) {
  const feedFormImagesQuery = useQuery<InstagramFeedFormImages[]>({
    queryKey: ['feedFormExistingMedia', formType, feedId],
    queryFn: () => getInstagramFeedFormImages(feedId ?? null),
    enabled: formType === 'edit' && !!feedId,
  });

  return feedFormImagesQuery;
}
