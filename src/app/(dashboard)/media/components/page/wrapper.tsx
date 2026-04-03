'use client';

import Image from 'next/image';

import SheetForm from '@/components/sheets/form';
import SheetContent from '@/components/sheets/content';

import { useMediaStore } from '../../store/media-store';
import MediaEditForm from '../forms/edit';
import useMediaEditForm from '../../hooks/use-edit-form';
import MediaUploadForm from '../forms/upload';
import ViewMediaDialog from '../dialogs/view-media';
import DeleteMediaDialog from '../dialogs/delete-media';

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
        {viewMediaType === 'image' && <Image src={viewMediaUrl ?? ''} alt={'View image'} width={600} height={400} />}
        {viewMediaType === 'video' && (
          <video controls>
            <source src={viewMediaUrl} />
          </video>
        )}
      </ViewMediaDialog>

      {/* edit media sheet */}
      <SheetForm
        sheetOpen={editOpen}
        sheetClose={editSheetClose}
        formId="media-edit-form"
        title="Edit image"
        submitIsPending={mediaEdit.isPending}
      >
        <MediaEditForm form={mediaEdit.form} onSubmit={mediaEdit.onSubmit} />
      </SheetForm>

      {/* delete media dialog */}
      <DeleteMediaDialog
        dialogOpen={deleteOpen}
        dialogClose={deleteDialogClose}
        deleteStoragePath={deleteStoragePath}
        title="Delete media"
      />

      {/* upload media sheet */}
      <SheetContent
        sheetOpen={uploadOpen}
        sheetClose={uploadSheetClose}
        title={`Upload ${uploadType}`}
        description={uploadSheetDescription}
        size="medium"
      >
        <MediaUploadForm uploadType={uploadType} />
      </SheetContent>
    </>
  );
}
