'use client';

import DeleteDialog from '@/components/dialogs/delete';
import SheetForm from '@/components/sheets/form';

import { useSidebarsStore } from '../../store/sidebars-store';
import SidebarsForm from '../form';
import useSidebarsCreateForm from '../../hooks/use-create-form';
import useSidebarsEditForm from '../../hooks/use-edit-form';
// import useInstagramFeedCreateForm from '../../hooks/use-create-form';
// import useInstagramFeedEditForm from '../../hooks/use-edit-form';

export default function SidebarsPageWrapper({ children }: { children: React.ReactNode }) {
  // const {
  //   createOpen,
  //   setCreateOpen,
  //   editOpen,
  //   setEditOpen,
  //   deleteOpen,
  //   setDeleteOpen,
  //   deleteRowId,
  //   setDeleteRowId,
  //   resetSelectedImages,
  // } = useInstagramFeedStore();

  const sidebarCreateForm = useSidebarsCreateForm();
  const sidebarsEditForm = useSidebarsEditForm();

  // const createSheetClose = () => {
  //   setCreateOpen(false);
  //   resetSelectedImages();
  // };

  // const editSheetClose = () => {
  //   setEditOpen(false);
  //   resetSelectedImages();
  // };

  // const deleteDialogClose = () => {
  //   setDeleteOpen(false);
  //   setDeleteRowId(null);
  // };

  const {
    createSheetOpen,
    setCreateSheetOpen,
    editSheetOpen,
    setEditSheetOpen,
    setEditSheetSidebar,
    deleteDialogOpen,
    setDeleteDialogOpen,
    deleteDialogSidebarId,
  } = useSidebarsStore();

  const createSheetClose = () => {
    setCreateSheetOpen(false);
  };

  const editSheetClose = () => {
    setEditSheetOpen(false);
    setEditSheetSidebar(null);
  };

  const deleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      {children}

      {/* Create sidebar sheet */}
      <SheetForm
        sheetOpen={createSheetOpen}
        sheetClose={createSheetClose}
        formId="sidebars-create-form"
        title="Create new sidebar"
        // description="Invite email address to create user"
        size="large"
        submitButtonText="Create sidebar"
        // submitIsPending={usersCreateForm.isPending}
      >
        <SidebarsForm
          form={sidebarCreateForm.form}
          onSubmit={sidebarCreateForm.onSubmit}
          formType="create"
          formId="sidebars-create-form"
        />
        {/* <UsersCreateSheetForm form={usersCreateForm.form} onSubmit={usersCreateForm.onSubmit} /> */}
      </SheetForm>

      {/* Edit sidebar sheet */}
      <SheetForm
        sheetOpen={editSheetOpen}
        sheetClose={editSheetClose}
        formId="sidebars-edit-form"
        title="Edit sidebar"
        // description="Update user role to customer, editor, or admin"
        size="large"
        // submitIsPending={usersEditForm.isPending}
      >
        <SidebarsForm
          form={sidebarsEditForm.form}
          onSubmit={sidebarsEditForm.onSubmit}
          formType="edit"
          formId="sidebars-edit-form"
        />
        {/* <UsersEditSheetForm form={usersEditForm.form} onSubmit={usersEditForm.onSubmit} /> */}
      </SheetForm>

      {/* delete sidebar dialog */}
      <DeleteDialog
        dialogOpen={deleteDialogOpen}
        dialogClose={deleteDialogClose}
        deleteRowId={deleteDialogSidebarId}
        deleteTable="sidebars"
        deletePath="/sidebars"
        deleteLogEventName="DELETE_SIDEBAR"
        deleteLogEventMessage="Sidebar"
        title="Delete sidebar"
      />

      {/* create feed sheet */}
      {/* <SheetForm
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
      </SheetForm> */}

      {/* edit feed sheet */}
      {/* <SheetForm
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
      </SheetForm> */}

      {/* delete feed dialog */}
      {/* <DeleteDialog
        dialogOpen={deleteOpen}
        dialogClose={deleteDialogClose}
        deleteRowId={deleteRowId}
        deleteTable="instagram_feeds"
        deletePath="/instagram-feed"
        deleteLogEventName="DELETE_INSTAGRAM_FEED"
        deleteLogEventMessage="Instagram feed"
        title="Delete Instagram feed"
      /> */}
    </>
  );
}
