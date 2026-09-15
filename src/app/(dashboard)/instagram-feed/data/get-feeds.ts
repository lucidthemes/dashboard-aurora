import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { InstagramFeedSchema } from '../schemas/feed.schema';
import type { InstagramFeed } from '../schemas/feed.schema';

export default async function getInstagramFeeds(
  page: number,
  limit: number,
  search?: string,
  sort?: string,
): Promise<{ instagramFeeds: InstagramFeed[]; totalCount: number }> {
  const supabase = await createClient();

  const rangeFrom = (Number(page) - 1) * Number(limit);
  const rangeTo = Number(rangeFrom) + Number(limit) - 1;

  const sortAsc = sort === 'date_asc' ? true : false;

  let query = supabase
    .from('instagram_feeds')
    .select('*', { count: 'exact' })
    .range(rangeFrom, rangeTo)
    .order('created_at', { ascending: sortAsc });

  if (search) {
    const isUUID = (value: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value);

    if (isUUID(search)) {
      query = query.eq('id', search);
    } else {
      query = query.ilike('name', `%${search}%`);
    }
  }

  const { data, count, error } = await query;

  if (error) {
    await createLogEvent('error', 'FETCH_INSTAGRAM_FEEDS_FAILED', error.message);

    return { instagramFeeds: [], totalCount: 0 };
  }

  const parsed = z.array(InstagramFeedSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_INSTAGRAM_FEEDS_INVALID_DATA',
      'Fetch instagram feeds failed schema validation',
    );

    return { instagramFeeds: [], totalCount: 0 };
  }

  return { instagramFeeds: parsed.data, totalCount: count ?? 0 };
}
