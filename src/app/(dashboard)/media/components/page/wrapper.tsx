'use client';

import { useShallow } from 'zustand/react/shallow';
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
    viewMediaType,
    viewMediaUrl,
    editOpen,
    deleteOpen,
    deleteStoragePath,
    uploadOpen,
    uploadType,
    setViewOpen,
    setViewMediaType,
    setViewMediaUrl,
    setEditOpen,
    setEditData,
    setDeleteOpen,
    setDeleteStoragePath,
    setUploadOpen,
    setUploadType,
  } = useMediaStore(
    useShallow((state) => ({
      viewOpen: state.viewOpen,
      viewMediaType: state.viewMediaType,
      viewMediaUrl: state.viewMediaUrl,
      editOpen: state.editOpen,
      deleteOpen: state.deleteOpen,
      deleteStoragePath: state.deleteStoragePath,
      uploadOpen: state.uploadOpen,
      uploadType: state.uploadType,
      setViewOpen: state.setViewOpen,
      setViewMediaType: state.setViewMediaType,
      setViewMediaUrl: state.setViewMediaUrl,
      setEditOpen: state.setEditOpen,
      setEditData: state.setEditData,
      setDeleteOpen: state.setDeleteOpen,
      setDeleteStoragePath: state.setDeleteStoragePath,
      setUploadOpen: state.setUploadOpen,
      setUploadType: state.setUploadType,
    })),
  );

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
