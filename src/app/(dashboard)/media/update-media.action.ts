'use server';

import { revalidatePath } from 'next/cache';

import { MediaEditFormSchema } from '@/schemas/media.schema';
import type { MediaEditForm } from '@/schemas/media.schema';

interface UpdateMediaParams {
  mediaId: string;
  formData: MediaEditForm;
}

export async function updateMedia({ mediaId, formData }: UpdateMediaParams) {
  const parsed = MediaEditFormSchema.safeParse(formData);

  if (!parsed.success || !mediaId) return { success: false };

  // const { error } = await supabase.from('media').update({ alt_text: formData.alt_text }).eq('id', mediaId);

  // if (error) return { success: false };

  revalidatePath('/media');

  return { success: true };
}
