'use client';

import { PageHeadingWithButton } from '@/components/page-headings';
import { CreateButton } from '@/components/buttons';
import { useSidebarsStore } from '../../store/sidebars-store';

export default function SidebarsPageHeading() {
  const { setCreateSheetOpen } = useSidebarsStore();

  return (
    <PageHeadingWithButton heading="Sidebars">
      <CreateButton
        onClick={() => {
          setCreateSheetOpen(true);
        }}
      />
    </PageHeadingWithButton>
  );
}
