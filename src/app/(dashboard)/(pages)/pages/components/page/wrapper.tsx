'use client';

import { useShallow } from 'zustand/react/shallow';

import DeleteDialog from '@/components/dialogs/delete';

import { usePagesStore } from '../../store/pages-store';

export default function PagesPageWrapper({ children }: { children: React.ReactNode }) {
  const { deleteDialogOpen, deleteDialogPageId, setDeleteDialogOpen } = usePagesStore(
    useShallow((state) => ({
      deleteDialogOpen: state.deleteDialogOpen,
      deleteDialogPageId: state.deleteDialogPageId,
      setDeleteDialogOpen: state.setDeleteDialogOpen,
    })),
  );

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
