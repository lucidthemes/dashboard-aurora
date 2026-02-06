import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/loading';
import { useInstagramFeedStore } from '@/store/instagram-feed-store';

import useInstagramFeedFormImages from '../hooks/use-feed-form-images';
import InstagramFeedFormImagesList from './feed-form-images-list';

export default function InstagramFeedFormImages({ type, feedId }: { type: 'create' | 'edit'; feedId?: string | null }) {
  const { setFormMediaOpen } = useInstagramFeedStore();

  const feedFormImagesQuery = useInstagramFeedFormImages(type, feedId);

  if (feedFormImagesQuery.isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-y-4">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <InstagramFeedFormImagesList type={type} feedFormImagesQuery={feedFormImagesQuery} />
        <li className="flex aspect-square items-center justify-center rounded-md border-1 border-dashed">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="cursor-pointer"
            onClick={() => setFormMediaOpen(true)}
          >
            <Plus />
          </Button>
        </li>
      </ul>
    </div>
  );
}
