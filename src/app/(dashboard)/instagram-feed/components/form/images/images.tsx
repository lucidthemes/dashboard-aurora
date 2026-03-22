'use client';

import { LoadingSpinner } from '@/components/loading';

import useInstagramFeedFormImages from '../../../hooks/use-form-images';
import InstagramFeedFormImagesList from './list';
import InstagramFeedFormImagesAddButton from './add-button';

export default function InstagramFeedFormImages({
  formType,
  feedId,
}: {
  formType: 'create' | 'edit';
  feedId?: string | null;
}) {
  const feedFormImagesQuery = useInstagramFeedFormImages(formType, feedId);

  if (feedFormImagesQuery.isLoading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-y-4">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <InstagramFeedFormImagesList formType={formType} feedFormImagesQuery={feedFormImagesQuery} />
        <InstagramFeedFormImagesAddButton />
      </ul>
    </div>
  );
}
