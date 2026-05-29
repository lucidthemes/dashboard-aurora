'use server';

import { revalidatePath } from 'next/cache';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PostsAuthorsForm } from '../schemas/form.schema';
import { PostsAuthorsFormSchema } from '../schemas/form.schema';

export default async function editPostAuthor({ authorId, formData }: { authorId: string; formData: PostsAuthorsForm }) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'EDIT_POST_AUTHOR_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  const supabase = await createClient();

  const parsed = PostsAuthorsFormSchema.safeParse(formData);

  if (!parsed.success) {
    await createLogEvent('error', 'EDIT_POST_AUTHOR_INVALID_DATA', 'Edit post author failed schema validation');

    return { success: false };
  }

  const { error } = await supabase
    .from('post_authors')
    .update({ name: formData.name, slug: formData.slug, description: formData.description })
    .eq('id', authorId);

  if (error) {
    await createLogEvent('error', 'EDIT_POST_AUTHOR_FAILED', error.message + '. Author id: ' + authorId, user.id);

    return { success: false };
  }

  await createLogEvent('info', 'EDIT_POST_AUTHOR_SUCCESSFUL', 'Author updated. Id: ' + authorId, user.id);

  revalidatePath('/posts/authors');

  return { success: true };
}
