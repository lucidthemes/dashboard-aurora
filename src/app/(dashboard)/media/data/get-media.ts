import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';
import { MediaSchema } from '@/schemas/media.schema';
import type { Media } from '@/schemas/media.schema';

export default async function getMedia(
  type: 'images' | 'videos',
  page: number,
  limit: number,
  sort?: string,
): Promise<{ media: Media[]; totalCount: number }> {
  const supabase = await createClient();

  const mediaType = type === 'images' ? 'image' : 'video';

  const rangeFrom = (Number(page) - 1) * Number(limit);
  const rangeTo = Number(rangeFrom) + Number(limit) - 1;

  const sortAsc = sort === 'date_asc' ? true : false;

  const { data, count, error } = await supabase
    .from('media')
    .select('*', { count: 'exact' })
    .eq('type', mediaType)
    .range(rangeFrom, rangeTo)
    .order('created_at', { ascending: sortAsc });

  if (error) {
    await createLogEvent('error', 'FETCH_MEDIA_FAILED', error.message + '. Type: ' + mediaType);
  }

  const parsed = z.array(MediaSchema).safeParse(data ?? []);

  if (!parsed.success) {
    console.log('getMedia error: ' + parsed.error.name);
    return { media: [], totalCount: 0 };
  }

  return { media: parsed.data, totalCount: count ?? 0 };
}
