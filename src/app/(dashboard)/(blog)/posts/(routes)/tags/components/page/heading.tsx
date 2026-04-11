'use client';

import { PageHeadingWithButton } from '@/components/page-headings';
import { CreateButton } from '@/components/buttons';

import { usePostsTagsStore } from '../../store/posts-tags-store';

export default function PostsTagsPageHeading() {
  const { setCreateSheetOpen } = usePostsTagsStore();

  return (
    <PageHeadingWithButton heading="Tags">
      <CreateButton onClick={() => setCreateSheetOpen(true)} />
    </PageHeadingWithButton>
  );
}
