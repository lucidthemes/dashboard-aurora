'use client';

import DeleteDialog from '@/components/dialogs/delete';

import { usePagesStore } from '../../store/pages-store';

export default function PagesPageWrapper({ children }: { children: React.ReactNode }) {
  const { deleteDialogOpen, setDeleteDialogOpen, deleteDialogPageId } = usePagesStore();

  const deleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      {children}

      {/* delete page dialog */}
      <DeleteDialog
        dialogOpen={deleteDialogOpen}
        dialogClose={deleteDialogClose}
        deleteRowId={deleteDialogPageId}
        deleteTable="pages"
        deletePath="/pages"
        deleteLogEventName="DELETE_PAGE"
        deleteLogEventMessage="Page"
        title="Delete page"
      />
    </>
  );
}
