'use client';

import Link from 'next/link';

import { PageHeadingWithButton } from '@/components/page-headings';
import { CreateButton } from '@/components/buttons';

export default function PagesPageHeading() {
  return (
    <PageHeadingWithButton heading="Pages">
      <Link href="/page?action=create">
        <CreateButton />
      </Link>
    </PageHeadingWithButton>
  );
}
