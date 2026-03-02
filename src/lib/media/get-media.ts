import { createClient } from '../supabase/client';
import { z } from 'zod';

import { MediaSchema } from '@/schemas/media.schema';
import type { Media } from '@/schemas/media.schema';
import { createLogEvent } from '../supabase/log-event';

export default async function getMedia(
  type: 'images' | 'videos',
  page: number,
  limit: number,
): Promise<{ media: Media[]; totalCount: number }> {
  const supabase = createClient();

  const mediaType = type === 'images' ? 'image' : 'video';

  const rangeFrom = (page - 1) * limit;
  const rangeTo = rangeFrom + limit - 1;

  const { data, count, error } = await supabase
    .from('media')
    .select('*', { count: 'exact' })
    .eq('type', mediaType)
    .range(rangeFrom, rangeTo);

  if (error) {
    createLogEvent('error', 'FETCH_MEDIA_FAILED', error.message + '. Type: ' + mediaType);
  }

  const parsed = z.array(MediaSchema).safeParse(data ?? []);

  if (!parsed.success) {
    console.log('getMedia error: ' + parsed.error.name);
    return { media: [], totalCount: 0 };
  }

  return { media: parsed.data, totalCount: count ?? 0 };
}
