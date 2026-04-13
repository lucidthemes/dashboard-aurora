'use server';

import { revalidatePath } from 'next/cache';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { MediaDeleteMediaActionSchema } from '../schemas/actions/delete-media.schema';

export async function deleteMedia(deleteStoragePath: string) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent(
      'error',
      'DELETE_MEDIA_UNAUTHORIZED',
      'Unauthorized user. Media path:' + deleteStoragePath,
      user?.id,
    );

    return { success: false };
  }

  const parsed = MediaDeleteMediaActionSchema.safeParse(deleteStoragePath);

  if (!parsed.success) {
    await createLogEvent('error', 'DELETE_MEDIA_INVALID_DATA', 'Delete media failed schema validation', user?.id);

    return { success: false };
  }

  const supabase = await createClient();

  const { error } = await supabase.storage.from('media').remove([deleteStoragePath]);

  if (error) {
    await createLogEvent('error', 'DELETE_MEDIA_FAILED', error.message + '. Media path: ' + deleteStoragePath, user.id);

    return { success: false };
  }

  revalidatePath('/media');

  await createLogEvent('info', 'DELETE_MEDIA_SUCCESSFUL', 'Media deleted. Path: ' + deleteStoragePath, user.id);

  return { success: true };
}
