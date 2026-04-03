'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { getUserWithRole } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { InstagramFeedFormSchema, InstagramFeedFormImagesSchema } from '../schemas/form.schema';
import type { InstagramFeedForm, InstagramFeedFormImages } from '../schemas/form.schema';

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
  const { user, role } = await getUserWithRole();

  if (!user || !role || !['admin', 'editor'].includes(role)) {
    await createLogEvent('error', 'CREATE_INSTAGRAM_FEED_UNAUTHORIZED', 'Unauthorized user', user?.id);

    return { success: false };
  }

  const formDataParsed = InstagramFeedFormSchema.safeParse(formData);
  const formImagesParsed = z.array(InstagramFeedFormImagesSchema).safeParse(formImages);

  if (!formDataParsed.success || !formImagesParsed.success) return { success: false };

  const supabase = await createClient();

  const { data: createdFeed, error: feedError } = await supabase
    .from('instagram_feeds')
    .insert({
      name: formData.name,
      layout: formData.layout,
      button: formData.button,
    })
    .select()
    .single();

  if (feedError || !createdFeed) {
    const errorMessage = feedError?.message ?? 'Create feed failed';

    await createLogEvent('error', 'CREATE_INSTAGRAM_FEED_FAILED', errorMessage, user.id);

    return { success: false };
  }

  const instagramFeedMediaTableRows: FormImagesInsert[] = formImagesParsed.data.map((image) => ({
    instagram_feed_id: createdFeed.id,
    media_id: image.media.id,
    position: image.position,
  }));

  const { error: mediaError } = await supabase.from('instagram_feed_media').insert(instagramFeedMediaTableRows);

  if (mediaError) {
    await createLogEvent('error', 'CREATE_INSTAGRAM_FEED_MEDIA_FAILED', mediaError.message, user.id);

    const { error: mediaErrorDeleteError } = await supabase.from('instagram_feeds').delete().eq('id', createdFeed.id);

    if (mediaErrorDeleteError) {
      await createLogEvent(
        'error',
        'CREATE_INSTAGRAM_FEED_MEDIA_CLEANUP_FAILED',
        mediaErrorDeleteError.message,
        user.id,
      );
    }

    return { success: false };
  }

  revalidatePath('/instagram-feed');

  await createLogEvent(
    'info',
    'CREATE_INSTAGRAM_FEED_SUCCESSFUL',
    'Instagram feed created. Id: ' + createdFeed.id,
    user.id,
  );

  return { success: true };
}
