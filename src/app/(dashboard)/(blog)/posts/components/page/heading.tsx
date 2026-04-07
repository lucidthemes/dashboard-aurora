'use client';

import Link from 'next/link';

import { PageHeadingWithButton } from '@/components/page-headings';
import { CreateButton } from '@/components/buttons';

export default function PostsPageHeading() {
  return (
    <PageHeadingWithButton heading="Posts">
      <Link href="/post?action=create">
        <CreateButton />
      </Link>
    </PageHeadingWithButton>
  );
}
