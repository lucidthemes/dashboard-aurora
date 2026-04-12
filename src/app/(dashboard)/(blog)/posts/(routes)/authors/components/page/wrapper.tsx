'use client';

import SheetForm from '@/components/sheets/form';
import DeleteDialog from '@/components/dialogs/delete';

import { usePostsAuthorsStore } from '../../store/posts-authors-store';
import PostsAuthorsForm from '../form';
import usePostsAuthorsCreateSheetForm from '../../hooks/use-create-form';
import usePostsAuthorsEditSheetForm from '../../hooks/use-edit-form';

export default function PostsAuthorsPageWrapper({ children }: { children: React.ReactNode }) {
  const {
    createSheetOpen,
    setCreateSheetOpen,
    editSheetOpen,
    setEditSheetOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    deleteDialogPostAuthorId,
  } = usePostsAuthorsStore();

  const postAuthorCreate = usePostsAuthorsCreateSheetForm();
  const postAuthorEdit = usePostsAuthorsEditSheetForm();

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

      {/* create post author sheet */}
      <SheetForm
        sheetOpen={createSheetOpen}
        sheetClose={createSheetClose}
        formId="post-author-create-form"
        title="Create author"
        description="Add details below for the author. Click create when you're done"
        submitButtonText="Create author"
        submitIsPending={postAuthorCreate.isPending}
      >
        <PostsAuthorsForm
          form={postAuthorCreate.form}
          onSubmit={postAuthorCreate.onSubmit}
          formId="post-author-create-form"
        />
      </SheetForm>

      {/* edit post author sheet */}
      <SheetForm
        sheetOpen={editSheetOpen}
        sheetClose={editSheetClose}
        formId="post-author-edit-form"
        title="Edit author"
        submitIsPending={postAuthorEdit.isPending}
      >
        <PostsAuthorsForm
          form={postAuthorEdit.form}
          onSubmit={postAuthorEdit.onSubmit}
          formId="post-author-edit-form"
        />
      </SheetForm>

      {/* delete post author dialog */}
      <DeleteDialog
        dialogOpen={deleteDialogOpen}
        dialogClose={deleteDialogClose}
        deleteRowId={deleteDialogPostAuthorId}
        deleteTable="post_authors"
        deletePath="/posts/authors"
        deleteLogEventName="DELETE_POST_AUTHOR"
        deleteLogEventMessage="Post author"
        title="Delete author"
      />
    </>
  );
}
