'use client';

import { useShallow } from 'zustand/react/shallow';

import DeleteDialog from '@/components/dialogs/delete';

import { usePostsStore } from '../../store/posts-store';

export default function PostsPageWrapper({ children }: { children: React.ReactNode }) {
  const { deleteDialogOpen, deleteDialogPostId, setDeleteDialogOpen } = usePostsStore(
    useShallow((state) => ({
      deleteDialogOpen: state.deleteDialogOpen,
      deleteDialogPostId: state.deleteDialogPostId,
      setDeleteDialogOpen: state.setDeleteDialogOpen,
    })),
  );

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
