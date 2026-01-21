'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { MediaEditFormSchema } from '@/schemas/media.schema';

export async function editMedia(mediaId: string, data: z.infer<typeof MediaEditFormSchema>) {
  const parsed = MediaEditFormSchema.safeParse(data);

  if (!parsed.success || !mediaId) return { success: false };

  // const { error } = await supabase.from('media').update({ alt_text: data.alt_text }).eq('id', mediaId);

  // if (error) return { success: false };

  revalidatePath('/media');

  return { success: true };
}
