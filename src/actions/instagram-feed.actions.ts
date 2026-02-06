'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { InstagramFeedFormSchema, InstagramFeedFormImagesSchema } from '@/schemas/instagram-feed.schema';
import type { InstagramFeedForm, InstagramFeedFormImages } from '@/schemas/instagram-feed.schema';

interface feedFormImagesInsert {
  instagram_feed_id: string;
  media_id: string;
  position: number;
}

export async function createInstagramFeed(feedFormData: InstagramFeedForm, feedFormImages: InstagramFeedFormImages[]) {
  const feedFormDataParsed = InstagramFeedFormSchema.safeParse(feedFormData);
  const feedFormImagesParsed = z.array(InstagramFeedFormImagesSchema).safeParse(feedFormImages);

  if (!feedFormDataParsed.success || !feedFormImagesParsed.success) return { success: false };

  // const { data: createdFeed, error: feedError } = await supabase
  //   .from('instagram_feeds')
  //   .insert({
  //     name: feedFormData.name,
  //     layout: feedFormData.layout,
  //     button: feedFormData.button,
  //   })
  //   .select()
  //   .single();

  // if (feedError || !createdFeed) return { success: false };

  // const instagramFeedMediaTableRows: feedFormImagesInsert[] = feedFormImagesParsed.data.map((image) => ({
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

export async function editInstagramFeed(
  feedId: string,
  feedFormData: InstagramFeedForm,
  feedFormImages: InstagramFeedFormImages[],
) {
  if (!feedId) return { success: false };

  const feedFormDataParsed = InstagramFeedFormSchema.safeParse(feedFormData);
  const feedFormImagesParsed = z.array(InstagramFeedFormImagesSchema).safeParse(feedFormImages);

  if (!feedFormDataParsed.success || !feedFormImagesParsed.success) return { success: false };

  // const { error: feedError } = await supabase
  //   .from('instagram_feeds')
  //   .update({
  //     name: feedFormData.name,
  //     layout: feedFormData.layout,
  //     button: feedFormData.button,
  //   })
  //   .eq('id', feedId);

  // if (feedError) return { success: false };

  // const { error: mediaDeleteError } = await supabase
  //   .from('instagram_feed_media')
  //   .delete()
  //   .eq('instagram_feed_id', feedId);

  // if (mediaDeleteError) return { success: false };

  // const instagramFeedMediaTableRows: feedFormImagesInsert[] = feedFormImagesParsed.data.map((image) => ({
  //   instagram_feed_id: feedId,
  //   media_id: image.media.id,
  //   position: image.position,
  // }));

  // const { error: mediaInsertError } = await supabase.from('instagram_feed_media').insert(instagramFeedMediaTableRows);

  // if (mediaInsertError) return { success: false };

  revalidatePath('/instagram-feed');

  return { success: true };
}
