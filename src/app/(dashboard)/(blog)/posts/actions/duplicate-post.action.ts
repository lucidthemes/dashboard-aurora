'use server';

import { revalidatePath } from 'next/cache';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { PostsDuplicatePostActionSchema } from '../schemas/actions/duplicate-post.schema';

type FetchPostType = {
  id: string;
  title: string;
  slug: string;
};

export default async function duplicatePost(postId: string) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'DUPLICATE_POST_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  if (!postId) {
    await createLogEvent('error', 'DUPLICATE_POST_NO_POST_ID', 'Post id not passed through', user.id);

    return { success: false };
  }

  const parsed = PostsDuplicatePostActionSchema.safeParse(postId);

  if (!parsed.success) {
    await createLogEvent('error', 'DUPLICATE_POST_INVALID_DATA', 'Duplicate post failed schema validation', user?.id);

    return { success: false };
  }

  const supabase = await createClient();

  const { data: post, error: fetchError } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single<FetchPostType>();

  if (fetchError) {
    await createLogEvent('error', 'DUPLICATE_POST_FETCH_FAILED', fetchError.message + '. Post id: ' + postId, user.id);

    return { success: false };
  }

  if (!post) {
    await createLogEvent('error', 'DUPLICATE_POST_NOT_FOUND', 'Post not found. Id: ' + postId, user.id);

    return { success: false };
  }

  const { id, ...rest } = post;

  const duplicatedPost = {
    ...rest,
    title: `${post.title} - copy`,
    slug: `${post.slug}-copy`,
    status: 'draft',
    created_at: new Date().toISOString(),
  };

  const { error: insertError } = await supabase.from('posts').insert(duplicatedPost);

  if (insertError) {
    await createLogEvent(
      'error',
      'DUPLICATE_POST_INSERT_FAILED',
      insertError.message + '. Post id: ' + postId,
      user.id,
    );

    return { success: false };
  }

  revalidatePath('/posts');

  await createLogEvent('info', 'DUPLICATE_POST_SUCCESSFUL', 'Post duplicated. Id: ' + postId, user.id);

  return { success: true };
}
