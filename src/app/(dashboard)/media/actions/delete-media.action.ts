'use server';

import { revalidatePath } from 'next/cache';
import type { User } from '@supabase/supabase-js';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

export async function deleteMedia(deleteStoragePath: string, user: User) {
  const supabase = await createClient();

  const { error } = await supabase.storage.from('media').remove([deleteStoragePath]);

  if (error) {
    createLogEvent('error', 'DELETE_MEDIA_FAILED', error.message + '. Media path: ' + deleteStoragePath, user.id);

    return { success: false };
  }

  revalidatePath('/media');

  createLogEvent('info', 'DELETE_MEDIA_SUCCESSFUL', 'Media deleted. Path: ' + deleteStoragePath, user.id);

  return { success: true };
}
