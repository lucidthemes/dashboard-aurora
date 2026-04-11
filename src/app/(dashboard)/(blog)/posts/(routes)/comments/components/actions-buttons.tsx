'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';

import { ApproveButton, RejectButton } from '@/components/buttons';

import type { PostsCommentsList } from '../schemas/comments-list.schema';
import approvePostComment from '../actions/approve-post-comment.action';
import rejectPostComment from '../actions/reject-post-comment.action';

export default function PostsCommentsListColumnActionsButtons({ item }: { item: PostsCommentsList }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex justify-end gap-x-2.5">
      <ApproveButton
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const result = await approvePostComment(item.id);

            if (result.success) {
              toast.success('Successfully approved');
            } else {
              toast.error('Error approving comment');
            }
          });
        }}
      />
      <RejectButton
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const result = await rejectPostComment(item.id);

            if (result.success) {
              toast.success('Successfully rejected');
            } else {
              toast.error('Error rejecting comment');
            }
          });
        }}
      />
    </div>
  );
}
