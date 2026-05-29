'use server';

import { revalidatePath } from 'next/cache';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PostsCategoriesForm } from '../schemas/form.schema';
import { PostsCategoriesFormSchema } from '../schemas/form.schema';

export default async function createPostCategory({ formData }: { formData: PostsCategoriesForm }) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'CREATE_POST_CATEGORY_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  const supabase = await createClient();

  const parsed = PostsCategoriesFormSchema.safeParse(formData);

  if (!parsed.success) {
    await createLogEvent('error', 'CREATE_POST_CATEGORY_INVALID_DATA', 'Create post category failed schema validation');

    return { success: false };
  }

  const { error } = await supabase
    .from('post_categories')
    .insert({ name: formData.name, slug: formData.slug, description: formData.description });

  if (error) {
    await createLogEvent(
      'error',
      'CREATE_POST_CATEGORY_FAILED',
      error.message + '. Category: ' + formData.name,
      user.id,
    );

    return { success: false };
  }

  await createLogEvent('info', 'CREATE_POST_CATEGORY_SUCCESSFUL', 'Category created: ' + formData.name, user.id);

  revalidatePath('/posts/categories');

  return { success: true };
}
