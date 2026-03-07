'use client';

import { ViewMediaDialog, DeleteMediaDialog } from '@/components/dialogs';
import { SheetWithForm, SheetWithContent } from '@/components/sheets';
import { useMediaStore } from '@/store/media-store';

import { useDashboardUser } from '../../user-provider';
import MediaEditForm from './edit-form';
import useMediaEditForm from '../use-edit-form';
import MediaUploadForm from './upload-form';

export default function MediaPageWrapper({ children }: { children: React.ReactNode }) {
  const {
    viewOpen,
    setViewOpen,
    viewMediaType,
    setViewMediaType,
    viewMediaUrl,
    setViewMediaUrl,
    editOpen,
    setEditOpen,
    setEditData,
    deleteOpen,
    setDeleteOpen,
    deleteStoragePath,
    setDeleteStoragePath,
    uploadOpen,
    uploadType,
    setUploadOpen,
    setUploadType,
  } = useMediaStore();

  const { user } = useDashboardUser();

  const mediaEdit = useMediaEditForm();

  const viewDialogClose = () => {
    setViewOpen(false);
    setViewMediaType(null);
    setViewMediaUrl(undefined);
  };

  const editSheetClose = () => {
    setEditOpen(false);
    setEditData(null);
  };

  const deleteDialogClose = () => {
    setDeleteOpen(false);
    setDeleteStoragePath(null);
  };

  const uploadSheetClose = () => {
    setUploadOpen(false);
    setUploadType(null);
  };

  const uploadSheetDescription = uploadType === 'image' ? 'Select an image to upload' : 'Select a video to upload';

  return (
    <>
      {children}

      {/* view media dialog */}
      <ViewMediaDialog dialogOpen={viewOpen} dialogClose={viewDialogClose}>
        {viewMediaType === 'image' && <img src={viewMediaUrl} alt={'View image'} className="" />}
        {viewMediaType === 'video' && (
          <video controls>
            <source src={viewMediaUrl} />
          </video>
        )}
      </ViewMediaDialog>

      {/* edit media sheet */}
      <SheetWithForm
        sheetOpen={editOpen}
        sheetClose={editSheetClose}
        formId="media-edit-form"
        title="Edit image"
        submitIsPending={mediaEdit.isPending}
      >
        <MediaEditForm form={mediaEdit.form} onSubmit={mediaEdit.onSubmit} />
      </SheetWithForm>

      {/* delete media dialog */}
      <DeleteMediaDialog
        dialogOpen={deleteOpen}
        dialogClose={deleteDialogClose}
        deleteStoragePath={deleteStoragePath}
        userId={user.id}
        title="Delete media"
      />

      {/* upload media sheet */}
      <SheetWithContent
        sheetOpen={uploadOpen}
        sheetClose={uploadSheetClose}
        title={`Upload ${uploadType}`}
        description={uploadSheetDescription}
        size="medium"
      >
        <MediaUploadForm uploadType={uploadType} />
      </SheetWithContent>
    </>
  );
}
