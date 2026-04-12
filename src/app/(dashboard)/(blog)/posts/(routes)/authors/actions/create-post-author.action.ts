'use server';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PostsAuthorsForm } from '../schemas/form.schema';
import { PostsAuthorsFormSchema } from '../schemas/form.schema';

export default async function createPostAuthor({ formData }: { formData: PostsAuthorsForm }) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'CREATE_POST_AUTHOR_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  const supabase = await createClient();

  const parsed = PostsAuthorsFormSchema.safeParse(formData);

  if (!parsed.success) {
    await createLogEvent('error', 'CREATE_POST_AUTHOR_INVALID_DATA', 'Create post author failed schema validation');

    return { success: false };
  }

  const { error } = await supabase
    .from('post_authors')
    .insert({ name: formData.name, slug: formData.slug, description: formData.description });

  if (error) {
    await createLogEvent('error', 'CREATE_POST_AUTHOR_FAILED', error.message + '. Author: ' + formData.name, user.id);

    return { success: false };
  }

  await createLogEvent('info', 'CREATE_POST_AUTHOR_SUCCESSFUL', 'Author created: ' + formData.name, user.id);

  return { success: true };
}
