'use client';

import SheetForm from '@/components/sheets/form';
import DeleteDialog from '@/components/dialogs/delete';

import { usePostsTagsStore } from '../../store/posts-tags-store';
import PostsTagsForm from '../form';
import usePostsTagsCreateSheetForm from '../../hooks/use-create-form';
import usePostsTagsEditSheetForm from '../../hooks/use-edit-form';

export default function PostsTagsPageWrapper({ children }: { children: React.ReactNode }) {
  const {
    createSheetOpen,
    setCreateSheetOpen,
    editSheetOpen,
    setEditSheetOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    deleteDialogPostTagId,
  } = usePostsTagsStore();

  const postTagCreate = usePostsTagsCreateSheetForm();
  const postTagEdit = usePostsTagsEditSheetForm();

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

      {/* create post tag sheet */}
      <SheetForm
        sheetOpen={createSheetOpen}
        sheetClose={createSheetClose}
        formId="post-tag-create-form"
        title="Create tag"
        description="Add details below for the tag. Click create when you're done"
        submitButtonText="Create tag"
        submitIsPending={postTagCreate.isPending}
      >
        <PostsTagsForm form={postTagCreate.form} onSubmit={postTagCreate.onSubmit} formId="post-tag-create-form" />
      </SheetForm>

      {/* edit post tag sheet */}
      <SheetForm
        sheetOpen={editSheetOpen}
        sheetClose={editSheetClose}
        formId="post-tag-edit-form"
        title="Edit tag"
        submitIsPending={postTagEdit.isPending}
      >
        <PostsTagsForm form={postTagEdit.form} onSubmit={postTagEdit.onSubmit} formId="post-tag-edit-form" />
      </SheetForm>

      {/* delete post tag dialog */}
      <DeleteDialog
        dialogOpen={deleteDialogOpen}
        dialogClose={deleteDialogClose}
        deleteRowId={deleteDialogPostTagId}
        deleteTable="post_tags"
        deletePath="/posts/tags"
        deleteLogEventName="DELETE_POST_TAG"
        deleteLogEventMessage="Post tag"
        title="Delete tag"
      />
    </>
  );
}
