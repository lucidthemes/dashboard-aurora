'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PostsTagsList } from '../schemas/tags-list.schema';
import { PostsTagsListSchema } from '../schemas/tags-list.schema';

export default async function getPostsTags(
  page: number,
  limit: number,
  sort?: string,
): Promise<{ tags: PostsTagsList[]; totalCount: number }> {
  const supabase = await createClient();

  const rangeFrom = (page - 1) * limit;
  const rangeTo = rangeFrom + limit - 1;

  const sortAsc = sort === 'date_asc' ? true : false;

  const { data, count, error } = await supabase
    .from('post_tags')
    .select()
    .range(rangeFrom, rangeTo)
    .order('created_at', { ascending: sortAsc });

  if (error) {
    await createLogEvent('error', 'FETCH_POSTS_TAGS_FAILED', error.message);

    return { tags: [], totalCount: 0 };
  }

  const parsed = z.array(PostsTagsListSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_POSTS_TAGS_INVALID_DATA', 'Fetch posts tags failed schema validation');

    return { tags: [], totalCount: 0 };
  }

  return { tags: parsed.data, totalCount: count ?? 0 };
}
