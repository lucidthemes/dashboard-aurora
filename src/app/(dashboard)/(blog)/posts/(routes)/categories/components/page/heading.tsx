'use client';

import { PageHeadingWithButton } from '@/components/page-headings';
import { CreateButton } from '@/components/buttons';

import { usePostsCategoriesStore } from '../../store/posts-categories-store';

export default function PostsCategoriesPageHeading() {
  const { setCreateSheetOpen } = usePostsCategoriesStore();

  return (
    <PageHeadingWithButton heading="Categories">
      <CreateButton onClick={() => setCreateSheetOpen(true)} />
    </PageHeadingWithButton>
  );
}
