'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { MediaUpdateMediaAction } from '../schemas/actions/update-media.schema';
import { MediaUpdateMediaActionSchema } from '../schemas/actions/update-media.schema';

export async function updateMedia({ mediaId, formData }: MediaUpdateMediaAction) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'UPDATE_MEDIA_UNAUTHORIZED', 'Unauthorized user. Media Id:' + mediaId, user?.id);

    return { success: false };
  }

  const parsed = MediaUpdateMediaActionSchema.safeParse({ mediaId, formData });

  if (!parsed.success) {
    await createLogEvent('error', 'UPDATE_MEDIA_INVALID_DATA', 'Update media failed schema validation', user?.id);

    return { success: false };
  }

  const supabase = await createClient();

  const { error } = await supabase.from('media').update({ alt_text: formData.alt_text }).eq('id', mediaId);

  if (error) {
    await createLogEvent('error', 'UPDATE_MEDIA_FAILED', error.message + '. Media Id: ' + mediaId, user.id);

    return { success: false };
  }

  revalidatePath('/media');

  await createLogEvent('info', 'UPDATE_MEDIA_SUCCESSFUL', 'Media updated. Id: ' + mediaId, user.id);

  return { success: true };
}
