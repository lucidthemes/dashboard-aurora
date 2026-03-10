'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';
import { InstagramFeedFormSchema, InstagramFeedFormImagesSchema } from '@/schemas/instagram-feed.schema';
import type { InstagramFeedForm, InstagramFeedFormImages } from '@/schemas/instagram-feed.schema';

interface UpdateInstagramFeedParams {
  feedId: string;
  formData: InstagramFeedForm;
  formImages: InstagramFeedFormImages[];
  userId: string;
}

interface FormImagesInsert {
  instagram_feed_id: string;
  media_id: string;
  position: number;
}

export async function updateInstagramFeed({ feedId, formData, formImages, userId }: UpdateInstagramFeedParams) {
  if (!feedId) return { success: false };

  const formDataParsed = InstagramFeedFormSchema.safeParse(formData);
  const formImagesParsed = z.array(InstagramFeedFormImagesSchema).safeParse(formImages);

  if (!formDataParsed.success || !formImagesParsed.success) return { success: false };

  const supabase = await createClient();

  const { error: feedError } = await supabase
    .from('instagram_feeds')
    .update({
      name: formData.name,
      layout: formData.layout,
      button: formData.button,
    })
    .eq('id', feedId);

  if (feedError) {
    createLogEvent('error', 'UPDATE_INSTAGRAM_FEED_FAILED', feedError.message, userId);

    return { success: false };
  }

  const { error: mediaDeleteError } = await supabase
    .from('instagram_feed_media')
    .delete()
    .eq('instagram_feed_id', feedId);

  if (mediaDeleteError) {
    createLogEvent('error', 'UPDATE_INSTAGRAM_FEED_MEDIA_DELETE_FAILED', mediaDeleteError.message, userId);

    return { success: false };
  }

  const instagramFeedMediaTableRows: FormImagesInsert[] = formImagesParsed.data.map((image) => ({
    instagram_feed_id: feedId,
    media_id: image.media.id,
    position: image.position,
  }));

  const { error: mediaInsertError } = await supabase.from('instagram_feed_media').insert(instagramFeedMediaTableRows);

  if (mediaInsertError) {
    createLogEvent('error', 'UPDATE_INSTAGRAM_FEED_MEDIA_INSERT_FAILED', mediaInsertError.message, userId);

    return { success: false };
  }

  revalidatePath('/instagram-feed');

  createLogEvent('info', 'UPDATE_INSTAGRAM_FEED_SUCCESSFUL', 'Instagram feed updated. Id: ' + feedId, userId);

  return { success: true };
}
