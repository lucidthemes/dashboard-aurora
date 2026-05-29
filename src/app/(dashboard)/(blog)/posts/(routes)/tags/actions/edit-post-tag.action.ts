'use server';

import { revalidatePath } from 'next/cache';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PostsTagsForm } from '../schemas/form.schema';
import { PostsTagsFormSchema } from '../schemas/form.schema';

export default async function editPostTag({ tagId, formData }: { tagId: string; formData: PostsTagsForm }) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'EDIT_POST_TAG_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  const supabase = await createClient();

  const parsed = PostsTagsFormSchema.safeParse(formData);

  if (!parsed.success) {
    await createLogEvent('error', 'EDIT_POST_TAG_INVALID_DATA', 'Edit post tag failed schema validation');

    return { success: false };
  }

  const { error } = await supabase
    .from('post_tags')
    .update({ name: formData.name, slug: formData.slug, description: formData.description })
    .eq('id', tagId);

  if (error) {
    await createLogEvent('error', 'EDIT_POST_TAG_FAILED', error.message + '. Tag id: ' + tagId, user.id);

    return { success: false };
  }

  await createLogEvent('info', 'EDIT_POST_TAG_SUCCESSFUL', 'Tag updated. Id: ' + tagId, user.id);

  revalidatePath('/posts/tags');

  return { success: true };
}
