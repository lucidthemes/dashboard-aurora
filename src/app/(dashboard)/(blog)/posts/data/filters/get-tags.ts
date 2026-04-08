'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PostsListFilterTag } from '../../schemas/filters/tag.schema';
import { PostsListFilterTagSchema } from '../../schemas/filters/tag.schema';

export default async function getPostsListFilterTags(): Promise<PostsListFilterTag[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('post_tags').select('id, name, slug');

  if (error) {
    await createLogEvent('error', 'FETCH_POSTS_FILTER_TAG_FAILED', error.message);

    return [];
  }

  const parsed = z.array(PostsListFilterTagSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent(
      'error',
      'FETCH_POSTS_FILTER_TAG_INVALID_DATA',
      'Fetch posts filter tag failed schema validation',
    );

    return [];
  }

  return parsed.data;
}
