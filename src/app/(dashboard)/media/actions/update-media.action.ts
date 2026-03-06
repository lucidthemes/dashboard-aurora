'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

import type { MediaEditForm } from '@/schemas/media.schema';
import { createLogEvent } from '@/lib/supabase/log-event';

interface UpdateMediaParams {
  mediaId: string;
  formData: MediaEditForm;
  userId: string;
}

export async function updateMedia({ mediaId, formData, userId }: UpdateMediaParams) {
  const supabase = await createClient();

  const { error } = await supabase.from('media').update({ alt_text: formData.alt_text }).eq('id', mediaId);

  if (error) {
    createLogEvent('error', 'UPDATE_MEDIA_FAILED', error.message + '. Media Id: ' + mediaId, userId);

    return { success: false };
  }

  revalidatePath('/media');

  createLogEvent('info', 'UPDATE_MEDIA_SUCCESSFUL', 'Media updated. Id: ' + mediaId, userId);

  return { success: true };
}
