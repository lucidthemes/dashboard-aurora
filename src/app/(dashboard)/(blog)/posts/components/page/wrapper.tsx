'use client';

import DeleteDialog from '@/components/dialogs/delete';

import { usePostsStore } from '../../store/posts-store';

export default function PostsPageWrapper({ children }: { children: React.ReactNode }) {
  const { deleteDialogOpen, setDeleteDialogOpen, deleteDialogPostId } = usePostsStore();

  const deleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <>
      {children}

      {/* delete post dialog */}
      <DeleteDialog
        dialogOpen={deleteDialogOpen}
        dialogClose={deleteDialogClose}
        deleteRowId={deleteDialogPostId}
        deleteTable="posts"
        deletePath="/posts"
        deleteLogEventName="DELETE_POST"
        deleteLogEventMessage="Post"
        title="Delete post"
      />
    </>
  );
}
