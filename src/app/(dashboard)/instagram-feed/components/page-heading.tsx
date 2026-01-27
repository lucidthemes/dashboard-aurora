'use client';

import { PageHeadingWithButton } from '@/components/page-headings';
import { CreateButton } from '@/components/buttons';
import { useInstagramFeedStore } from '@/store/instagram-feed-store';

export default function InstagramFeedPageHeading() {
  const { setCreateOpen } = useInstagramFeedStore();

  return (
    <PageHeadingWithButton heading="Instagram feed">
      <CreateButton
        onClick={() => {
          setCreateOpen(true);
        }}
      />
    </PageHeadingWithButton>
  );
}
