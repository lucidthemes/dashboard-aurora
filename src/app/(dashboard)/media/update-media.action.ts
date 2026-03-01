'use server';

import { revalidatePath } from 'next/cache';

import { MediaEditFormSchema } from '@/schemas/media.schema';
import type { MediaEditForm } from '@/schemas/media.schema';

export async function updateMedia(mediaId: string, data: MediaEditForm) {
  const parsed = MediaEditFormSchema.safeParse(data);

  if (!parsed.success || !mediaId) return { success: false };

  // const { error } = await supabase.from('media').update({ alt_text: data.alt_text }).eq('id', mediaId);

  // if (error) return { success: false };

  revalidatePath('/media');

  return { success: true };
}
