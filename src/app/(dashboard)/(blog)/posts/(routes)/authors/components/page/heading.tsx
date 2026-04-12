'use client';

import { PageHeadingWithButton } from '@/components/page-headings';
import { CreateButton } from '@/components/buttons';

import { usePostsAuthorsStore } from '../../store/posts-authors-store';

export default function PostsAuthorsPageHeading() {
  const { setCreateSheetOpen } = usePostsAuthorsStore();

  return (
    <PageHeadingWithButton heading="Authors">
      <CreateButton onClick={() => setCreateSheetOpen(true)} />
    </PageHeadingWithButton>
  );
}
