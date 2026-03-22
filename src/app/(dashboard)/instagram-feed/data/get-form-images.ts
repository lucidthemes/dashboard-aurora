import { z } from 'zod';

import { createClient } from '@/lib/supabase/client';
import { createLogEvent } from '@/lib/supabase/log-event';

import { InstagramFeedFormImagesSchema } from '../schemas/form.schema';
import type { InstagramFeedFormImages } from '../schemas/form.schema';

export async function getInstagramFeedFormImages(feedId: string | null): Promise<InstagramFeedFormImages[]> {
  if (!feedId) return [];

  const supabase = createClient();

  const { data, error } = await supabase
    .from('instagram_feed_media')
    .select('media:media_id(id, storage_path, alt_text), position')
    .eq('instagram_feed_id', feedId)
    .order('position', { ascending: true });

  if (error) {
    createLogEvent('error', 'FETCH_INSTAGRAM_FEED_FORM_IMAGES_FAILED', error.message + '. Feed Id: ' + feedId);

    return [];
  }

  const parsed = z.array(InstagramFeedFormImagesSchema).safeParse(data ?? []);

  if (!parsed.success) {
    createLogEvent(
      'error',
      'FETCH_INSTAGRAM_FEED_FORM_IMAGES_INVALID_DATA',
      'Fetch instagram feed form images failed schema validation. Feed Id: ' + feedId,
    );

    return [];
  }

  return parsed.data;
}
