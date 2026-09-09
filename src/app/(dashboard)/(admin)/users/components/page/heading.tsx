'use client';

import { PageHeadingWithButton } from '@/components/page-headings';
import { CreateButton } from '@/components/buttons';

import { useUsersStore } from '../../store/users-store';

export default function UsersPageHeading() {
  const setCreateSheetOpen = useUsersStore((state) => state.setCreateSheetOpen);

  return (
    <PageHeadingWithButton heading="Users">
      <CreateButton
        onClick={() => {
          setCreateSheetOpen(true);
        }}
      />
    </PageHeadingWithButton>
  );
}
