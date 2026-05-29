'use server';

import { revalidatePath } from 'next/cache';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { PostsCommentsRejectPostCommentActionSchema } from '../schemas/actions/reject-post-comment.schema';

export default async function rejectPostComment(commentId: string) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'REJECT_POST_COMMENT_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  const parsed = PostsCommentsRejectPostCommentActionSchema.safeParse(commentId);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'REJECT_POST_COMMENT_INVALID_DATA',
      'Reject post comment failed schema validation',
      user?.id,
    );

    return { success: false };
  }

  const supabase = await createClient();

  const { error } = await supabase.from('post_comments').update({ status: 'rejected' }).eq('id', commentId);

  if (error) {
    await createLogEvent('error', 'REJECT_POST_COMMENT_FAILED', error.message + '. Comment id: ' + commentId, user.id);

    return { success: false };
  }

  await createLogEvent('info', 'REJECT_POST_COMMENT_SUCCESSFUL', 'Comment rejected. Id: ' + commentId, user.id);

  revalidatePath('/posts/comments');

  return { success: true };
}
