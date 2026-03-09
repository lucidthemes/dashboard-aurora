import { z } from 'zod';

import { InstagramFeedSchema } from '@/schemas/instagram-feed.schema';
import type { InstagramFeed } from '@/schemas/instagram-feed.schema';

import { createClient } from '../supabase/client';
import { createLogEvent } from '../supabase/log-event';

export async function getInstagramFeeds(): Promise<InstagramFeed[]> {
  const supabase = createClient();

  const { data, error } = await supabase.from('instagram_feeds').select().order('created_at', { ascending: false });

  if (error) {
    createLogEvent('error', 'FETCH_INSTAGRAM_FEEDS_FAILED', error.message);

    return [];
  }

  const parsed = z.array(InstagramFeedSchema).safeParse(data ?? []);

  if (!parsed.success) {
    createLogEvent('error', 'FETCH_INSTAGRAM_FEEDS_INVALID_DATA', 'Fetch instagram feeds failed schema validation');

    return [];
  }

  return parsed.data;
}
