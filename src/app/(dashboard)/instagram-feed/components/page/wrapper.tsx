'use client';

import { useShallow } from 'zustand/react/shallow';

import DeleteDialog from '@/components/dialogs/delete';
import SheetForm from '@/components/sheets/form';

import { useInstagramFeedStore } from '../../store/instagram-feed-store';
import InstagramFeedForm from '../form';
import useInstagramFeedCreateForm from '../../hooks/use-create-form';
import useInstagramFeedEditForm from '../../hooks/use-edit-form';

export default function InstagramFeedPageWrapper({ children }: { children: React.ReactNode }) {
  const {
    createOpen,
    editOpen,
    deleteOpen,
    deleteRowId,
    setCreateOpen,
    setEditOpen,
    setDeleteOpen,
    setDeleteRowId,
    resetSelectedImages,
  } = useInstagramFeedStore(
    useShallow((state) => ({
      createOpen: state.createOpen,
      editOpen: state.editOpen,
      deleteOpen: state.deleteOpen,
      deleteRowId: state.deleteRowId,
      setCreateOpen: state.setCreateOpen,
      setEditOpen: state.setEditOpen,
      setDeleteOpen: state.setDeleteOpen,
      setDeleteRowId: state.setDeleteRowId,
      resetSelectedImages: state.resetSelectedImages,
    })),
  );

  const instagramFeedCreate = useInstagramFeedCreateForm();
  const instagramFeedEdit = useInstagramFeedEditForm();

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
  };

  return (
    <>
      {children}

      {/* create feed sheet */}
      <SheetForm
        sheetOpen={createOpen}
        sheetClose={createSheetClose}
        formId="instagram-feed-create-form"
        title="Create Instagram feed"
        description="Select options below for the feed. Click create when you're done"
        size="large"
        submitButtonText="Create Instagram feed"
        submitIsPending={instagramFeedCreate.isPending}
      >
        <InstagramFeedForm
          form={instagramFeedCreate.form}
          onSubmit={instagramFeedCreate.onSubmit}
          formType="create"
          formId="instagram-feed-create-form"
        />
      </SheetForm>

      {/* edit feed sheet */}
      <SheetForm
        sheetOpen={editOpen}
        sheetClose={editSheetClose}
        formId="instagram-feed-edit-form"
        title="Edit Instagram feed"
        size="large"
        submitIsPending={instagramFeedEdit.isPending}
      >
        <InstagramFeedForm
          form={instagramFeedEdit.form}
          onSubmit={instagramFeedEdit.onSubmit}
          formType="edit"
          formId="instagram-feed-edit-form"
        />
      </SheetForm>

      {/* delete feed dialog */}
      <DeleteDialog
        dialogOpen={deleteOpen}
        dialogClose={deleteDialogClose}
        deleteRowId={deleteRowId}
        deleteTable="instagram_feeds"
        deletePath="/instagram-feed"
        deleteLogEventName="DELETE_INSTAGRAM_FEED"
        deleteLogEventMessage="Instagram feed"
        title="Delete Instagram feed"
      />
    </>
  );
}
