'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PostsTagsList } from '../schemas/tags-list.schema';
import { PostsTagsListSchema } from '../schemas/tags-list.schema';

export default async function getPostsTags(
  page: number,
  limit: number,
  search?: string,
  sort?: string,
): Promise<{ tags: PostsTagsList[]; totalCount: number }> {
  const supabase = await createClient();

  const rangeFrom = (Number(page) - 1) * Number(limit);
  const rangeTo = Number(rangeFrom) + Number(limit) - 1;

  const sortAsc = sort === 'date_asc' ? true : false;

  let query = supabase
    .from('post_tags')
    .select('*', { count: 'exact' })
    .range(rangeFrom, rangeTo)
    .order('created_at', { ascending: sortAsc });

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  const { data, count, error } = await query;

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
