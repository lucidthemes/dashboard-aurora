import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import { InstagramFeedSchema } from '../schemas/feed.schema';
import type { InstagramFeed } from '../schemas/feed.schema';

export async function getInstagramFeeds(): Promise<InstagramFeed[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('instagram_feeds').select().order('created_at', { ascending: false });

  if (error) {
    await createLogEvent('error', 'FETCH_INSTAGRAM_FEEDS_FAILED', error.message);

    return [];
  }

  const parsed = z.array(InstagramFeedSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_INSTAGRAM_FEEDS_INVALID_DATA',
      'Fetch instagram feeds failed schema validation',
    );

    return [];
  }

  return parsed.data;
}
