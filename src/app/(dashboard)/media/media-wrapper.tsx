'use client';

import { ViewMediaDialog, DeleteDialog } from '@/components/dialogs';
import { SheetWithForm, SheetWithContent } from '@/components/sheets';
import { useMediaStore } from '@/store/media-store';

import MediaEditForm from './components/edit-form';
import MediaUploadForm from './components/upload-form';

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
    deleteRowId,
    setDeleteRowId,
    deleteTable,
    setDeleteTable,
    uploadOpen,
    uploadType,
    setUploadOpen,
    setUploadType,
  } = useMediaStore();

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
    setDeleteRowId(null);
    setDeleteTable(null);
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
      <SheetWithForm sheetOpen={editOpen} sheetClose={editSheetClose} formId="media-edit-form" title="Edit image">
        <MediaEditForm />
      </SheetWithForm>

      {/* delete media dialog */}
      <DeleteDialog
        dialogOpen={deleteOpen}
        dialogClose={deleteDialogClose}
        deleteRowId={deleteRowId}
        deleteTable={deleteTable}
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
        <MediaUploadForm />
      </SheetWithContent>
    </>
  );
}
