'use client';

import { SheetWithForm } from '@/components/sheets';
import { DeleteDialog } from '@/components/dialogs';
import { useInstagramFeedStore } from '@/store/instagram-feed-store';

import InstagramFeedForm from './feed-form';

export default function InstagramFeedPageWrapper({ children }: { children: React.ReactNode }) {
  const {
    createOpen,
    setCreateOpen,
    editOpen,
    setEditOpen,
    editData,
    deleteOpen,
    setDeleteOpen,
    deleteRowId,
    setDeleteRowId,
    deleteTable,
    setDeleteTable,
    resetSelectedImages,
  } = useInstagramFeedStore();

  const createSheetClose = () => {
    setCreateOpen(false);
    resetSelectedImages();
  };

  const editSheetClose = () => {
    setEditOpen(false);
    resetSelectedImages();
  };

  const deleteDialogClose = () => {
    setDeleteOpen(false);
    setDeleteRowId(null);
    setDeleteTable(null);
  };

  return (
    <>
      {children}

      {/* create feed sheet */}
      <SheetWithForm
        sheetOpen={createOpen}
        sheetClose={createSheetClose}
        formId="instagram-feed-create-form"
        title="Create Instagram feed"
        description="Select options below for the feed. Click create when you're done"
        size="large"
        submitButtonText="Create Instagram feed"
      >
        <InstagramFeedForm type="create" formId="instagram-feed-create-form" />
      </SheetWithForm>

      {/* edit feed sheet */}
      <SheetWithForm
        sheetOpen={editOpen}
        sheetClose={editSheetClose}
        formId="instagram-feed-edit-form"
        title="Edit Instagram feed"
        size="large"
      >
        <InstagramFeedForm type="edit" formId="instagram-feed-edit-form" formData={editData} />
      </SheetWithForm>

      {/* delete feed dialog */}
      <DeleteDialog
        dialogOpen={deleteOpen}
        dialogClose={deleteDialogClose}
        deleteRowId={deleteRowId}
        deleteTable={deleteTable}
        title="Delete feed"
      />
    </>
  );
}
