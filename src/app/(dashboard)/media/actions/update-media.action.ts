'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { MediaEditForm } from '../schemas/edit-form.schema';

interface UpdateMediaParams {
  mediaId: string;
  formData: MediaEditForm;
}

export async function updateMedia({ mediaId, formData }: UpdateMediaParams) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'UPDATE_MEDIA_UNAUTHORIZED', 'Unauthorized user. Media Id:' + mediaId, user?.id);

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
