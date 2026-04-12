'use server';

import { z } from 'zod';

import { createClient } from '@/lib/supabase/server';
import { createLogEvent } from '@/lib/supabase/log-event';

import type { PostsAuthorsList } from '../schemas/authors-list.schema';
import { PostsAuthorsListSchema } from '../schemas/authors-list.schema';

export default async function getPostsAuthors(
  page: number,
  limit: number,
  sort?: string,
): Promise<{ authors: PostsAuthorsList[]; totalCount: number }> {
  const supabase = await createClient();

  const rangeFrom = (page - 1) * limit;
  const rangeTo = rangeFrom + limit - 1;

  const sortAsc = sort === 'date_asc' ? true : false;

  const { data, count, error } = await supabase
    .from('post_authors')
    .select()
    .range(rangeFrom, rangeTo)
    .order('created_at', { ascending: sortAsc });

  if (error) {
    await createLogEvent('error', 'FETCH_POSTS_AUTHORS_FAILED', error.message);

    return { authors: [], totalCount: 0 };
  }

  const parsed = z.array(PostsAuthorsListSchema).safeParse(data ?? []);

  if (!parsed.success) {
    await createLogEvent('error', 'FETCH_POSTS_AUTHORS_INVALID_DATA', 'Fetch posts authors failed schema validation');

    return { authors: [], totalCount: 0 };
  }

  return { authors: parsed.data, totalCount: count ?? 0 };
}
