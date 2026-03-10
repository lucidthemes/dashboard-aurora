import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/loading';
import { useInstagramFeedStore } from '@/store/instagram-feed-store';

import useInstagramFeedFormImages from '../../hooks/form/use-images';
import InstagramFeedFormImagesList from './images-list';

export default function InstagramFeedFormImages({
  formType,
  feedId,
}: {
  formType: 'create' | 'edit';
  feedId?: string | null;
}) {
  const { setFormMediaOpen } = useInstagramFeedStore();

  const feedFormImagesQuery = useInstagramFeedFormImages(formType, feedId);

  if (feedFormImagesQuery.isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-y-4">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <InstagramFeedFormImagesList formType={formType} feedFormImagesQuery={feedFormImagesQuery} />
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
