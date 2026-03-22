'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

export async function deleteMedia(deleteStoragePath: string, userId: string) {
  const supabase = await createClient();

  const { error } = await supabase.storage.from('media').remove([deleteStoragePath]);

  if (error) {
    await createLogEvent('error', 'DELETE_MEDIA_FAILED', error.message + '. Media path: ' + deleteStoragePath, userId);

    return { success: false };
  }

  revalidatePath('/media');

  await createLogEvent('info', 'DELETE_MEDIA_SUCCESSFUL', 'Media deleted. Path: ' + deleteStoragePath, userId);

  return { success: true };
}
