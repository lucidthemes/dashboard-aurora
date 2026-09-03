import { useInfiniteQuery } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';

import { getEditorMedia } from '../../data/media/get-media';
import type { EditorMedia } from '../../schemas/media/media.schema';

export default function useEditorMedia(type: 'image' | 'video') {
  const editorMediaQuery = useInfiniteQuery<
    EditorMedia | undefined,
    Error,
    InfiniteData<EditorMedia | undefined>,
    ['editorMedia'],
    number
  >({
    queryKey: ['editorMedia'],
    queryFn: ({ pageParam }) => getEditorMedia({ type, page: pageParam }),

    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  return editorMediaQuery;
}
