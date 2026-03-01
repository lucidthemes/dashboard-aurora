'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { InstagramFeedFormSchema, InstagramFeedFormImagesSchema } from '@/schemas/instagram-feed.schema';
import type { InstagramFeedForm, InstagramFeedFormImages } from '@/schemas/instagram-feed.schema';

interface CreateInstagramFeedParams {
  formData: InstagramFeedForm;
  formImages: InstagramFeedFormImages[];
}

interface FormImagesInsert {
  instagram_feed_id: string;
  media_id: string;
  position: number;
}

export async function createInstagramFeed({ formData, formImages }: CreateInstagramFeedParams) {
  const formDataParsed = InstagramFeedFormSchema.safeParse(formData);
  const formImagesParsed = z.array(InstagramFeedFormImagesSchema).safeParse(formImages);

  if (!formDataParsed.success || !formImagesParsed.success) return { success: false };

  // const { data: createdFeed, error: feedError } = await supabase
  //   .from('instagram_feeds')
  //   .insert({
  //     name: formData.name,
  //     layout: formData.layout,
  //     button: formData.button,
  //   })
  //   .select()
  //   .single();

  // if (feedError || !createdFeed) return { success: false };

  // const instagramFeedMediaTableRows: FormImagesInsert[] = formImagesParsed.data.map((image) => ({
  //   instagram_feed_id: createdFeed.id,
  //   media_id: image.media.id,
  //   position: image.position,
  // }));

  // const { error: mediaError } = await supabase.from('instagram_feed_media').insert(instagramFeedMediaTableRows);

  // if (mediaError) {
  //   await supabase.from('instagram_feeds').delete().eq('id', createdFeed.id);

  //   return { success: false };
  // }

  revalidatePath('/instagram-feed');

  return { success: true };
}
