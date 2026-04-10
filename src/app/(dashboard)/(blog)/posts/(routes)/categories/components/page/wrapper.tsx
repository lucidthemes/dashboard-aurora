'use client';

import SheetForm from '@/components/sheets/form';
import DeleteDialog from '@/components/dialogs/delete';

import { usePostsCategoriesStore } from '../../store/posts-categories-store';
import PostsCategoriesForm from '../form';
import usePostsCategoriesCreateSheetForm from '../../hooks/use-create-form';
import usePostsCategoriesEditSheetForm from '../../hooks/use-edit-form';

export default function PostsCategoriesPageWrapper({ children }: { children: React.ReactNode }) {
  const {
    createSheetOpen,
    setCreateSheetOpen,
    editSheetOpen,
    setEditSheetOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    deleteDialogPostCategoryId,
  } = usePostsCategoriesStore();

  const postCategoryCreate = usePostsCategoriesCreateSheetForm();
  const postCategoryEdit = usePostsCategoriesEditSheetForm();

  const createSheetClose = () => {
    setCreateSheetOpen(false);
  };

  const editSheetClose = () => {
    setEditSheetOpen(false);
  };

  const deleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      {children}

      {/* create post category sheet */}
      <SheetForm
        sheetOpen={createSheetOpen}
        sheetClose={createSheetClose}
        formId="post-category-create-form"
        title="Create category"
        description="Add details below for the category. Click create when you're done"
        submitButtonText="Create category"
        submitIsPending={postCategoryCreate.isPending}
      >
        <PostsCategoriesForm
          form={postCategoryCreate.form}
          onSubmit={postCategoryCreate.onSubmit}
          formId="post-category-create-form"
        />
      </SheetForm>

      {/* edit post category sheet */}
      <SheetForm
        sheetOpen={editSheetOpen}
        sheetClose={editSheetClose}
        formId="post-category-edit-form"
        title="Edit category"
        submitIsPending={postCategoryEdit.isPending}
      >
        <PostsCategoriesForm
          form={postCategoryEdit.form}
          onSubmit={postCategoryEdit.onSubmit}
          formId="post-category-edit-form"
        />
      </SheetForm>

      {/* delete post category dialog */}
      <DeleteDialog
        dialogOpen={deleteDialogOpen}
        dialogClose={deleteDialogClose}
        deleteRowId={deleteDialogPostCategoryId}
        deleteTable="post_categories"
        deletePath="/posts/categories"
        deleteLogEventName="DELETE_POST_CATEGORY"
        deleteLogEventMessage="Post category"
        title="Delete category"
      />
    </>
  );
}
