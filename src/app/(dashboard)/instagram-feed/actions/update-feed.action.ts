'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { InstagramFeedFormSchema, InstagramFeedFormImagesSchema } from '../schemas/form.schema';
import type { InstagramFeedForm, InstagramFeedFormImages } from '../schemas/form.schema';

interface UpdateInstagramFeedParams {
  feedId: string;
  formData: InstagramFeedForm;
  formImages: InstagramFeedFormImages[];
}

interface FormImagesInsert {
  instagram_feed_id: string;
  media_id: string;
  position: number;
}

export async function updateInstagramFeed({ feedId, formData, formImages }: UpdateInstagramFeedParams) {
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'UPDATE_INSTAGRAM_FEED_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

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
    await createLogEvent('error', 'UPDATE_INSTAGRAM_FEED_FAILED', feedError.message, user.id);

    return { success: false };
  }

  const { error: mediaDeleteError } = await supabase
    .from('instagram_feed_media')
    .delete()
    .eq('instagram_feed_id', feedId);

  if (mediaDeleteError) {
    await createLogEvent('error', 'UPDATE_INSTAGRAM_FEED_MEDIA_DELETE_FAILED', mediaDeleteError.message, user.id);

    return { success: false };
  }

  const instagramFeedMediaTableRows: FormImagesInsert[] = formImagesParsed.data.map((image) => ({
    instagram_feed_id: feedId,
    media_id: image.media.id,
    position: image.position,
  }));

  const { error: mediaInsertError } = await supabase.from('instagram_feed_media').insert(instagramFeedMediaTableRows);

  if (mediaInsertError) {
    await createLogEvent('error', 'UPDATE_INSTAGRAM_FEED_MEDIA_INSERT_FAILED', mediaInsertError.message, user.id);

    return { success: false };
  }

  revalidatePath('/instagram-feed');

  await createLogEvent('info', 'UPDATE_INSTAGRAM_FEED_SUCCESSFUL', 'Instagram feed updated. Id: ' + feedId, user.id);

  return { success: true };
}
