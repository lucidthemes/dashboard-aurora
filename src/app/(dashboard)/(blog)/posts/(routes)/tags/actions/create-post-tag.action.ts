'use server';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PostsTagsForm } from '../schemas/form.schema';
import { PostsTagsFormSchema } from '../schemas/form.schema';

export default async function createPostTag({ formData }: { formData: PostsTagsForm }) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'CREATE_POST_TAG_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  const supabase = await createClient();

  const parsed = PostsTagsFormSchema.safeParse(formData);

  if (!parsed.success) {
    await createLogEvent('error', 'CREATE_POST_TAG_INVALID_DATA', 'Create post tag failed schema validation');

    return { success: false };
  }

  const { error } = await supabase
    .from('post_tags')
    .insert({ name: formData.name, slug: formData.slug, description: formData.description });

  if (error) {
    await createLogEvent('error', 'CREATE_POST_TAG_FAILED', error.message + '. Tag: ' + formData.name, user.id);

    return { success: false };
  }

  await createLogEvent('info', 'CREATE_POST_TAG_SUCCESSFUL', 'Tag created: ' + formData.name, user.id);

  return { success: true };
}
