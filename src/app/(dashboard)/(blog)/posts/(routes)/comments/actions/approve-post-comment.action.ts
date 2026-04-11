'use server';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

export default async function approvePostComment(commentId: string) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'APPROVE_POST_COMMENT_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  const supabase = await createClient();

  const { error } = await supabase.from('post_comments').update({ status: 'approved' }).eq('id', commentId);

  if (error) {
    await createLogEvent('error', 'APPROVE_POST_COMMENT_FAILED', error.message + '. Comment id: ' + commentId, user.id);

    return { success: false };
  }

  await createLogEvent('info', 'APPROVE_POST_COMMENT_SUCCESSFUL', 'Comment approved. Id: ' + commentId, user.id);

  return { success: true };
}
