'use client';

import { PageHeading } from '@/components/page-headings';

import useAccountDelete from '../../hooks/delete/use-delete';
import AccountDeleteButton from './button';
import AccountDeleteDialog from './dialog';

export default function AccountDelete() {
  const { dialogOpen, handleDialogOpen } = useAccountDelete();

  return (
    <div className="flex flex-col gap-5">
      <PageHeading heading="Delete" headingLevel={2} subHeading="Permanently delete your account" className="mb-0!" />
      <div className="rounded-md border border-red-200 bg-red-50 p-5">
        <p className="mb-4 text-sm text-muted-foreground">Deleting your account is permanent and cannot be undone</p>
        <AccountDeleteButton handleDialogOpen={handleDialogOpen} />
        <AccountDeleteDialog dialogOpen={dialogOpen} handleDialogOpen={handleDialogOpen} />
      </div>
    </div>
  );
}
